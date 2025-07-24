import { Request, Response } from "express";
import * as authService from "./auth.service";
import { failure, success } from "../../shared/utils/response";

export const signup = async (req: Request, res: Response) => {
  try {
    await authService.signup(req.body);
    return success(res, null, "User created", 201);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      message: "Successfully signed in",
      token: result,
    });
  } catch (err: any) {
    return failure(res, err.message || "Signup failed", 400);
  }
};
