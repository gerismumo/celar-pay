import bcrypt from "bcryptjs";
import { signToken } from "../../shared/utils/jwt";
import { createUser, findUserByEmail } from "./auth.repository";
import { isStrongPassword, isValidEmail } from "../../shared/utils/validators";

export const signup = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) => {
  if (!email || !password || !role) {
    throw new Error("All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 6 characters long, contain at least one digit and one special character"
    );
  }

  const hash = await bcrypt.hash(password, 10);
  await createUser({ email, password: hash, role });
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return { token };
};
