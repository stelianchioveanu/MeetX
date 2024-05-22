import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import { ThemeProvider } from './components/themes/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Reset from './pages/auth/Reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoinPage from './pages/join/JoinPage';

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
              <ToastContainer // Create the toast container to enable the notification visualization.
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              limit={1}
              />
          <Routes>
            <Route path="/"/>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="requestResetPassword" element={<ForgotPassword />} />
            <Route path="resetPassword" element={<Reset/>} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="invite" element={<JoinPage/>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App

