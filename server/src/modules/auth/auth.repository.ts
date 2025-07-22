import db from '../../db/knex';

export const createUser = (user: { email: string; password: string; role: string }) =>
  db('users').insert(user);

export const findUserByEmail = (email: string) =>
  db('users').where({ email }).first();
