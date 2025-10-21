import { NavigateFunction } from "react-router-dom"
import { authRoute } from "../../constants/strings"
import { Dispatch, SetStateAction } from "react"
import { postApi } from "../api"
import { snackbarOpen } from "../misc"
import { ISnackbar } from "../../models/interfaces"
import { IUser } from "../../context/IContextStateProps"

const logout = async (
    setSignedInUser: Dispatch<SetStateAction<IUser>>,
    navigate: NavigateFunction,
    setSnackbarShown: Dispatch<SetStateAction<boolean>>,
    setSnackbar: Dispatch<SetStateAction<ISnackbar>>
) => {
    try {
        await postApi("/auth/logout")
        snackbarOpen(
			setSnackbarShown,
			setSnackbar,
			"Successfully logged out!",
			"standard",
			"success"
		)
    } catch(e) {
        throw new Error("Failed to Logout")
    }
    setSignedInUser(null)
    navigate(authRoute, { replace: true })
}

export default logout