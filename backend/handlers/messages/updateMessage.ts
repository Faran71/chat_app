import { Request, Response } from "express"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"

const updateMessage = async (req: Request, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params
    const { text } = req.body

    if (!id) throwError(res, 400, "Message ID is required")
    if (!text) throwError(res, 400, "Message text is required")

    const result = await client.query(
      `UPDATE messages SET text = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [text, id]
    )

    if (!result.rows.length) throwError(res, 404, "Message not found")

    res.status(200).json({ message: "Message updated successfully", data: result.rows[0] })
  }, res)
}

export default updateMessage
