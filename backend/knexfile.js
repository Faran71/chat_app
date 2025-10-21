const config = require("config");
// import { postgresPort } from "./constants/numbers"

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  global: {
    client: 'pg',
    connection: {
      host: config.get("VARS.postgres_host"),
      database: config.get("VARS.postgres_db_name"),
      user: config.get("VARS.postgres_user"),
      password: config.get("VARS.postgres_password"),
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_global'
    }
  }
};

console.log("CURRENT ENV:", process.env.NODE_ENV);