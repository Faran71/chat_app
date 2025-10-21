/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.table("users", function(table) {
    table.string("profile_picture").nullable(); // add after email for readability
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.table("users", function(table) {
    table.dropColumn("profile_picture");
  });
};
