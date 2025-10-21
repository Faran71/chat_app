import { CookieOptions } from "express"
import { sharedRootDomainName } from "@lumina/shared/constants/strings"

// "Set-Cookie" HTTP Response Header attribute options
const setCookieOptions = (): CookieOptions => {
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

	return cookieOptions
}

export default setCookieOptions