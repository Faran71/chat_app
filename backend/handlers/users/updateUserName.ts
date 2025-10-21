import { Response } from "express"
import { IRequestBody } from "../../models/interfaces"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"

const updateUserName = async (req: IRequestBody<any>, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params
    const { first_name, last_name } = req.body

    if (!id) {
      throwError(res, 400, "User ID is required")
    }

    if (!first_name || !last_name) {
      throwError(res, 400, "Both first_name and last_name are required")
    }

    await client.query(
      `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3`,
      [first_name, last_name, id]
    )

    res.status(200).json({ message: "User name updated successfully" })
  }, res)
}

export default updateUserName
