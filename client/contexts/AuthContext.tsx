import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { router } from "expo-router";

const mockLogin = async (email: string, password: string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const role = email.includes("psp") ? "psp" : "dev";
  return {
    id: "123",
    email,
    role,
    token: "mock-jwt-token",
  };
};

const mockSignup = async (email: string, password: string, role:string): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!role || (role !== "psp" && role !== "dev")) {
    throw new Error("Role must be either 'psp' or 'dev'");
  }

  return {
    id: "123",
    email,
    role,
    token: "mock-jwt-token",
  };
};

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
      const userData = await mockLogin(email, password);
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      router.replace("/(tabs)");
      return userData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role:string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await mockSignup(email, password, role);
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      router.replace("/(tabs)");
      return userData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
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
