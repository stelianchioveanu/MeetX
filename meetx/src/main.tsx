import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import { store } from './application/store.ts';
import { Middleware, OpenAPI as OpenAPIConfig } from "../openapi/requests/core/OpenAPI.ts";
import axios, { AxiosResponse } from "axios";
import { toast } from 'react-toastify';

function isUnauthorizedError(error: any) {
  return error.status === 401;
}

export async function renewToken() {
    return await axios.post(
        "http://localhost:5000/api/Authorization/RefreshToken",
        {},
        {
          withCredentials: true,
        }
    );
}

let refreshingFunc: any = undefined;

const responseInterceptor: Middleware<AxiosResponse<any, any>> = async (error) => {
  const originalConfig = error.config;

  if (!isUnauthorizedError(error)) {
      toast(error?.data?.errorMessage?.message || error.data.Message);
      return error;
  }

  try {
    if (!refreshingFunc)
        refreshingFunc = renewToken();

    const response = await refreshingFunc;
    const token = response.data.response.token;
    localStorage.setItem('token', token);
    OpenAPIConfig.HEADERS = {
        "Authorization" : "Bearer " + token
    }

    try {
        originalConfig.headers.Authorization = `Bearer ${token}`;
        return await axios.request(originalConfig);
    } catch(innerError: any) {
        if (isUnauthorizedError(innerError)) {
            throw innerError;
        } else {
          toast(innerError?.response?.data?.errorMessage?.message ||
            innerError.response?.data.Message);
        }
    }
  } catch (err) {
    window.location.href = "/login";
  } finally {
    refreshingFunc = undefined;
  }
  return error;
};

OpenAPIConfig.BASE = 'http://localhost:5000';
OpenAPIConfig.WITH_CREDENTIALS = true;
OpenAPIConfig.HEADERS = {
    "Authorization" : "Bearer " + localStorage.getItem("token")
}
OpenAPIConfig.interceptors.response.use(responseInterceptor);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ParallaxProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ParallaxProvider>,
)
