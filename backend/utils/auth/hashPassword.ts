import bcrypt from "bcryptjs"

const hashPassword = (password: string) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(password, salt);
}

export default hashPassword