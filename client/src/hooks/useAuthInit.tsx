import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      dispatch(currentUser());
    }
  }, [dispatch]);
};
