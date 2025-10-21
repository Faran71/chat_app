import React, { useContext, useState } from "react"
import { Page, Button } from "../../components"
import { Context } from "../../context"
import { postApi, putApi } from "../../utils/api"
import "./Account.css"
import { snackbarOpen } from "../../utils/misc"

const Account = () => {
    const { signedInUser, setSignedInUser, fetchSignedInUser, setSnackbar, setSnackbarShown } = useContext(Context)

    const [firstName, setFirstName] = useState(signedInUser?.first_name || "")
    const [lastName, setLastName] = useState(signedInUser?.last_name || "")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [selectedPicture, setSelectedPicture] = useState(signedInUser?.profile_picture || "")

    const handleUpdateProfilePicture = async () => {
        try {
            await putApi(`/users/${signedInUser?.id}/profile-picture`, {
                profile_picture: selectedPicture,
            })

            await fetchSignedInUser()

            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                "Profile picture updated successfully!",
                "standard",
                "success"
            )
        } catch (err) {
            console.error(err)
            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                "Failed to update profile picture.",
                "standard",
                "error"
            )
        }
    }


    const handleUpdateName = async () => {
        try {
            await putApi(`/users/${signedInUser?.id}/name`, {
                first_name: firstName,
                last_name: lastName,
            })

            await fetchSignedInUser()


            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                "Name updated successfully!",
                "standard",
                "success"
            )
        } catch (err) {
            console.error(err)
            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                "Failed to update name.",
                "standard",
                "error"
            )
        }
    }

    const handleUpdatePassword = async () => {
        if (password !== confirmPassword) {
            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                "Passwords do not match.",
                "standard",
                "warning"
            )
            return
        }

        try {
            const res = await putApi(`/users/${signedInUser?.id}/password`, {
                password,
                confirm_password: confirmPassword,
            })

            setPassword("")
            setConfirmPassword("")
            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                res.message || "Password updated successfully!",
                "standard",
                "success"
            )
        } catch (err) {
            console.error(err)
            snackbarOpen(
                setSnackbarShown,
                setSnackbar,
                "Failed to update password.",
                "standard",
                "error"
            )
        }
    }

    return (
        <Page>
            <div className="account-container">
                <h1>Account</h1>

                {signedInUser ? (
                    <>
                        <div className="account-info">
                            <p>{signedInUser.email}</p>
                        </div>
                        <div className="account-section">
                            <h2>Profile Picture</h2>

                            <div className="profile-icons">
                                {[
                                    "cow.png",
                                    "dog.png",
                                    "hamster.png",
                                    "owl.png",
                                    "seal.png",
                                    "snail.png",
                                    "spider.png"
                                ].map((icon) => (
                                    <img
                                        key={icon}
                                        src={`/res/icons/${icon}`}
                                        alt={icon}
                                        className={`profile-icon ${selectedPicture === icon ? "selected" : ""}`}
                                        onClick={() => setSelectedPicture(icon)}
                                    />
                                ))}
                            </div>

                            <Button onClick={handleUpdateProfilePicture} type="button">
                                Save Profile Picture
                            </Button>
                        </div>


                        <div className="account-section">
                            <h2>Update Name</h2>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Button onClick={handleUpdateName} type="button">Save Name</Button>
                        </div>

                        <div className="account-section">
                            <h2>Update Password</h2>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button onClick={handleUpdatePassword} type="button">Save Password</Button>
                        </div>

                    </>
                ) : (
                    <p>Loading user info...</p>
                )}
            </div>
        </Page>
    )
}

export default Account
