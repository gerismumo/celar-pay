import { Response } from "express";
import * as txService from "./transaction.service";
import { failure, success } from "../../shared/utils/response";

export const getTransactions = async (req: any, res: Response) => {
  try {
    const transactions = await txService.fetchUserTransactions(req.user.id);
    return success(res, transactions, "Fetched successifully", 200);
  } catch (err: any) {
    return failure(res, err.message || "Signup failed", 400);
  }
};

export const sendPayment = async (req: any, res: Response) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    await txService.sendPayment(data);
    return success(res, null, "Transaction send successiful", 201);
  } catch (err: any) {
    return failure(res, err.message || "Signup failed", 400);
  }
};
