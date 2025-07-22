import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().notNullable().unique();
    table.text("email").notNullable().unique();
    table.text("password").notNullable();
    table
      .enu("role", ["psp", "dev"], {
        useNative: true,
        enumName: "user_role",
      })
      .notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("logged_in_at").nullable(); 
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
