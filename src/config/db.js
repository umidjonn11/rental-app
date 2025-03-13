import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL, //postgresql://username:password@host:port/database

	// or you could specify individually:
	// user: process.env.DB_USER,
	// host: process.env.DB_HOST,
	// database: process.env.DB_NAME,
	// password: process.env.DB_PASS,
	// port: process.env.DB_PORT,
});

// Optionally test the connection
pool
	.connect()
	.then((client) => {
		console.log("Database connected successfully");
		client.release();
	})
	.catch((err) => console.error("Database connection error", err.stack));

export default pool;