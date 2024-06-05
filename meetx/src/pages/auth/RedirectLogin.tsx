import { setToken } from "@/application/state-slices";
import { useAppDispatch } from "@/application/store";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const RedirectLogin = () => {
    const [queryParameters] = useSearchParams();
    const dispatch = useAppDispatch();
    const { redirectToHome } = useAppRouter();

    useEffect(() => {
        const token = queryParameters.get("token");
        dispatch(setToken(token ?? ''));
        redirectToHome();
    }, [])

    return ( <div></div> );
}
 
export default RedirectLogin;