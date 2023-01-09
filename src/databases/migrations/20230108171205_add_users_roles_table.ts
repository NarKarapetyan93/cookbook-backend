import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_roles', table => {
    table.bigIncrements('id').unsigned().primary();
    table.integer('user_id').references('id').inTable('users');
    table.integer('role_id').references('id').inTable('roles');
    table.timestamps(false, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_roles');
}
