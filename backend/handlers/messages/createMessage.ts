import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "config"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"
import { jwtTokenName } from "../../constants/strings"

const createMessage = async (req: Request, res: Response) => {
  await tryCatch(async () => {
    const { text } = req.body

    if (!text) {
      throwError(res, 400, "Message text is required")
    }

    const cookie = req.headers?.cookie
    if (!cookie) {
      throwError(res, 401, "Unauthorized: Missing authentication token")
    }

    const keyPair = cookie.split(";")?.find((curr) => curr.includes(jwtTokenName))
    if (!keyPair) {
      throwError(res, 401, "Unauthorized: Invalid token")
    }

    const token = keyPair.split(`${jwtTokenName}=`)[1]
    if (!token) {
      throwError(res, 401, "Unauthorized: Missing token")
    }

    let decodedToken: jwt.JwtPayload
    try {
      decodedToken = <jwt.JwtPayload>jwt.verify(token, config.get("VARS.jwt_key"))
    } catch (err) {
      throwError(res, 401, "Unauthorized: Invalid or expired token")
    }

    const userId = decodedToken.id
    if (!userId) {
      throwError(res, 401, "Unauthorized: Invalid user")
    }

    const result = await client.query(
      `INSERT INTO messages (text, user_id, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())
       RETURNING *`,
      [text, userId]
    )

    res.status(201).json({
      message: "Message created successfully",
      data: result.rows[0],
    })
  }, res)
}

export default createMessage
