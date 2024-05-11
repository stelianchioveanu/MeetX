import { useAppDispatch } from "@/application/store";
import { useAuthorizationServicePostApiAuthorizationRefreshToken } from "../../openapi/queries/queries";
import { useAppRouter } from "./useAppRouter";
import { toast } from "react-toastify";
import { setToken } from "@/application/state-slices";

export const useRefreshToken = () => {
    const { redirectToLogin } = useAppRouter();
    const dispatch = useAppDispatch();
    const { mutate } = useAuthorizationServicePostApiAuthorizationRefreshToken({
        onError: () => {
            redirectToLogin();
            toast("Refresh Token expired, please login again!");
        },
        onSuccess: (result : any) => {
            dispatch(setToken(result.response?.token ?? ''));
        }
      });
    
    const refresh = () => {
        mutate();
    }

    return {refresh};
}