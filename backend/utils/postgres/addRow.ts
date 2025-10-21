import { Client } from "pg"
import { TTables } from "../../models/types"

const addRow = async (
	client: Client,
	data: object,
	table: TTables
) => {
	return client.query(`
		INSERT INTO ${table} (${Object.keys(data).join(', ')})
		VALUES (${Object.values(data).map(val => `'${val}'`).join(', ')})
	`)
}

export default addRow