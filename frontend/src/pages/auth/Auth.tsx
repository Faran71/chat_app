import React, { useState } from "react"
import { motion } from "framer-motion"
import { Page } from "../../components"
import background from "../../../../res/cool_bg.mp4"
import LuminaLogo from "../../../../res/small_logo.png"
import SignIn from "../../components/signIn/SignIn"
import SignUp from "../../components/signUp/SignUp"
import { TAuthType } from "../../models/types"
import "./Auth.css"

const Auth = () => {
  const [authType, setAuthType] = useState<TAuthType>("Sign In")

  const isSignUp = authType === "Sign Up"

  return (
    <Page >
      <div className={`auth-split-container ${isSignUp ? "flipped" : ""}`}>
        {/* Left Section */}
        <motion.div
          key={isSignUp ? "signUp-panel" : "signIn-form"}
          initial={{ opacity: 0, x: isSignUp ? -100 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className={`auth-section ${isSignUp ? "gradient-bg" : "white-bg"}`}
        >
          {isSignUp ? (
            <div className="auth-panel">
              <h2>Already a member?</h2>
              <p>Welcome back! Sign in to continue your journey.</p>
              <button
                className="panel-button"
                onClick={() => setAuthType("Sign In")}
              >
                Sign In
              </button>
            </div>
          ) : (
            <>
              <img src={LuminaLogo} alt="Lumina Logo" className="auth-logo" />
              <SignIn setAuthType={setAuthType} />
            </>
          )}
        </motion.div>

        {/* Right Section */}
        <motion.div
          key={isSignUp ? "signUp-form" : "signUp-panel"}
          initial={{ opacity: 0, x: isSignUp ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className={`auth-section ${isSignUp ? "white-bg" : "gradient-bg"}`}
        >
          {isSignUp ? (
            <>
              <img src={LuminaLogo} alt="Lumina Logo" className="auth-logo" />
              <SignUp setAuthType={setAuthType} />
            </>
          ) : (
            <div className="auth-panel">
              <h2>New here?</h2>
              <p>Create your account and start sharing your thoughts.</p>
              <button
                className="panel-button"
                onClick={() => setAuthType("Sign Up")}
              >
                Sign Up
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </Page>
  )
}

export default Auth
