import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ViewStyle,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "toastify-react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface MainContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  contentStyle?: ViewStyle;
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  backgroundColor,
  contentStyle,
}) => {
  const themeBackground = useThemeColor({}, "background");

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: backgroundColor || themeBackground },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false} >
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Toast position="top" />
          <View style={[styles.content, contentStyle]}>{children}</View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  
});

export default MainContainer;
