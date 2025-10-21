import { Response } from "express"
import { IRequestBody } from "../../models/interfaces"
import { TSignIn } from "../../models/types"
import { TUser } from "@lumina/shared/models/types"
import { getUserByEmail } from "../../utils/postgres"
import { setCookieOptions, signToken, checkPassword } from "../../utils/auth"
import { throwError, tryCatch } from "../../utils/misc"
import { jwtTokenName } from "../../constants/strings"

const signIn = async (
	req: IRequestBody<TSignIn>,
	res: Response
) => {
	await tryCatch(
		async () => {
			if (!req.body?.email || !req.body?.password) {
				throwError(res, 400,
					"Request must contain a body with the following fields: " + 
					"email, password"
				)
			}
		
			const { email, password } = req.body
			const emailLowerCase = email.toLowerCase()

			const user: TUser = await getUserByEmail(res, emailLowerCase)

			if (!checkPassword(user.password, password)) {
				throwError(res, 401, "Incorrect password")
			}

			delete user.password

			const token = signToken(user)

			res
				.status(200)
				.cookie(
					jwtTokenName,
					token,
					setCookieOptions()
				)
				.json({...user});
		},
		res
	)
}

export default signIn