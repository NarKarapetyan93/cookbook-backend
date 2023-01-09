import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').unsigned().primary();
    table.string('firstname').nullable();
    table.string('lastname').nullable();
    table.integer('birth_year').nullable();
    table.string('email', 45).notNullable();
    table.string('password', 255).notNullable();
    table.text('avatar').nullable();
    table.timestamp('email_verified').nullable();
    table.boolean('active').nullable();
    table.timestamps(false, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
