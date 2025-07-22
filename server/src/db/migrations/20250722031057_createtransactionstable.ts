import type { Knex } from "knex";
export async function up(knex: Knex) {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary().notNullable().unique();
    table.uuid("userId").references("id").inTable("users");
    table.text("recipient");
    table.float("amount");
    table.string("currency");
    table.timestamp("timestamp").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable("transactions");
}
