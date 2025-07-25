import apiClient from "@/services/apiClient";
import { PaymentFormData } from "@/src/shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendPayment = async (paymentData: PaymentFormData) => {
  try {
    const storedUser = await AsyncStorage.getItem("user");
    if (!storedUser) throw new Error("Unauthorized");

    const { token } = JSON.parse(storedUser);

    const response = await apiClient.post("/transactions/send", paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Payment failed. Please try again."
    );
  }
};

export const getTransactions = async () => {
  try {
    const storedUser = await AsyncStorage.getItem("user");
    if (!storedUser) throw new Error("Unauthorized");

    const { token } = JSON.parse(storedUser);

    const response = await apiClient.get("/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    console.error("Get transactions error:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message || "Failed to fetch transactions."
    );
  }
};
