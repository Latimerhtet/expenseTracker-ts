import { useContext, useEffect } from "react";
import { checkStatus } from "../API/auth";
import { authContext } from "../Auth-Context/AuthProvider";
import { useNavigate } from "react-router-dom";
const AuthStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();
  const getUserStatus = async () => {
    try {
      const response = await checkStatus();
      if (response.isSuccess) {
        setUser(response.user);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
        throw new Error("Unauthorized user!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserStatus();
  }, []);
  return <>{children}</>;
};

export default AuthStatusProvider;
