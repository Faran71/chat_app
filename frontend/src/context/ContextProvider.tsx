import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Context } from "."
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Account, Auth, FourZero, Home, Settings} from "../pages"
import {
	accountRoute,
	authRoute,
	fourZeroFourErrorCode,
	fourZeroFourRoute,
	fourZeroOneRoute,
	fourZeroThreeRoute,
	homeRoute,
	settingsRoute
} from "../constants/strings"
import { HideAuth, Protect } from "../components"
import { postApi } from "../utils/api"
import { Alert, Snackbar } from "@mui/material"
import { ISnackbar } from "../models/interfaces"
import { snackbarClose } from "../utils/misc"

const ContextProvider = () => {
	const [signedInUser, setSignedInUser]: [
		string,
		Dispatch<SetStateAction<string>>
	] = useState("")
	const [snackbar, setSnackbar]: [
		ISnackbar,
		Dispatch<SetStateAction<ISnackbar>>
	] = useState(null)
	const [snackbarShown, setSnackbarShown]: [
		boolean,
		Dispatch<SetStateAction<boolean>>
	] = useState(false)

	useEffect(() => {
		(async () => {
			try {
				const res = await postApi("/auth/checkSignedIn")
				setSignedInUser(res.signedInUser)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

	return (
		<div className="app">
			<Context.Provider
				value={{
					signedInUser,
					setSignedInUser,
					setSnackbar,
					setSnackbarShown
				}}
			>
				<Snackbar
					open={snackbarShown}
					autoHideDuration={5000}
					onClose={() => snackbarClose(setSnackbarShown, setSnackbar)}
				>
					<Alert
						onClose={() => snackbarClose(setSnackbarShown, setSnackbar)}
						variant={snackbar?.variant || "standard"}
						severity={snackbar?.severity || "success"}
						sx={{
							borderRadius: "1rem"
						}}
					>
						{snackbar?.text || ""}
					</Alert>
				</Snackbar>
				<BrowserRouter>
					<Routes>
						<Route
							path={homeRoute}
							element={
								<Protect>
									<Home/>
								</Protect>
							}
						/>
						<Route
							path={authRoute}
							element={
								<HideAuth>
									<Auth/>
								</HideAuth>
							}
						/>
						<Route
							path={accountRoute}
							element={
								<Protect>
									<Account/>
								</Protect>
							}
						/>
						<Route
							path={settingsRoute}
							element={
								<Protect>
									<Settings/>
								</Protect>
							}
						/>
						<Route
							path={fourZeroOneRoute}
							Component={() => (
								<FourZero
									errorCode={fourZeroOneRoute}
									errorMessage={
										"You aren't currently signed in and are missing" +
										" the required authentication"
									}
								/>
							)}
						/>
						<Route
							path={fourZeroThreeRoute}
							Component={() => (
								<FourZero
									errorCode={fourZeroThreeRoute}
									errorMessage={
										"Your account doesn't have the required authorization"
									}
								/>
							)}
						/>
						<Route
							path={fourZeroFourRoute}
							Component={() => (
								<FourZero
									errorCode={fourZeroFourErrorCode}
									errorMessage={
										"Page requested was not found"
									}
								/>
							)}
						/>
					</Routes>
				</BrowserRouter>
			</Context.Provider>
		</div>
	)
}

export default ContextProvider