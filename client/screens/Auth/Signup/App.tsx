import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import MainContainer from "@/components/MainContainer";

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/(?=.*[a-zA-Z])/, "Password must contain at least one letter")
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const App = () => {
  const { signup, isLoading } = useAuth();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();

  const handleSignup = async (values: SignupFormValues) => {
    try {
      await signup(values.email, values.password);
      showToast("success", "Account created successfully!");
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Signup failed"
      );
    }
  };

  return (
    <LinearGradient
      colors={
        isDark
          ? [colors.backgroundDark, colors.gray[900]]
          : [colors.purple[50], colors.background]
      }
      style={styles.gradient}
    >
      <MainContainer backgroundColor="transparent" contentStyle={{padding: 20}}>
        <View>
          <View style={styles.header}>
            <View
              style={[
                styles.logoContainer,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.logoText}>CP</Text>
            </View>
            <Text
              style={[
                styles.title,
                { color: isDark ? colors.current.text : colors.text },
              ]}
            >
              Create Account
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? colors.gray[400] : colors.textSecondary },
              ]}
            >
              Join Celar Pay and start managing your finances
            </Text>
          </View>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={signupSchema}
            onSubmit={handleSignup}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  icon={
                    <Mail
                      size={20}
                      color={isDark ? colors.gray[400] : colors.gray[500]}
                    />
                  }
                  testID="email-input"
                />

                <Input
                  label="Password"
                  placeholder="Create a password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  autoComplete="new-password"
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  icon={
                    <Lock
                      size={20}
                      color={isDark ? colors.gray[400] : colors.gray[500]}
                    />
                  }
                  testID="password-input"
                />

                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry
                  autoComplete="new-password"
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                  icon={
                    <Lock
                      size={20}
                      color={isDark ? colors.gray[400] : colors.gray[500]}
                    />
                  }
                  testID="confirm-password-input"
                />

                <View style={styles.termsContainer}>
                  <Text
                    style={[
                      styles.termsText,
                      {
                        color: isDark ? colors.gray[400] : colors.textSecondary,
                      },
                    ]}
                  >
                    By creating an account, you agree to our{" "}
                    <Text style={[styles.termsLink, { color: colors.primary }]}>
                      Terms of Service
                    </Text>{" "}
                    and{" "}
                    <Text style={[styles.termsLink, { color: colors.primary }]}>
                      Privacy Policy
                    </Text>
                  </Text>
                </View>

                <Button
                  title="Create Account"
                  onPress={() => handleSubmit()}
                  isLoading={isLoading}
                  icon={<ArrowRight size={20} color={colors.accent} />}
                  testID="signup-button"
                />
              </View>
            )}
          </Formik>

          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                { color: isDark ? colors.gray[400] : colors.textSecondary },
              ]}
            >
              Already have an account?{" "}
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.loginLink, { color: colors.primary }]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </MainContainer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#9929EA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 32,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  termsLink: {
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default App;
