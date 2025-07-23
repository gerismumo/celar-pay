import React, { createContext, useContext, useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ToastMessage } from "@/types";
import Toast from "@/components/Toast";

interface ToastContextType {
  showToast: (
    type: "success" | "error" | "info",
    message: string,
    duration?: number
  ) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const showToast = (
    type: "success" | "error" | "info",
    message: string,
    duration = 3000
  ) => {
    setToast({
      id: Date.now().toString(),
      type,
      message,
    });

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToast(null);
    });
  };

  const hideToast = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setToast(null);
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <View style={styles.toastContainer} pointerEvents="none">
          <Toast toast={toast} animation={animation} />
        </View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
});
