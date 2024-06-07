import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Reset from './pages/auth/Reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoinPage from './pages/join/JoinPage';
import RedirectLogin from './pages/auth/RedirectLogin';
import ErrorPage from './pages/auth/ErrorPage';
import { RequestResponse } from '../openapi/requests/types.gen';
import { setGroup, setTopic } from './application/state-slices';
import { useAppSelector } from './application/store';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGroupServiceGetApiGroupGetGroupsKey, usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey, useUserServiceGetApiUserGetMeKey } from '../openapi/queries/common';

export const fetchQuery = async (call: Promise<any>, dispatch: any) => {
    try {
        const response = await call;
        return response;
    } catch (error: any) {
        const body: RequestResponse = error.body as RequestResponse;
        if (body?.errorMessage?.code === "NotAMember" || body?.errorMessage?.code === "GroupNotFound" || body?.errorMessage?.code === "ConvNotFound") {
            dispatch(setGroup("0"));
            return error;
        }
        if (body?.errorMessage?.code === "TopicNotFound") {
            dispatch(setTopic("0"));
            return error;
        }
        if (body.errorMessage?.code === "NotFromStaff") {
            useQueryClient().invalidateQueries({queryKey: [useUserServiceGetApiUserGetMeKey]});
            return error;
        }
        return error;
    }
};

function App() {
    const {selectedGroupId} = useAppSelector(x => x.selectedReducer);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (selectedGroupId === "0") {
            queryClient.invalidateQueries({queryKey: [useGroupServiceGetApiGroupGetGroupsKey]});
            queryClient.invalidateQueries({queryKey: [usePrivateConversationServiceGetApiPrivateConversationGetPrivateConversationKey]});
            queryClient.invalidateQueries({queryKey: [useUserServiceGetApiUserGetMeKey]});
        }
    }, [selectedGroupId])

    return (
    <BrowserRouter>
        <ToastContainer
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
			limit={5}
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
            <Route path="redirectLogin" element={<RedirectLogin/>} />
            <Route path="error" element={<ErrorPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

