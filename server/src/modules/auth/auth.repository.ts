import db from "../../db/knex";
import { v4 as uuidv4 } from "uuid";
import { CreateUserInput } from "../../shared/types/user";

export const createUser = async (user: CreateUserInput) => {
  const addedUser = await db("users").insert({
    id: uuidv4(),
    ...user,
  }).returning('id');

  return addedUser[0]
};
export const findUserByEmail = async (email: string) => {
  return await db("users").where({ email }).first();
};

export const updateLoggedInAt = async (userId: string) => {
  return await db("users")
    .where({ id: userId })
    .update({ logged_in_at: new Date() });
};

export const findUserById = async (userId: string) => {
  return await db("users").where({id: userId }).first();
};
