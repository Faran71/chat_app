# Local Postgres Server Setup
### 1. Install `postgresql` v.16 to get access to `psql` commands
- ### Homebrew for MacOS https://formulae.brew.sh/formula/postgresql@16
- ### Windows https://www.postgresql.org/download/windows/

### 2. Create the chat_app Database
```
createdb chat_app
```
- ### Optional: Delete Database
    - ### `dropdb chat_app`
- ### Optional: List Databases
    - ### `psql -l`

### 3. Make sure you're in the `postgres` directory
```
cd postgres
```
### 4. Initialise the Chat App Database
```
psql -U {user_name} -d chat_app -f db_data.sql
```
- ### `{user_name}` above, is the root user on my machine, which should have max permissions
    - ### replace `{user_name}` with your root user name, which you can check via
    ```
    whoami
    ```
- ### You will also need to replace `{user_name}` inside `backend/config/local.json` for `postgres_user`

<br>

# Migrations
- ### This uses `knex` https://www.npmjs.com/package/knex

### Steps to create, apply, rollback database migrations...

### 1. Generate new Migration file
```
npx knex migrate:make CUSTOM_MIGRATION_NAME --env global
```

### 2. Make your updates to the newly generated migration file
- ### e.g. Adding a column to a table

### 3. Apply Migrations up to latest
```
NODE_ENV=development npx knex migrate:latest --env global
```
- ### `NODE_ENV=...` will be dependent on the environment
    - ### When applying migration locally, just use `npx knex migrate:latest --env global` which will use `backend/config/default.json` values

### 4. Rollback latest Batch of Migrations
```
npx knex migrate:rollback --env global
```
- ### To rollback the migrations by 1
    - ### `npx knex migrate:rollback --env global --step=1`