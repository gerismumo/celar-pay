import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/src/shared/contexts/ToastContext";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "@/src/shared/types";
import TransactionItem from "@/src/shared/components/TransactionItem";
import { getTransactions } from "@/services/transactions/api";
import { useFocusEffect } from "@react-navigation/native";

const App = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        setIsLoading(true);
        try {
          const data = await getTransactions();
          setTransactions(data.data);
        } catch (error: any) {
          showToast("error", error.message || "Failed to fetch transactions");
        } finally {
          setIsLoading(false);
        }
      };

      fetchTransactions();
    }, [])
  );

  useEffect(() => {
    if (!user?.id || !user?.role) return;

    const checkAndShowRoleToast = async () => {
      const toastShownKey = `role_toast_shown_${user.id}`;
      const toastShown = await AsyncStorage.getItem(toastShownKey);
      if (!toastShown) {
        await AsyncStorage.setItem(toastShownKey, "true");

        setTimeout(() => {
          if (user.role === "psp") {
            showToast("info", "You have 5 merchants connected", 4000);
          } else if (user.role === "dev") {
            showToast("info", "You've made 127 API calls this week", 4000);
          }
        }, 2000);
      }
    };

    checkAndShowRoleToast();
  }, [user?.id, user?.role]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background },
      ]}
    >
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
