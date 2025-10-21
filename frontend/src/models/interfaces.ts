import { AlertColor, AlertPropsColorOverrides, AlertPropsVariantOverrides } from "@mui/material"
import { OverridableStringUnion } from '@mui/types';
import { Dispatch, SetStateAction } from "react"
import { IUser } from "../context/IContextStateProps";

export interface ISignUp {
	email: string
	firstName: string
	lastName: string
	password: string
	confirmPassword: string
}

export interface ISignIn {
	email: string
	password: string
}

export interface ISignInUpFormSetStates {
	setEmail: Dispatch<SetStateAction<string>>
	setFirstName?: Dispatch<SetStateAction<string>>
	setLastName?: Dispatch<SetStateAction<string>>
	setPassword: Dispatch<SetStateAction<string>>
	setConfirmPassword?: Dispatch<SetStateAction<string>>
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string>>
	setSignedInUser: Dispatch<SetStateAction<IUser>>
}

export interface ISnackbar {
	text: string
	variant: OverridableStringUnion<"filled" | "outlined" | "standard", AlertPropsVariantOverrides>
	severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
}