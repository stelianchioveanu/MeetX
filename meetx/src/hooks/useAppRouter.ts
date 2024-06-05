import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAppRouter = () => {
  const navigate = useNavigate();

  const redirectToHome = useCallback(
    () => navigate("/dashboard"),
    [navigate]
  );

  const redirectToHomePage = useCallback(
    () => navigate("/"),
    [navigate]
  );

  const redirectToLogin = useCallback(
    () =>
      navigate({
        pathname: "/login"
      }),
    [navigate]
  );

  const redirectToRegister = useCallback(
    () =>
      navigate({
        pathname: "/register"
      }),
    [navigate]
  );

  return {
    redirectToHome,
    redirectToLogin,
    navigate,
    redirectToRegister,
    redirectToHomePage
  };
};
