import { LocalStorageKeys } from "@/config/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem(LocalStorageKeys.accessToken);
      localStorage.removeItem(LocalStorageKeys.refreshToken);
      navigate("/sign-in");
    };
    logout();
  }, [navigate]);
  return null;
};

export default Logout;
