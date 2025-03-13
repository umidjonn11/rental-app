import pool from "../config/db.js";

export async function createUser(user) {
	const query = `
    INSERT INTO Users (first_name, last_name, email, password, phone, address)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
	const values = [
		user.firstName,
		user.lastName,
		user.email,
		user.password,
		user.phone,
		user.address,
	];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

export async function getAllUser() {
	const query = `
    select * from  Users; 
  `;

	try {
		const result = await pool.query(query);
		return result.rows;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
}

export async function getUserById(userId) {
	const query = "SELECT * FROM Users WHERE user_id = $1";
	const values = [userId];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		throw error;
	}
}

export async function getUserByEmail(email) {
	const query = "SELECT * FROM Users WHERE email = $1";
	const values = [email];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		throw error;
	}
}