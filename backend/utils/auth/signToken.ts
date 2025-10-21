import jwt from "jsonwebtoken"
import config from "config"
import { TPreAccountUser } from "@lumina/shared/models/types"

const signToken = (payload: TPreAccountUser) => {
	return jwt.sign(
		payload,
		config.get("VARS.jwt_key"),
		{ expiresIn: config.get("VARS.jwt_expiration") }
	);
};

export default signToken