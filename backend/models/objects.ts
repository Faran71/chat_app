import { z } from "zod"

export const OSignUp = z.object({
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
	confirm_password: z.string(),
	email: z.string().email()
})

export const OSignIn = z.object({
	password: z.string(),
	email: z.string().email()
})