import { genSalt, hash, compare } from "bcryptjs";

export async function hashPassword(password) {
	const salt = await genSalt();
	const hashedPassword = await hash(password, salt);

	return hashedPassword;
}

export function matchPassword(password, hashPassword) {
	const isEqual = compare(hashPassword, password); // true
	return isEqual;
}