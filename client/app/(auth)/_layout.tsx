import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getDefaultHeaderStyle } from "@/constants/defaultHeaderStyle";

export default function AuthLayout() {
  const { isDark, colors } = useTheme();
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
