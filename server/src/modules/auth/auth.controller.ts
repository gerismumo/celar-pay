import { Request, Response } from "express";
import * as authService from "./auth.service";
import { failure, success } from "../../shared/utils/response";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);
    return success(res, result, "User created", 201);
  } catch (err: any) {
    return failure(res, err.message || "Signup failed", 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    return success(res, result, "Successfully signed in", 200);
  } catch (err: any) {
    return failure(res, err.message || "Login failed", 400);
  }
};
