import { promise } from "zod";
import pool from "../config/db.js";

export const setUp = async () => {
  const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS Users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  password varchar(255) not null,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
 role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user', 'editor'))  
 );
  `;
  try {
    await Promise.all([await pool.query(createUsersTableQuery)]);
    console.log("All Table have been created!");
  } catch (err) {
    console.error("Error creating tables:", err);
    throw new Error("Error creating tables");
  }
};
