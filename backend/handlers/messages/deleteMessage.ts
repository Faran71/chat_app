import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "config"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"
import { jwtTokenName } from "../../constants/strings"

const deleteMessage = async (req: Request, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params

    // --- Verify JWT ---
    const cookie = req.headers?.cookie
    if (!cookie) throwError(res, 401, "Unauthorized")

    const keyPair = cookie.split(";")?.find((curr) => curr.includes(jwtTokenName))
    if (!keyPair) throwError(res, 401, "Unauthorized")

    const token = keyPair.split(`${jwtTokenName}=`)[1]
    const decoded = jwt.verify(token, config.get("VARS.jwt_key")) as jwt.JwtPayload
    const userId = decoded.id

    // --- Check message ownership ---
    const result = await client.query(`SELECT user_id FROM messages WHERE id = $1`, [id])
    if (result.rowCount === 0) throwError(res, 404, "Message not found")
    if (result.rows[0].user_id !== userId) throwError(res, 403, "Not authorized to delete this message")

    // --- Delete the message ---
    await client.query(`DELETE FROM messages WHERE id = $1`, [id])
    res.status(200).json({ message: "Message deleted successfully" })
  }, res)
}

export default deleteMessage
