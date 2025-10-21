import { Dispatch, FormEvent, SetStateAction } from "react"
import { NavigateFunction } from "react-router-dom"
import { TSignInUp } from "../../models/types"
import { ISignIn, ISignUp, ISignInUpFormSetStates, ISnackbar } from "../../models/interfaces"
import { postApi } from "../api"
import { TUser } from "@lumina/shared/models/types"
import { snakeCaseObjectKeys } from "@lumina/shared/utils"
import { snackbarOpen } from "../misc"
import { IUser } from "../../context/IContextStateProps"

const signInUpSubmit = async (
  event: FormEvent,
  navigate: NavigateFunction,
  type: TSignInUp,
  formData: ISignUp | ISignIn,
  formSetStates: ISignInUpFormSetStates,
  setSnackbarShown: Dispatch<SetStateAction<boolean>>,
  setSnackbar: Dispatch<SetStateAction<ISnackbar>>
) => {
  const {
    setEmail,
    setPassword,
    setLoading,
    setError,
    setSignedInUser
  } = formSetStates

  event.preventDefault()
  setLoading(true)

  try {
    // Make API call
    const userData: TUser = await postApi("/auth/" + type, snakeCaseObjectKeys(formData))

    // Map backend response to IUser shape
    const user: IUser = {
      id: userData.id ?? null,
      first_name: userData.first_name ?? "",
      last_name: userData.last_name ?? "",
      email: userData.email ?? ""
    }

    // Update context state
    setSignedInUser(user)

    const snackbarText =
      type === "signIn"
        ? "Successfully signed in!"
        : "Successfully signed up! Please check your email to verify your account (Not Implemented Yet...)"

    snackbarOpen(
      setSnackbarShown,
      setSnackbar,
      snackbarText,
      "standard",
      "success"
    )

    navigate("/")
  } catch (e) {
    snackbarOpen(
      setSnackbarShown,
      setSnackbar,
      "Failed to Authenticate",
      "standard",
      "error"
    )

    console.log("signInUpSubmit Error", e)
    setEmail("")
    setPassword("")
    formSetStates?.setFirstName && formSetStates.setFirstName("")
    formSetStates?.setLastName && formSetStates.setLastName("")
    formSetStates?.setConfirmPassword && formSetStates.setConfirmPassword("")
    setError(String(e))
    setLoading(false)
  }
}

export default signInUpSubmit
