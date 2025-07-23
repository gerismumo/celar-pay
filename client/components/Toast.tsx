import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ToastMessage } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { AlertCircle, CheckCircle, Info } from 'lucide-react-native';

interface ToastProps {
  toast: ToastMessage;
  animation: Animated.Value;
}

const Toast: React.FC<ToastProps> = ({ toast, animation }) => {
  const { colors } = useTheme();

  const getToastStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          icon: <CheckCircle color="white" size={20} />,
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          icon: <AlertCircle color="white" size={20} />,
        };
      case 'info':
      default:
        return {
          backgroundColor: colors.info,
          icon: <Info color="white" size={20} />,
        };
    }
  };

  const { backgroundColor, icon } = getToastStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor },
        {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
      testID="toast"
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.message}>{toast.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: '90%',
  },
  iconContainer: {
    marginRight: 8,
  },
  message: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});

export default Toast;