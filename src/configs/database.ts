import pg from "pg";

const connectionToDatabase = new pg.Pool({
	connectionString: process.env.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

export { connectionToDatabase };
