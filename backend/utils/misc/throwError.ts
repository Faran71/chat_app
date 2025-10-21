import { Response } from "express"
import { TErrorStatusCodes } from "../../models/types"

const throwError = (
	res: Response,
	statusCode: TErrorStatusCodes,
	errorMessage: string
) => {
	res.status(statusCode)
	throw new Error(errorMessage)
}

export default throwError