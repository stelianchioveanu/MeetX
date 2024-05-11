import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAppRouter = () => {
  const navigate = useNavigate();

  const redirectToHome = useCallback(
    () => navigate("/dashboard"),
    [navigate]
  );

  const redirectToLogin = useCallback(
    () =>
      navigate({
        pathname: "/login"
      }),
    [navigate]
  );

  return {
    redirectToHome,
    redirectToLogin,
    navigate
  };
};
