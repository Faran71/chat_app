import { Dispatch, SetStateAction } from "react"
import { ISnackbar } from "../models/interfaces"

export interface IContextStateProps {
	signedInUser: string
	setSignedInUser: Dispatch<SetStateAction<string>>
	setSnackbar: Dispatch<SetStateAction<ISnackbar>>
	setSnackbarShown: Dispatch<SetStateAction<boolean>>
}