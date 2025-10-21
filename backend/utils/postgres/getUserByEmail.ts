import { Response } from "express"
import { OUser } from "@lumina/shared/models/objects"
import { TUser } from "@lumina/shared/models/types"
import { client } from "../../server"
import { throwError } from "../misc"

const getUserByEmail = async (
	res: Response,
	email: string
): Promise<TUser> => {
	const userRows = await client
		.query(`SELECT * FROM users WHERE email = $1`, [email])

	if (userRows.rowCount === 0) {
		throwError(res, 404, "User cannot be found")
	}

	const user: TUser = userRows.rows[0]

	return user
}

export default getUserByEmail