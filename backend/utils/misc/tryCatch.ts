import { Response } from "express"

const tryCatch = async (
	callback: Function,
	res: Response
) => {
	res.status(500)

	try {
		await callback()
	} catch(e) {
		if (e.message) {
			res.json({ error: e.message })
			return
		}

		res
			.status(500)
			.json({ error: "Unknown error occured" })
	}
}

export default tryCatch