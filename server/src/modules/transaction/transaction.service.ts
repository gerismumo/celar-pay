import { IPaymentData } from "../../shared/types/transaction";
import { findUserById } from "../auth/auth.repository";
import {
  getTransactionsForUser,
  createTransaction,
} from "./transaction.repository";

export const fetchUserTransactions = async (userId: number) => {
  if (!userId) {
    throw new Error("Input data is required");
  }
  return await getTransactionsForUser(userId);
};

export const sendPayment = async (data: IPaymentData) => {
  if (!data) {
    throw new Error("Input data is required");
  }

  const allowedKeys = ["userId", "recipient", "amount", "currency"];
  const extraKeys = Object.keys(data).filter(
    (key) => !allowedKeys.includes(key)
  );

  if (extraKeys.length > 0) {
    throw new Error(`Invalid input keys: ${extraKeys.join(", ")}`);
  }

  const { userId, recipient, amount, currency }: any = data;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  if (
    typeof userId !== "string" ||
    typeof recipient !== "string" ||
    typeof currency !== "string"
  ) {
    throw new Error("recipient, and currency must all be strings");
  }

  if (
    amount === undefined ||
    amount === null ||
    isNaN(Number(amount)) ||
    typeof Number(amount) !== "number"
  ) {
    throw new Error("Amount must be a valid number");
  }

  const parsedAmount = parseFloat(amount);
  if (parsedAmount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  const userExist = await findUserById(userId);

  if (!userExist) {
    throw new Error("User does not exist");
  }

  await createTransaction(data);
};
