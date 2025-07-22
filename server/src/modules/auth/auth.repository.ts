import db from '../../db/knex';
import { v4 as uuidv4 } from "uuid";
import { CreateUserInput } from '../../shared/types/user';

export const createUser = async (user: CreateUserInput) => {
  await db("users").insert({
    id: uuidv4(),
    ...user,
  });
};
export const findUserByEmail = (email: string) =>
  db('users').where({ email }).first();
