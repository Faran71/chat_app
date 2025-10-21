import express from "express"
import { checkSignedIn, logout, signIn, signUp } from "../handlers/auth"

const router = express.Router()

router
	.post("/signUp", signUp)
	.post("/signIn", signIn)
	.post("/checkSignedIn", checkSignedIn)
	.post("/logout", logout)

export default router