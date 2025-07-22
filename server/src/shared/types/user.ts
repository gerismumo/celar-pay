import { UserRole } from "../utils/lib";

export interface CreateUserInput {
  email: string;
  password: string;
  role: UserRole;
}