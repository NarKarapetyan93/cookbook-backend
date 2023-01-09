import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipes_ingredients', table => {
    table.bigIncrements('id').unsigned().primary();
    table.integer('recipe_id').references('id').inTable('recipes');
    table.integer('ingredient_id').references('id').inTable('ingredients');
    table.integer('measurement_id').references('id').inTable('measurements');
    table.timestamps(false, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipes_ingredients');
}
