import { Dispatch, SetStateAction } from "react"
import { ISnackbar } from "../models/interfaces"

export interface IUser {
	id: number | null
	first_name: string
	last_name: string
	email: string
}

export interface IContextStateProps {
	signedInUser: IUser
	setSignedInUser: Dispatch<SetStateAction<IUser>>
	setSnackbar: Dispatch<SetStateAction<ISnackbar>>
	setSnackbarShown: Dispatch<SetStateAction<boolean>>
	loadingUser: boolean
}
