import { Response } from "express"
import { IRequestBody } from "../../models/interfaces"
import { client } from "../../server"
import { tryCatch, throwError } from "../../utils/misc"
import { getUserByEmail } from "../../utils/postgres"
import { signToken, setCookieOptions } from "../../utils/auth"
import { jwtTokenName } from "../../constants/strings"

const updateProfilePicture = async (req: IRequestBody<any>, res: Response) => {
  await tryCatch(async () => {
    const { id } = req.params
    const { profile_picture } = req.body

    if (!id) throwError(res, 400, "User ID is required")
    if (!profile_picture) throwError(res, 400, "Profile picture is required")

    const result = await client.query(
      `UPDATE users SET profile_picture = $1 WHERE id = $2 RETURNING email`,
      [profile_picture, id]
    )

    if (result.rowCount === 0) {
      throwError(res, 404, "User not found")
    }

    const userEmail = result.rows[0].email

    const user = await getUserByEmail(res, userEmail)
    delete user.password

    const token = signToken(user)

    res
      .status(200)
      .cookie(jwtTokenName, token, setCookieOptions())
      .json({
        message: "Profile picture updated successfully!",
        user,
      })
  }, res)
}

export default updateProfilePicture
