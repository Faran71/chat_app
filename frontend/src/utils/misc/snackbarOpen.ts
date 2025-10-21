import { Dispatch, SetStateAction } from "react"
import { ISnackbar } from "../../models/interfaces"
import { AlertColor, AlertPropsColorOverrides, AlertPropsVariantOverrides } from "@mui/material"
import { OverridableStringUnion } from "@mui/types"

const snackbarOpen = (
    setSnackbarShown: Dispatch<SetStateAction<boolean>>,
    setSnackbar: Dispatch<SetStateAction<ISnackbar>>,
    text: string,
    variant: OverridableStringUnion<"filled" | "outlined" | "standard", AlertPropsVariantOverrides>,
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
) => {
    setSnackbar({
        text,
        severity,
        variant
    })
    setTimeout(() => { setSnackbarShown(true) }, 200)
}

export default snackbarOpen