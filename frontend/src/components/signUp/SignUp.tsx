import React, { useState, Dispatch, SetStateAction, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../context"
import { TextField, Button, Skeleton, Stack } from "@mui/material"
import { muiButtonSx, muiInputSx } from "../../constants/objects"
import { resetFormState, signInUpSubmit } from "../../utils/auth"
import { TAuthType } from "../../models/types"

interface SignUpProps {
  setAuthType: Dispatch<SetStateAction<TAuthType>>
}

const SignUp = ({ setAuthType }: SignUpProps) => {
  const { setSignedInUser, setSnackbarShown, setSnackbar } = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <div className="auth-container col space-y-4">
      <h3 className="color-darkLumina">Create a New Account</h3>
      {loading ? (
        <Stack spacing={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px" }} />
          ))}
        </Stack>
      ) : (
        <form
          onSubmit={(event) =>
            signInUpSubmit(
              event,
              navigate,
              "signUp",
              { email, firstName, lastName, password, confirmPassword },
              {
                setEmail,
                setFirstName,
                setLastName,
                setPassword,
                setConfirmPassword,
                setLoading,
                setError,
                setSignedInUser,
              },
              setSnackbarShown,
              setSnackbar
            )
          }
          className="auth-form col space-y-4"
        >
          {error && <h1 className="error-message">{error}</h1>}
          <TextField
            label="Email"
            placeholder="user@email.co.uk"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mui-input-default-width"
            sx={muiInputSx}
          />
          <TextField
            label="First Name"
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mui-input-default-width"
            sx={muiInputSx}
          />
          <TextField
            label="Last Name"
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mui-input-default-width"
            sx={muiInputSx}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mui-input-default-width"
            sx={muiInputSx}
          />
          <TextField
            label="Confirm Password"
            type="password"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mui-input-default-width"
            sx={muiInputSx}
          />
          <Button variant="contained" type="submit" sx={muiButtonSx}>
            Sign Up
          </Button>
          {/* <span
            onClick={() => {
              resetFormState(
                setEmail,
                setLoading,
                setError,
                setPassword,
                setFirstName,
                setLastName,
                setConfirmPassword
              )
              setAuthType("Sign In")
            }}
            className="underline pointer color-darkLumina"
            style={{ alignSelf: "start" }}
          >
            Sign In
          </span> */}
        </form>
      )}
    </div>
  )
}

export default SignUp
