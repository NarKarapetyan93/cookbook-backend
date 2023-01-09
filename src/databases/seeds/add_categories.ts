import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert([
    { id: 1, title: 'dinner' },
    { id: 2, title: 'lunch' },
    { id: 3, title: 'breakfast' },
    { id: 4, title: 'desserts' },
    { id: 5, title: 'healthy' },
    { id: 6, title: 'vegan' },
    { id: 7, title: 'soup' },
    { id: 8, title: 'drinks' },
    { id: 9, title: 'salads' },
    { id: 10, title: 'pasta' },
    { id: 11, title: 'snacks' },
    { id: 12, title: 'vegetarian' },
    { id: 13, title: 'easy' },
  ]);
}
