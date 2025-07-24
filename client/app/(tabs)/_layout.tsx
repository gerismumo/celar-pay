import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/screens/Transactions/Header";
import PaymentHeader from "@/screens/SendPayment/Header";
import { useTheme } from "@/contexts/ThemeContext";
import { getDefaultHeaderStyle } from "@/constants/defaultHeaderStyle";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? "light"];
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: {
          color: themeColor.text,
          fontSize: 13,
          fontWeight: "700",
        },
        animation: "none",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="send-payment"
        options={{
          title: "Payment",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="creditcard" color={color} />
          ),
          headerShown: true,
          header: () => <PaymentHeader />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
          headerShown: true,
          headerStyle:  getDefaultHeaderStyle(isDark, colors)
        }}
      />
    </Tabs>
  );
}
