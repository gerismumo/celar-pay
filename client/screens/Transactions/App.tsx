import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "@/types";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import TransactionItem from "@/components/TransactionItem";
import mockTransactions from "@/mocks/transactions";

const App = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTransactions(mockTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const checkAndShowRoleToast = async () => {
      if (!user) return;

      const toastShownKey = `role_toast_shown_${user.id}`;
      const toastShown = await AsyncStorage.getItem(toastShownKey);

      if (!toastShown) {
        setTimeout(() => {
          if (user.role === "psp") {
            showToast("info", "You have 5 merchants connected");
          } else if (user.role === "dev") {
            showToast("info", "You've made 127 API calls this week");
          }
        }, 1500);

        await AsyncStorage.setItem(toastShownKey, "true");
      }
    };

    checkAndShowRoleToast();
  }, [user, showToast]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background },
      ]}
    >
      {/* <View
        style={[
          styles.header,
          { borderBottomColor: isDark ? colors.gray[800] : colors.border },
        ]}
      >
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? colors.current.text : colors.text },
          ]}
        >
          Transactions
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/send-payment")}
          testID="add-payment-button"
          style={[styles.addButton, { backgroundColor: colors.primary }]}
        >
          <Plus color={colors.textLight} size={20} />
        </TouchableOpacity>
      </View> */}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text
            style={[
              styles.loadingText,
              { color: isDark ? colors.gray[400] : colors.textSecondary },
            ]}
          >
            Loading transactions...
          </Text>
        </View>
      ) : transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.emptyText,
              { color: isDark ? colors.gray[400] : colors.textSecondary },
            ]}
          >
            No transactions yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          contentContainerStyle={styles.listContent}
          testID="transactions-list"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#9929EA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
});

export default App;
