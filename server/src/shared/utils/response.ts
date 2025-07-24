import { Response } from "express";

export const success = (
  res: Response,
  data: any = null,
  message = "Success",
  code = 200
) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

export const failure = (
  res: Response,
  message = "Something went wrong",
  code = 400
) => {
  return res.status(code).json({
    success: false,
    message,
  });
};
