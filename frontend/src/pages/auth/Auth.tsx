import React, { useState, Dispatch, SetStateAction, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Box, Page } from "../../components"
import { resetFormState, signInUpSubmit } from "../../utils/auth";
import { Context } from "../../context";
import background from "../../../../res/background.mov"
import LuminaLogo from "../../../../res/small_logo.png"
import { TextField, Button, Skeleton, Stack } from '@mui/material';
import { muiButtonSx, muiInputSx } from "../../constants/objects";
import "./Auth.css"
import { TAuthType } from "../../models/types";
import { motion } from "motion/react"

const Auth = () => {
    const { setSignedInUser, setSnackbarShown, setSnackbar } = useContext(Context)
    const navigate = useNavigate()
    const [authType, setAuthType]: [TAuthType, Dispatch<SetStateAction<TAuthType>>] = useState<TAuthType>("Sign In")
    const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] = useState("")
    const [firstName, setFirstName]: [string, Dispatch<SetStateAction<string>>] = useState("")
    const [lastName, setLastName]: [string, Dispatch<SetStateAction<string>>] = useState("")
    const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState("")
    const [confirmPassword, setConfirmPassword]: [string, Dispatch<SetStateAction<string>>] = useState("")
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
    const [error, setError]: [string, Dispatch<SetStateAction<string>>] = useState("")

    return (
		<Page
			videoBackground={background}
		>
            {
                authType === "Sign In" && (
                    <motion.div
                        initial={{ opacity: "25%" }}
                        animate={{ opacity: "100%" }}
                        transition={{
                            duration: 0.6
                        }}
                        className="auth-container col space-y-4"
                    >
                        <img
                            src={LuminaLogo}
                            alt="Lumina Logo"
                        />
                        <h3
                            className="color-darkLumina"
                        >
                            The Future of Chatting
                        </h3>
                        {
                            loading ? (
                                <Stack spacing={2}>
                                    <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="5rem" height={40} sx={{ borderRadius: "12px", alignSelf: "center", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="4rem" height={25} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="10rem" height={25} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                </Stack>
                            ) : (
                                <form
                                    onSubmit={(event) => signInUpSubmit(
                                        event,
                                        navigate,
                                        "signIn",
                                        {
                                            email,
                                            password
                                        },
                                        {
                                            setEmail,
                                            setPassword,
                                            setLoading,
                                            setError,
                                            setSignedInUser
                                        },
                                        setSnackbarShown,
                                        setSnackbar
                                    )}
                                    className="auth-form col space-y-4"
                                >
                                    {error && ( <h1 className="error-message">{error}</h1>)}
                                    <TextField
                                        label="Email"
                                        placeholder="user@email.co.uk"
                                        size="small"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        size="small"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={muiButtonSx}
                                    >
                                        Sign In
                                    </Button>
                                    <Box
                                        type="flex"
                                        flexDirection="col"
                                    >
                                        <span
                                            onClick={() => {
                                                resetFormState(
                                                    setEmail,
                                                    setLoading,
                                                    setError,
                                                    setPassword
                                                )
                                                setAuthType("Sign Up")
                                            }}
                                            className="underline pointer color-darkLumina"
                                            style={{alignSelf: "start"}}
                                        >
                                            Sign up
                                        </span>
                                    </Box>
                                </form>
                            )
                        }
                    </motion.div>
                )
            }
            {
                authType === "Sign Up" && (
                    <motion.div
                        initial={{ opacity: "25%" }}
                        animate={{ opacity: "100%" }}
                        transition={{
                            duration: 0.6
                        }}
                        className="auth-container col space-y-4"
                    >
                        <img
                            src={LuminaLogo}
                            alt="Lumina Logo"
                        />
                        <h3
                            className="color-darkLumina"
                        >
                            Create a New Account
                        </h3>
                        {
                            loading ? (
                                <Stack spacing={2}>
                                    <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="5rem" height={40} sx={{ borderRadius: "12px", alignSelf: "center", "&::after": { animationDuration: "0.1s !important" } }} />
                                    <Skeleton variant="rounded" width="4rem" height={20} sx={{ borderRadius: "12px", "&::after": { animationDuration: "0.1s !important" } }} />
                                </Stack>
                            ) : (
                                <form
                                    onSubmit={(event) => signInUpSubmit(
                                        event,
                                        navigate,
                                        "signUp",
                                        {
                                            email,
                                            firstName,
                                            lastName,
                                            password,
                                            confirmPassword
                                        },
                                        {
                                            setEmail,
                                            setFirstName,
                                            setLastName,
                                            setPassword,
                                            setConfirmPassword,
                                            setLoading,
                                            setError,
                                            setSignedInUser
                                        },
                                        setSnackbarShown,
                                        setSnackbar
                                    )}
                                    className="auth-form col space-y-4"
                                >
                                    {error && ( <h1 className="error-message">{error}</h1>)}
                                    <TextField
                                        label="Email"
                                        placeholder="user@email.co.uk"
                                        size="small"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <TextField
                                        label="First Name"
                                        size="small"
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <TextField
                                        label="Last Name"
                                        size="small"
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        size="small"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        size="small"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        className="mui-input-default-width"
                                        sx={muiInputSx}
                                    />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={muiButtonSx}
                                    >
                                        Sign Up
                                    </Button>
                                    <span
                                        onClick={() => {
                                            resetFormState(
                                                setEmail,
                                                setLoading,
                                                setError,
                                                setPassword,
                                                setFirstName,
                                                setLastName,
                                                setConfirmPassword,
                                            )
                                            setAuthType("Sign In")
                                        }}
                                        className="underline pointer color-darkLumina"
                                        style={{alignSelf: "start"}}
                                    >
                                        Sign In
                                    </span>
                                </form>
                            )
                        }
                    </motion.div>
                )
            }
		</Page>
	)
}

export default Auth