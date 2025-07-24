import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { failure } from "../shared/utils/response";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return failure(res, "Not authorized, please login", 401);

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("Internal server error");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return failure(res, "Invalid token", 401);
  }
};
