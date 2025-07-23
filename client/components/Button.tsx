import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  testID?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  style,
  disabled,
  testID,
  icon,
  ...props
}) => {
  const { colors, isDark } = useTheme();

  const getButtonContent = () => {
    const textStyle = getTextStyle();
    const content = (
      <>
        {icon && <>{icon}</>}
        {isLoading ? (
          <ActivityIndicator 
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textLight} 
            size="small"
          />
        ) : (
          <Text style={[textStyle, disabled && styles.disabledText]}>
            {title}
          </Text>
        )}
      </>
    );

    if (variant === 'primary' && !disabled) {
      return (
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={[styles.button, styles.gradientButton]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {content}
        </LinearGradient>
      );
    }

    return content;
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    switch (variant) {
      case 'secondary':
        return [
          ...baseStyle,
          styles.secondaryButton,
          { backgroundColor: isDark ? colors.gray[700] : colors.gray[100] }
        ];
      case 'outline':
        return [
          ...baseStyle,
          styles.outlineButton,
          { 
            borderColor: colors.primary,
            backgroundColor: 'transparent'
          }
        ];
      case 'ghost':
        return [
          ...baseStyle,
          styles.ghostButton,
          { backgroundColor: 'transparent' }
        ];
      case 'primary':
      default:
        if (disabled) {
          return [
            ...baseStyle,
            styles.primaryButton,
            { backgroundColor: isDark ? colors.gray[700] : colors.gray[300] }
          ];
        }
        return [...baseStyle, styles.primaryButton];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return [styles.buttonText, { color: colors.primary }];
      case 'secondary':
        return [styles.buttonText, { color: isDark ? colors.current.text : colors.text }];
      case 'primary':
      default:
        return [styles.buttonText, { color: colors.textLight }];
    }
  };

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        disabled={disabled || isLoading}
        testID={testID}
        {...props}
      >
        {getButtonContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabledButton, style]}
      disabled={disabled || isLoading}
      testID={testID}
      {...props}
    >
      {getButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
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
  gradientButton: {
    shadowColor: '#9929EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#9929EA',
  },
  secondaryButton: {
    shadowOpacity: 0.05,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default Button;