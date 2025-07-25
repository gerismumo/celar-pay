import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("transactions", (table) => {
    table.dropForeign(["userId"]);
  });

  await knex.schema.alterTable("transactions", (table) => {
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("transactions", (table) => {
    table.dropForeign(["userId"]);
  });

  await knex.schema.alterTable("transactions", (table) => {
    table.foreign("userId").references("id").inTable("users");
  });
}
