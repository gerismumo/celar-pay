import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function AuthLayout() {
  const { colors, isDark } = useTheme();
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.current.background,
          },
        }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: true }}
      />
    </Stack>
  );
}
