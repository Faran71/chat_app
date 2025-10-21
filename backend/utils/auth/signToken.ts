import jwt from "jsonwebtoken"
import config from "config"
import { TPreAccountUser, TUser } from "@lumina/shared/models/types"

const signToken = (user: TUser | TPreAccountUser) => {
  const payload = {
    id: (user as any).id ?? null,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    profile_picture: user.profile_picture || "",
  }

  return jwt.sign(payload, config.get("VARS.jwt_key"), {
    expiresIn: config.get("VARS.jwt_expiration"),
  })
}

export default signToken