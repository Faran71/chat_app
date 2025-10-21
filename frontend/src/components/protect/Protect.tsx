import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import IProtectProps from "./IProtectProps";
import { authRoute } from "../../constants/strings";

const Protect = ({ children }: IProtectProps) => {
  const { signedInUser, loadingUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && !signedInUser) {
      navigate(authRoute);
    }
  }, [signedInUser, loadingUser, navigate]);

  if (loadingUser) {
    return <div className="loading-screen">Checking authentication...</div>;
  }

  return signedInUser ? children : null;
};

export default Protect;
