import { Response } from "express"
import { IRequestBody } from "../../models/interfaces"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"
import { hashPassword } from "../../utils/auth"

const updatePassword = async (req: IRequestBody<any>, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params
    const { password, confirm_password } = req.body

    if (!id) {
      throwError(res, 400, "User ID is required")
    }

    if (!password || !confirm_password) {
      throwError(res, 400, "Both password and confirm_password fields are required")
    }

    if (password !== confirm_password) {
      throwError(res, 400, "Passwords must match")
    }

    const passwordLength = 8
    if (password.length < passwordLength) {
      throwError(res, 400, `Password must be at least ${passwordLength} characters long`)
    }

    const hashedPassword = hashPassword(password)

    await client.query(
      `UPDATE users SET password = $1 WHERE id = $2`,
      [hashedPassword, id]
    )

    res.status(200).json({ message: "Password updated successfully" })
  }, res)
}

export default updatePassword
