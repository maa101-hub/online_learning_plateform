// utils/useLogout.js
import { useAuth } from "./authProvider";
import { useNavigate } from "react-router-dom";
import api from "./api";

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated,setIsLoggingOut } = useAuth();

  const logout = async () => {
    try {
      await api.post("/logout");
      setIsLoggingOut(true);
      setIsAuthenticated(false);

      navigate("/signup");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return logout;
};

export default useLogout;
