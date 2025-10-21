import { Dispatch, SetStateAction } from "react"
import { ISnackbar } from "../../models/interfaces"

const snackbarClose = (
    setSnackbarShown: Dispatch<SetStateAction<boolean>>,
    setSnackbar: Dispatch<SetStateAction<ISnackbar>>
) => {
    setSnackbarShown(false)
	setTimeout(() => { setSnackbar(null) }, 200)
}

export default snackbarClose