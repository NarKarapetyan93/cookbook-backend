import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('measurements', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('title').notNullable();
    table.timestamps(false, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('measurements');
}
