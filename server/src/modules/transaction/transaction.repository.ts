import db from "../../db/knex";
import { v4 as uuidv4 } from "uuid";

export const getTransactionsForUser = async (userId: number) => {
  return await db("transactions").where({ userId });
};

export const createTransaction = async (tx: any) => {
  await db("transactions").insert({ id: uuidv4(), ...tx });
};
