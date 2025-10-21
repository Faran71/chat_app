import { CookieOptions, Request, Response } from "express"
import { tryCatch } from "../../utils/misc"
import { sharedRootDomainName } from "@lumina/shared/constants/strings"
import { jwtTokenName } from "../../constants/strings"

const logout = async (
	_: Request,
	res: Response
) => {
	await tryCatch(
		async () => {
            let cookieOptions: CookieOptions

            if (
                process?.env?.NODE_ENV &&
                (process.env.NODE_ENV === "development" ||
                process.env.NODE_ENV === "production")
            ) {
                cookieOptions = {
                    domain: sharedRootDomainName, // TODO: idk if we need this for single ec2 instance
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }
            } else {
                cookieOptions = {
                    httpOnly: true
                }
            }
			res.clearCookie(jwtTokenName, cookieOptions);

            res
                .status(200)
                .json(
                    {
                        message: 'Logged out'
                    }
                );
		},
		res
	)
}

export default logout