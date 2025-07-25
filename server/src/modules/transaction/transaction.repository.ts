import db from "../../db/knex";
import { v4 as uuidv4 } from "uuid";

export const getTransactionsForUser = async (userId: number) => {
  try {
    return await db("transactions")
      .where({ userId })
      .orderBy("timestamp", "desc");
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};

export const createTransaction = async (tx: any) => {
  try {
    await db("transactions").insert({ id: uuidv4(), ...tx });
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};
