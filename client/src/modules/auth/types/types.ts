export type UserRole = "psp" | "dev";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface SignupResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}
