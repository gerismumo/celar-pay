import { Stack } from "expo-router";

export default function AuthLayout() {
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
