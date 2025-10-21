import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import IHideAuthProps from "./IHideAuthProps";
import { homeRoute } from "../../constants/strings";

// should redirect home if already signed in
const HideAuth = ({ children }: IHideAuthProps) => {
    const { signedInUser } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (signedInUser) {
            navigate(homeRoute);
        }
    }, [signedInUser, navigate]);

    return signedInUser ? null : children;
};

export default HideAuth;