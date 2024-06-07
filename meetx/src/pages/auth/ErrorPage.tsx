import { useAppRouter } from "@/hooks/useAppRouter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Connector from '../../signalRConnection/signalr-connection';

const ErrorPage = () => {
    const [queryParameters] = useSearchParams();
     const { redirectToLogin, redirectToRegister, redirectToHomePage } = useAppRouter();
    const [count, setCount] = useState<number>(5);

    const connector = Connector();
    
    useEffect(() => {
        connector.stopConnection();
    }, [])
  
    useEffect(() => {
        if (count === 0) {
            const type = queryParameters.get("type")
            if (type === "login") {
                redirectToLogin();
            } else if (type === "register") {
                redirectToRegister();
            } else {
                redirectToHomePage();
            }
        }
  
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
  
        return () => clearInterval(interval);
    }, [count]);

    return (
    <div className="w-full h-full bg flex justify-center items-center bg-auth">
        <div className="h-fit backdrop-blur-3xl auth-form-bg rounded-2xl box-border px-10 py-12 flex justify-center items-center flex-col gap-5 w-96 shadow-xl shadow-neutral-900">
            <p className="text-4xl font-bold text-white">Error</p>
            <p className="text-white">An error has occurred</p>
            <p className="text-white">You will be redirected in {count}...</p>
        </div>
    </div> );
}
 
export default ErrorPage;