import { Response } from "express";
import * as txService from "./transaction.service";

export const getTransactions = async (req: any, res: Response) => {
  try {
    const transactions = await txService.fetchUserTransactions(req.user.id);
    res.status(200).json({
      message: "Fetched successifully",
      data: transactions,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const sendPayment = async (req: any, res: Response) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    await txService.sendPayment(data);
    res.status(201).json({
      message: "Transaction send successiful",
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
