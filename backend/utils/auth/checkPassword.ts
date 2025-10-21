import bcrypt from "bcryptjs"

const checkPassword = (
	passwordHash: string,
	password: string
) => {
	return bcrypt.compareSync(password, passwordHash);
}

export default checkPassword