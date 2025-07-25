import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { User } from "@/src/shared/types";
import { router } from "expo-router";
import { loginUser } from "../api/login";
import { signupUser } from "../api/signin";

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser && isMounted) {
          setUser(JSON.parse(storedUser));
          router.replace("/(tabs)");
        }
      } catch (err) {
        console.error("Failed to load user from storage", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password);

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      router.replace("/(tabs)");
      return userData;
    } catch (err: any) {
      console.log("Login error:", err);
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
      const userData = await signupUser(email, password, role);

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
    if (user?.id) {
      const toastShownKey = `role_toast_shown_${user.id}`;
      await AsyncStorage.removeItem(toastShownKey);
    }

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
