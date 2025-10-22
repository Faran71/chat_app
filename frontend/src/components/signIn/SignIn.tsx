import React, { useState, Dispatch, SetStateAction, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../context"
import { TextField, Button, Skeleton, Stack } from "@mui/material"
import { muiButtonSx, muiInputSx } from "../../constants/objects"
import { Box } from ".."
import { resetFormState, signInUpSubmit } from "../../utils/auth"
import { TAuthType } from "../../models/types"

interface SignInProps {
  setAuthType: Dispatch<SetStateAction<TAuthType>>
}

const SignIn = ({ setAuthType }: SignInProps) => {
  const { setSignedInUser, setSnackbarShown, setSnackbar } = useContext(Context)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <div className="auth-container col space-y-4">
      <h3 className="color-darkLumina">The Future of Chatting</h3>
      {loading ? (
        <Stack spacing={2}>
          <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px" }} />
          <Skeleton variant="rounded" width="22rem" height={40} sx={{ borderRadius: "12px" }} />
          <Skeleton variant="rounded" width="5rem" height={40} sx={{ borderRadius: "12px", alignSelf: "center" }} />
        </Stack>
      ) : (
        <form
          onSubmit={(event) =>
            signInUpSubmit(
              event,
              navigate,
              "signIn",
              { email, password },
              {
                setEmail,
                setPassword,
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
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mui-input-default-width"
            sx={muiInputSx}
          />
          <Button variant="contained" type="submit" sx={muiButtonSx}>
            Sign In
          </Button>
          {/* <Box type="flex" flexDirection="col">
            <span
              onClick={() => {
                resetFormState(setEmail, setLoading, setError, setPassword)
                setAuthType("Sign Up")
              }}
              className="underline pointer color-darkLumina"
              style={{ alignSelf: "start" }}
            >
              Sign up
            </span>
          </Box> */}
        </form>
      )}
    </div>
  )
}

export default SignIn
