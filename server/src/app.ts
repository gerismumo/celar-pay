import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import txRoutes from "./modules/transaction/transaction.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
