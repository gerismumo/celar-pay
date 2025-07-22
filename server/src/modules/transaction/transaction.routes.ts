import { Router } from "express";
import { getTransactions, sendPayment } from "./transaction.controller";
import { verifyToken } from "../../middleware/auth";

const txRouter = Router();

txRouter.use(verifyToken);
txRouter.get("/", getTransactions);
txRouter.post("/send", sendPayment);

const router = Router();

router.use("/transactions", txRouter);

export default router;
