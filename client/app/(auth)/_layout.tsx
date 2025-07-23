import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{ title: "Welcome back", headerShown: true }}
      />
      <Stack.Screen name="signup" options={{ title: "Sign Up", headerShown: true  }} />
    </Stack>
  );
}
