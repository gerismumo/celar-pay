import db from "../../db/knex";
import { v4 as uuidv4 } from "uuid";
import { CreateUserInput } from "../../shared/types/user";

export const createUser = async (user: CreateUserInput) => {
  try {
    const addedUser = await db("users")
      .insert({
        id: uuidv4(),
        ...user,
      })
      .returning("id");

    return addedUser[0];
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};
export const findUserByEmail = async (email: string) => {
  try {
    return await db("users").where({ email }).first();
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};

export const updateLoggedInAt = async (userId: string) => {
  try {
    return await db("users")
      .where({ id: userId })
      .update({ logged_in_at: new Date() });
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};

export const findUserById = async (userId: string) => {
  try {
    return await db("users").where({ id: userId }).first();
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};
