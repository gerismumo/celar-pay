import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { User, DollarSign } from "lucide-react-native";
import { useToast } from "@/src/shared/contexts/ToastContext";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import Button from "@/src/shared/components/Button";
import Input from "@/src/shared/components/Input";
import { Currency, PaymentFormData } from "@/src/shared/types";
import CurrencySelector from "@/src/shared/components/CurrencySelector";
import { sendPayment } from "@/services/transactions/api";

const paymentSchema = Yup.object().shape({
  recipient: Yup.string()
    .min(2, "Recipient name must be at least 2 characters")
    .required("Recipient is required"),
  amount: Yup.number()
    .positive("Amount must be positive")
    .required("Amount is required"),
  currency: Yup.string().required("Currency is required"),
});

const App = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();

  const handleSendPayment = async (
    values: PaymentFormData,
    resetForm: () => void
  ) => {
    try {
      const result = await sendPayment(values);
      showToast(
        "success",
        result.message ||
          `Payment of ${values.currency} ${values.amount} sent to ${values.recipient}`
      );
      resetForm();
      router.push("/");
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Failed to send payment"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{ recipient: "", amount: "", currency: "USD" }}
          validationSchema={paymentSchema}
          onSubmit={(values, { resetForm }) =>
            handleSendPayment(values, resetForm)
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              <Input
                label="Recipient"
                placeholder="Enter recipient name"
                value={values.recipient}
                onChangeText={handleChange("recipient")}
                onBlur={handleBlur("recipient")}
                error={
                  touched.recipient && errors.recipient
                    ? errors.recipient
                    : undefined
                }
                icon={
                  <User
                    size={20}
                    color={isDark ? colors.gray[400] : colors.gray[500]}
                  />
                }
                testID="recipient-input"
              />

              <Input
                label="Amount"
                placeholder="0.00"
                value={values.amount}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                keyboardType="numeric"
                error={
                  touched.amount && errors.amount ? errors.amount : undefined
                }
                icon={
                  <DollarSign
                    size={20}
                    color={isDark ? colors.gray[400] : colors.gray[500]}
                  />
                }
                testID="amount-input"
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isDark ? colors.current.text : colors.textSecondary,
                  },
                ]}
              >
                Currency
              </Text>
              <CurrencySelector
                value={values.currency}
                onChange={(currency: Currency) =>
                  setFieldValue("currency", currency.code)
                }
                testID="currency-selector"
              />

              <View style={styles.buttonContainer}>
                <Button
                  title="Send Payment"
                  onPress={() => handleSubmit()}
                  isLoading={isSubmitting}
                  testID="send-payment-button"
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 32,
  },
});

export default App;
