import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '@/src/shared/contexts/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  testID?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  testID,
  secureTextEntry,
  icon,
  rightIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { colors, isDark } = useTheme();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showPasswordToggle = secureTextEntry && !rightIcon;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: isDark ? colors.current.text : colors.textSecondary }]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.inputContainer,
        {
          backgroundColor: isDark ? colors.gray[800] : colors.gray[50],
          borderColor: error 
            ? colors.error 
            : isFocused 
              ? colors.primary 
              : isDark ? colors.gray[700] : colors.border,
        },
        isFocused && styles.focusedContainer,
        error && styles.errorContainer,
      ]}>
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: isDark ? colors.current.text : colors.text,
              flex: 1,
            },
            style,
          ]}
          placeholderTextColor={isDark ? colors.gray[400] : colors.gray[500]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          testID={testID}
          {...props}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={isDark ? colors.gray[400] : colors.gray[500]} />
            ) : (
              <Eye size={20} color={isDark ? colors.gray[400] : colors.gray[500]} />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  focusedContainer: {
    shadowColor: '#9929EA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  errorContainer: {
    shadowColor: '#DC3545',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
  },
  eyeIcon: {
    padding: 4,
  },
  rightIconContainer: {
    marginLeft: 12,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 4,
  },
});

export default Input;