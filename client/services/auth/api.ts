import apiClient from "@/services/apiClient";

export const login = async (email: string, password: string,role:string) => {
  const response = await apiClient.post("/auth/login", { email, password, role });
  console.log("response", response.data);
};
