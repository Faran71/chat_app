import config from "config"
import pg from "pg"
import app from "./app"
import { apiPort, postgresPort } from "./constants/numbers"
import * as fs from "fs";

const clientOptions: pg.ClientConfig = {
	host: config.get("VARS.postgres_host"),
	port: postgresPort,
	database: config.get("VARS.postgres_db_name"),
	user: config.get("VARS.postgres_user"),
	password: config.get("VARS.postgres_password"),
}

if (
	process?.env?.NODE_ENV &&
	(process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "production")
) {
	clientOptions.ssl = {
		ca: fs.readFileSync("./certs/rds-combined-ca-bundle.pem").toString()
	}
}

export const client = new pg.Client(clientOptions)

client.connect();

app.listen(
	apiPort,
	async () => {
		console.log("API is running...")
		console.log(`> Port: ${apiPort}`)
		try {
			await client.query("SELECT * FROM users WHERE id = 1")
			console.log(`> Connected to Postgres Server...`)
		} catch(e) {
			console.log("> Could not connect to postgres server...")
			console.log(`> ${String(e)}`)
		}
	}
)