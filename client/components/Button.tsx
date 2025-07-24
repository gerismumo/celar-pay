import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  testID?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  isLoading = false,
  style,
  disabled,
  testID,
  icon,
  ...props
}) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[disabled && styles.disabledButton, style]}
      testID={testID}
      {...props}
    >
      <LinearGradient
        colors={[Colors.secondary, Colors.secondaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, disabled && styles.disabledGradient]}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.accent} size="small" />
        ) : (
          <View style={styles.content}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    marginRight: 2,
    color: Colors.accent,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: Colors.accent,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledGradient: {
    opacity: 0.7,
  },
});

export default Button;
