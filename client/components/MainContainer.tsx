import React from "react";
import { View, SafeAreaView, StyleSheet, Platform, KeyboardAvoidingView, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";
import Container from "toastify-react-native";

interface MainProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainProps> = ({ children }) => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ExpoStatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container, {
            backgroundColor 
        }]}
      >
        <Container position="top" />
        <View style={styles.content}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default MainContainer;
