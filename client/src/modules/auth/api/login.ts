import apiClient from "@/services/apiClient";
import { User } from "@/src/shared/types";
import { LoginResponse } from "../types/types";

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await apiClient.post<{ data: LoginResponse }>(
    "/auth/login",
    {
      email,
      password,
    }
  );

  const { access_token, user } = response.data.data;

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    token: access_token,
  };
};
