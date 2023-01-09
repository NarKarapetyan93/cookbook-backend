import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipes', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('duration').notNullable();
    table.binary('image').notNullable();
    table.string('calories').notNullable();
    table.integer('category_id').references('id').inTable('categories');
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(false, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipes');
}
