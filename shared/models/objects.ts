import { z } from "zod"

export const OUser = z.object({
	id: z.number(),
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
	email: z.string().email()
})