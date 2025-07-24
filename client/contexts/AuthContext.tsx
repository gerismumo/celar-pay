import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { router } from "expo-router";
import apiClient from "@/services/apiClient";

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to load user from storage", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { access_token, user } = response.data.data;

      const userData: User = {
        id: user.id,
        email: user.email,
        role: user.role,
        token: access_token,
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      router.replace("/(tabs)");
      return userData;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post("/auth/signup", {
        email,
        password,
        role,
      });

      const { access_token, user } = response.data.data;

      const userData: User = {
        id: user.id,
        email: user.email,
        role: user.role,
        token: access_token,
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      router.replace("/(tabs)");
      return userData;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/login");
  };

  return {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
  };
});
