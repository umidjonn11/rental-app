import { createUser, getUserByEmail, getUserById } from "../service/index.js";
import { hashPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export const authController = {
	async signup(req, res, next) {
		try {
			const body = req.body;
			const hashedPassword = await hashPassword(body.password);
			body.password = hashedPassword;
			const createdUser = await createUser(body);

			res.send(createdUser);
		} catch (error) {
			next(error);
		}
	},
	async signin(req, res, next) {
		try {
			const body = req.body;

			const currentUser = await getUserByEmail(body.email);

			const payload = {
				sub: currentUser.user_id,
				first_name: currentUser.first_name,
				last_name: currentUser.last_name,
				phone: currentUser.phone,
				address: currentUser.address,
			};

			const accessToken = await generateToken(
				payload,
				process.env.JWT_ACCESS_SECRET,
				process.env.JWT_ACCESS_EXPIRES_IN,
			);

			const refreshToken = await generateToken(
				payload,
				process.env.JWT_REFRESH_SECRET,
				process.env.JWT_REFRESH_EXPIRES_IN,
			);

			return res.send({
				data: {
					accessToken,
					refreshToken,
				},
			});
		} catch (error) {
			console.log(error)
			next(error);
		}
	},
	profile(req, res, next) {
		try {
			res.send(req.user);
		} catch (error) {
			next(error);
		}
	},
};