import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import txRoutes from "./modules/transaction/transaction.routes";

const app = express();
app.use(express.json());

//link routes here
const apiRouter = express.Router();

apiRouter.use(authRoutes);

app.use("/api", authRoutes);
app.use("/api", txRoutes);

app.get("/", (_req, res) => {
  res.send("ok");
});

export default app;
