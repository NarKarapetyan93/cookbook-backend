import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('measurements').del();

  // Inserts seed entries
  await knex('measurements').insert([
    { id: 1, title: 'table_spoon' },
    { id: 2, title: 'tea_spoon' },
    { id: 3, title: 'gram' },
    { id: 4, title: 'cup' },
    { id: 5, title: 'pinch' },
  ]);
}
