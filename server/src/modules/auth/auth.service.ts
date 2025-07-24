import bcrypt from "bcryptjs";
import { signToken } from "../../shared/utils/jwt";
import {
  createUser,
  findUserByEmail,
  updateLoggedInAt,
} from "./auth.repository";
import { isStrongPassword, isValidEmail } from "../../shared/utils/validators";
import { UserRole, validRoles } from "../../shared/utils/lib";

export const signup = async (data: {
  email?: string;
  password?: string;
  role?: string;
}) => {
  if (!data) {
    throw new Error("Input data is required");
  }

  const allowedKeys = ["email", "password", "role"];
  const extraKeys = Object.keys(data).filter(
    (key) => !allowedKeys.includes(key)
  );
  if (extraKeys.length > 0) {
    throw new Error(`Invalid input keys: ${extraKeys.join(", ")}`);
  }

  const { email, password, role } = data;

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

  if (!validRoles.includes(role as UserRole)) {
    throw new Error("Invalid role");
  }

  const user = await findUserByEmail(email);
  if (user) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);

  const createdUserId = await createUser({
    email,
    password: hash,
    role: role as UserRole,
  });

  if (!createdUserId) {
    throw new Error("Internal server error");
  }

  const token = signToken({
    id: createdUserId.id,
    role,
    email,
  });
  return {
    access_token: token,
    user: {
      id: createdUserId.id,
      role,
      email,
    },
  };
};

export const login = async (data: { email?: string; password?: string }) => {
  if (!data) {
    throw new Error("Input data is required");
  }

  const allowedKeys = ["email", "password"];
  const extraKeys = Object.keys(data).filter(
    (key) => !allowedKeys.includes(key)
  );
  if (extraKeys.length > 0) {
    throw new Error(`Invalid input keys: ${extraKeys.join(", ")}`);
  }

  const { email, password } = data;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  await updateLoggedInAt(user.id);

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return {
    access_token: token,
    user: {
      id: user.id,
      role: user.role,
      email: user.email,
    },
  };
};
