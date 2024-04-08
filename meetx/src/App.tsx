import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import { ThemeProvider } from './components/themes/theme-provider';

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="resetPassword" element={<ForgotPassword />} />
          <Route path="dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

