import { NavigateFunction } from "react-router-dom"
import { authRoute } from "../../constants/strings"
import { Dispatch, SetStateAction } from "react"
import { postApi } from "../api"
import { snackbarOpen } from "../misc"
import { ISnackbar } from "../../models/interfaces"

const logout = async (
    setSignedInUser: Dispatch<SetStateAction<string>>,
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
    setSignedInUser("")
    navigate(authRoute, { replace: true })
}

export default logout