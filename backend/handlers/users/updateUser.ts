import { Response } from "express"
import { IRequestBody } from "../../models/interfaces"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"

const updateUser = async (req: IRequestBody<any>, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params
    const updates = req.body

    if (!id) {
      throwError(res, 400, "User ID is required")
    }

    if (!updates || Object.keys(updates).length === 0) {
      throwError(res, 400, "Request body must contain at least one field to update")
    }

    // Build dynamic SET clause
    const setClauses = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ")
    const values = Object.values(updates)

    await client.query(
      `UPDATE users SET ${setClauses} WHERE id = $${values.length + 1}`,
      [...values, id]
    )

    res.status(200).json({ message: "User updated successfully" })
  }, res)
}

export default updateUser
