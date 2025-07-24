import apiClient from "@/services/apiClient";

export const login = async(email: string, password: string) => {
    const response = apiClient.post("/auth/login", { email, password });
}
  


