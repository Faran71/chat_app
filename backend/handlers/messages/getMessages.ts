import { Request, Response } from "express"
import { client } from "../../server"
import { tryCatch } from "../../utils/misc"

const getMessages = async (req: Request, res: Response) => {
  await tryCatch(async () => {
    const result = await client.query(`
      SELECT 
        m.*, 
        u.first_name, 
        u.last_name, 
        u.profile_picture
      FROM messages m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
    `)

    res.status(200).json({ messages: result.rows })
  }, res)
}

export default getMessages
