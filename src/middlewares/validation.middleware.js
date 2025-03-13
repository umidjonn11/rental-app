import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateData(schema) {
	return (req, res, next) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ error: "Invalid data", details: errorMessages });
			} else {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ error: "Internal Server Error" });
			}
		}
	};
}

export function validateParams(schema) {
	return (req, res, next) => {
		try {
			schema.parse(req.params);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ error: "Invalid data", details: errorMessages });
			} else {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ error: "Internal Server Error" });
			}
		}
	};
}

export function validateQuery(schema) {
	return (req, res, next) => {
		try {
			schema.parse(req.query);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));
				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ error: "Invalid data", details: errorMessages });
			} else {
				res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ error: "Internal Server Error" });
			}
		}
	};
}