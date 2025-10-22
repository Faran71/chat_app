import React, { useContext } from "react"
import INavbarProps from "./INavbarProps"
import { Link, useNavigate } from "react-router-dom"
import { Link as CustomLink } from '..'
import { accountRoute, homeRoute, settingsRoute } from "../../constants/strings"
import "./Navbar.css"
import { Box } from ".."
import Logo from "../../../../res/small_logo.png"
import { IoSettingsSharp, IoLogOutOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Context } from "../../context"
import { logout } from "../../utils/auth"
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton"

const Navbar = ({
	className,
	styles
}: INavbarProps) => {
	const { setSignedInUser, setSnackbarShown, setSnackbar, signedInUser } = useContext(Context)
	const navigate = useNavigate()

	const profilePicture = signedInUser?.profile_picture
		? `/res/icons/${signedInUser.profile_picture}`
		: null

	return (
		<div
			className={`navbar fw ${className}`}
			style={styles}
		>
			<Box
				type="flex"
				className="group"
			>
				<Link
					to={homeRoute}
					className="link"
				>
					<img
						src={Logo}
						alt="Lumina Logo"
						className="logo"
					/>
				</Link>
			</Box>
			<Box
				type="flex"
				justifyContent="end"
				spacing={false}
				className="fw group space-x-4"
			>
				{/* <Tooltip
					title="Settings"
					arrow
				>
					<IconButton
						onClick={() => navigate(settingsRoute)}
					>
						<IoSettingsSharp className="settings" />
					</IconButton>
				</Tooltip> */}
				<Tooltip
					title="Account"
					arrow
				>
					<IconButton onClick={() => navigate(accountRoute)}>
						{profilePicture ? (
							<img
								src={profilePicture}
								alt="Profile"
								className="navbar-profile"
							/>
						) : (
							<MdAccountCircle className="account" />
						)}
					</IconButton>
				</Tooltip>
				<Tooltip
					title="Log out"
					arrow
				>
					<IconButton
						onClick={() => logout(setSignedInUser, navigate, setSnackbarShown, setSnackbar)}
					>
						<IoLogOutOutline className="logout" />
					</IconButton>
				</Tooltip>
			</Box>
		</div>
	)
}

export default Navbar