import { Response } from "express"
import { IRequestBody } from "../../models/interfaces"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"

const deleteUser = async (req: IRequestBody<any>, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params

    if (!id) {
      throwError(res, 400, "User ID is required")
    }

    const result = await client.query(
      `DELETE FROM users WHERE id = $1`,
      [id]
    )

    if (result.rowCount === 0) {
      throwError(res, 404, "User not found")
    }

    res.status(200).json({ message: "User deleted successfully" })
  }, res)
}

export default deleteUser
