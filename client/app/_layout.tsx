import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { AuthProvider } from "@/contexts/AuthContext";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ToastProvider } from "@/contexts/ToastContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider as AppThemeProvider } from "@/contexts/ThemeContext";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppThemeProvider>
      <NavigationThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <AuthProvider>
          <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ToastProvider>
        </AuthProvider>
      </NavigationThemeProvider>
    </AppThemeProvider>
  );
}
