import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipes_steps', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.text('images').nullable();
    table.integer('recipe_id').references('id').inTable('recipes');
    table.timestamps(false, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipes_steps');
}
