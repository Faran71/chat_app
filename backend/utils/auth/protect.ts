import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "config"
import { tryCatch, throwError } from "../misc"
import { getUserByEmail } from "../postgres"
import { jwtTokenName } from "../../constants/strings"

const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	await tryCatch(
		async () => {
			let token: string
			const authorization = req.headers?.authorization
			const cookie = req.headers?.cookie

			if (authorization && authorization.startsWith("Bearer")) {
				token = authorization.split(" ")[1]
			}

			if (cookie) {
				token = cookie.split(jwtTokenName + "=")[1]
			}

			if (!token) {
				throwError(res, 401, "You are not logged in. Please log in to gain access")
			}

			const decodedToken = <jwt.JwtPayload>jwt.verify(
				token,
				config.get("VARS.jwt_key")
			);

			if (decodedToken?.email) {
				try {
					await getUserByEmail(res, String(decodedToken?.email))
				} catch {
					throwError(res, 404, "The user belonging to this token no longer exists")
				}
			} else {
				throwError(res, 500, "Something went wrong. An email wasn't found")
			}

			next()
		},
		res
	)
}

export default protect