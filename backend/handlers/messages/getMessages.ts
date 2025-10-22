import { Request, Response } from "express"
import { client } from "../../server"
import { tryCatch } from "../../utils/misc"

const getMessages = async (req: Request, res: Response) => {
  await tryCatch(async () => {
    const search = req.query.search ? String(req.query.search).trim().toLowerCase() : ""

    let query = `
      SELECT 
        m.*, 
        u.first_name, 
        u.last_name, 
        u.profile_picture
      FROM messages m
      JOIN users u ON m.user_id = u.id
    `
    
    const params: any[] = []

    if (search) {
      query += `
        WHERE LOWER(m.text) LIKE $1 
           OR LOWER(u.first_name) LIKE $1 
           OR LOWER(u.last_name) LIKE $1
      `
      params.push(`%${search}%`)
    }

    query += " ORDER BY m.created_at DESC"

    const result = await client.query(query, params)

    res.status(200).json({ messages: result.rows })
  }, res)
}

export default getMessages
