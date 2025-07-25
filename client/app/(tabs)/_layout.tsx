import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/src/shared/components/HapticTab";
import { IconSymbol } from "@/src/shared/components/ui/IconSymbol";
import TabBarBackground from "@/src/shared/components/ui/TabBarBackground";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import Header from "@/src/modules/transactions/components/transactionHeader";
import PaymentHeader from "@/src/modules/transactions/components/paymentHeader";
import { getDefaultHeaderStyle } from "@/src/shared/constants/defaultHeaderStyle";


export default function TabLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondaryDark,
        tabBarInactiveTintColor: colors.current.tint,
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
          color: colors.current.text,
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
          headerStyle: getDefaultHeaderStyle(isDark, colors),
        }}
      />
    </Tabs>
  );
}
