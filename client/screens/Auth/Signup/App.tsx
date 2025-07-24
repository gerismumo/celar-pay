import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, ArrowRight, Building2, Code } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import MainContainer from "@/components/MainContainer";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";

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
  role: Yup.string()
    .oneOf(["psp", "dev"], "Please select a valid role")
    .required("Please select your role"),
});

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  role: "psp" | "dev";
}

const App = () => {
  const { signup, isLoading } = useAuth();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();
  const headerHeight = useHeaderHeight();

  const handleSignup = async (values: SignupFormValues) => {
    try {
      await signup(values.email, values.password, values.role);
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
      <MainContainer
        backgroundColor="transparent"
        contentStyle={{ padding: 20, paddingTop: headerHeight }}
      >
        <View>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/logo.jpeg")}
              style={styles.logoContainer}
            />
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
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              role: "" as "psp" | "dev",
            }}
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
              setFieldValue,
            }) => (
              <View style={styles.formContainer}>
                <View style={styles.roleContainer}>
                  <Text
                    style={[
                      styles.roleLabel,
                      { color: isDark ? colors.current.text : colors.text },
                    ]}
                  >
                    Select Your Role
                  </Text>
                  <Text
                    style={[
                      styles.roleDescription,
                      {
                        color: isDark ? colors.gray[400] : colors.textSecondary,
                      },
                    ]}
                  >
                    Choose the option that best describes you
                  </Text>

                  <View style={styles.roleOptions}>
                    <TouchableOpacity
                      style={[
                        styles.roleOption,
                        {
                          backgroundColor:
                            values.role === "psp"
                              ? colors.primary
                              : isDark
                              ? colors.gray[800]
                              : colors.card,
                          borderColor:
                            values.role === "psp"
                              ? colors.primary
                              : isDark
                              ? colors.gray[700]
                              : colors.border,
                        },
                      ]}
                      onPress={() => setFieldValue("role", "psp")}
                      testID="psp-role-button"
                    >
                      <Building2
                        size={24}
                        color={
                          values.role === "psp"
                            ? colors.textLight
                            : colors.primary
                        }
                      />
                      <Text
                        style={[
                          styles.roleOptionDescription,
                          {
                            color:
                              values.role === "psp"
                                ? colors.textLight
                                : isDark
                                ? colors.gray[400]
                                : colors.textSecondary,
                          },
                        ]}
                      >
                        Payment Service Provider
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.roleOption,
                        {
                          backgroundColor:
                            values.role === "dev"
                              ? colors.primary
                              : isDark
                              ? colors.gray[800]
                              : colors.card,
                          borderColor:
                            values.role === "dev"
                              ? colors.primary
                              : isDark
                              ? colors.gray[700]
                              : colors.border,
                        },
                      ]}
                      onPress={() => setFieldValue("role", "dev")}
                      testID="dev-role-button"
                    >
                      <Code
                        size={24}
                        color={
                          values.role === "dev"
                            ? colors.textLight
                            : colors.primary
                        }
                      />

                      <Text
                        style={[
                          styles.roleOptionDescription,
                          {
                            color:
                              values.role === "dev"
                                ? colors.textLight
                                : isDark
                                ? colors.gray[400]
                                : colors.textSecondary,
                          },
                        ]}
                      >
                        Developer
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {touched.role && errors.role && (
                    <Text style={[styles.errorText, { color: colors.error }]}>
                      {errors.role}
                    </Text>
                  )}
                </View>

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
    marginBottom: 20,
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
  roleContainer: {
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  roleDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  roleOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 2,
    width: "100%",
  },
  roleOption: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  roleOptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  roleOptionDescription: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 8,
  },
});

export default App;
