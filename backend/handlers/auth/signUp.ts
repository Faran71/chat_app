import { Response } from "express"
import { z } from "zod"
import { IRequestBody } from "../../models/interfaces"
import { TSignUp } from "../../models/types"
import { TUser, TPreAccountUser } from "@lumina/shared/models/types"
import { client } from "../../server"
import { addRow, getUserByEmail } from "../../utils/postgres"
import { hashPassword, setCookieOptions, signToken } from '../../utils/auth'
import { throwError, tryCatch } from "../../utils/misc"
import { jwtTokenName } from "../../constants/strings"

const profilePictures = [
	"cow.png",
	"dog.png",
	"hamster.png",
	"owl.png",
	"seal.png",
	"snail.png",
	"spider.png"
]

const signUp = async (
	req: IRequestBody<TSignUp>,
	res: Response
) => {
	await tryCatch(
		async () => {
			if (
				!req.body?.email ||
				!req.body?.password ||
				!req.body?.confirm_password ||
				!req.body?.first_name ||
				!req.body?.last_name
			) {
				throwError(res, 400,
					"Request must contain a body with the following fields: " +
					"email, password, confirm_password, first_name, last_name"
				)
			}

			const { email, password, confirm_password, first_name, last_name } = req.body

			if (password !== confirm_password) {
				throwError(res, 400,
					`Passwords must match`
				)
			}

			const emailLowerCase = email.toLowerCase()
			const passwordLength = 8

			if (password.length < passwordLength) {
				throwError(res, 400,
					`Passwords must be at least ${passwordLength} characters or greater`
				)
			}

			const emailValidation = z.string().email().safeParse(emailLowerCase)

			if (!emailValidation.success) {
				throwError(res, 400, "Please provide a valid email address")
			}

			const existingEmail = await client
				.query(`SELECT * FROM users WHERE email = $1`, [emailLowerCase])

			if (existingEmail.rowCount > 0) {
				throwError(res, 400,
					"A user with this email already exists. " +
					"Please sign up with a different email address"
				)
			}

			const randomPicture =
				profilePictures[Math.floor(Math.random() * profilePictures.length)]

			let newUser: TPreAccountUser = {
				first_name,
				last_name,
				email: emailLowerCase,
				profile_picture: randomPicture,
			}

			const passwordHash = hashPassword(password)
			newUser.password = passwordHash

			await addRow(client, newUser, "users")

			const user: TUser = await getUserByEmail(res, emailLowerCase)

			delete user.password

			const token = signToken(user)

			res
				.status(200)
				.cookie(
					jwtTokenName,
					token,
					setCookieOptions()
				)
				.json({ ...user });
		},
		res
	)
}

export default signUp