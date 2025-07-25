import apiClient from "@/services/apiClient";
import { User } from "@/src/shared/types";
import { SignupResponse } from "../types/types";

export const signupUser = async (
  email: string,
  password: string,
  role: string
): Promise<User> => {
  const response = await apiClient.post<{ data: SignupResponse }>(
    "/auth/signup",
    {
      email,
      password,
      role,
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
