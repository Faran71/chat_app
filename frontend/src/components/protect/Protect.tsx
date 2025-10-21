import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import IProtectProps from "./IProtectProps";
import { authRoute } from "../../constants/strings";

// should redirect to auth page if not signed in
const Protect = ({ children }: IProtectProps) => {
    const { signedInUser } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!signedInUser) {
            navigate(authRoute);
        }
    }, [signedInUser, navigate]);

    return signedInUser ? children : null;
};

export default Protect;