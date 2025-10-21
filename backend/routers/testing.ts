import express, { Request, Response } from "express"

const router = express.Router()

router
	.get("/", (_: Request, res: Response) => {
		res
			.status(200)
			.json({ testOutput: "Data successfully returned :)" });
	})

export default router