import jwt from "jsonwebtoken";

export async function generateToken(payload, secrets, expiresIn) {
	return jwt.sign(payload, secrets, {
		expiresIn,
	});
}