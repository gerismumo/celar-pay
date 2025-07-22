import jwt from "jsonwebtoken";

export const signToken = (payload: object) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Internal server error");
  }

  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
};
