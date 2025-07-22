import express from "express";
import authRoutes from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());

//link routes here
const apiRouter = express.Router();

apiRouter.use(authRoutes);

app.use("/api", apiRouter);

app.get("/", (_req, res) => {
  res.send("ok");
});

export default app;
