import express from "express";
import authRoutes from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());

//link routes here
app.use(authRoutes);
export default app;
