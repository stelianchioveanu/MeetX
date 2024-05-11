import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import { store } from './application/store.ts';
import { OpenAPI as OpenAPIConfig } from "../openapi/requests/core/OpenAPI.ts";

OpenAPIConfig.BASE = 'http://localhost:5000';
OpenAPIConfig.WITH_CREDENTIALS = true;
OpenAPIConfig.HEADERS = {
  "Authorization" : "Bearer " + localStorage.getItem("token")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ParallaxProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ParallaxProvider>,
)
