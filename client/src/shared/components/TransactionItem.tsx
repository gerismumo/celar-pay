import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "@/src/shared/types";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import dayjs from "dayjs";

interface TransactionItemProps {
  transaction: Transaction;
  testID?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  testID,
}) => {
  const { recipient, amount, currency, timestamp } = transaction;
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background },
      ]}
      testID={testID}
    >
      <View style={styles.avatarContainer}>
        {
          <View
            style={[
              styles.avatar,
              styles.placeholderAvatar,
              { backgroundColor: isDark ? colors.gray[700] : colors.gray[200] },
            ]}
          >
            <Text
              style={[
                styles.placeholderText,
                { color: isDark ? colors.gray[300] : colors.gray[600] },
              ]}
            >
              {recipient.charAt(0)}
            </Text>
          </View>
        }
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.recipientName,
            { color: isDark ? colors.current.text : colors.text },
          ]}
        >
          {recipient}
        </Text>
        <Text
          style={[
            styles.timestamp,
            { color: isDark ? colors.gray[400] : colors.textSecondary },
          ]}
        >
          {dayjs(timestamp).format("MMM D, YYYY h:mm A")}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: isDark ? colors.current.text : colors.text },
          ]}
        >
          {currency} {amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholderAvatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  infoContainer: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TransactionItem;
