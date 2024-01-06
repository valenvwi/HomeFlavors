import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/root";
import { authActions } from "../store/auth";
import { apiTokenRefreshCreate } from "../../../api";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const directToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await apiTokenRefreshCreate();
        if (data.userId) {
          dispatch(authActions.setIsLoggedIn(true));
          dispatch(authActions.setCurrentUserId(data.userId));
          dispatch(authActions.setUsername(data.username));
          dispatch(authActions.setIsOwner(data.isOwner));
        }
      } catch (error) {
        directToLogin();
      }
      setIsCheckingSession(false);
    };
    checkSession();
  }, [dispatch]);

  return { isCheckingSession };
}
