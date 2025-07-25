import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "@/src/shared/contexts/ToastContext";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import Button from "@/src/shared/components/Button";
import Input from "@/src/shared/components/Input";
import MainContainer from "@/src/shared/components/MainContainer";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { LoginFormValues } from "../types/types";
import { useAuth } from "../contexts/authContext";

const loginSchema = Yup.object().shape({
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
});



const App = () => {
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();
  const headerHeight = useHeaderHeight();

  const handleLogin = async (
    values: LoginFormValues,
    resetForm: () => void
  ) => {
    try {
      await login(values.email, values.password);
      resetForm();
      showToast("success", "Welcome back!");
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Login failed"
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
              Welcome Back
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? colors.gray[400] : colors.textSecondary },
              ]}
            >
              Sign in to continue to Celar Pay
            </Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, { resetForm }) => handleLogin(values, resetForm)}
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
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  autoComplete="password"
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

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text
                    style={[
                      styles.forgotPasswordText,
                      { color: colors.primary },
                    ]}
                  >
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Sign In"
                  onPress={() => handleSubmit()}
                  isLoading={isLoading}
                  icon={<ArrowRight size={20} color={colors.accent} />}
                  testID="login-button"
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
              Don't have an account?{" "}
            </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={[styles.signupLink, { color: colors.primary }]}>
                  Sign up
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
    marginTop: -10,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default App;
