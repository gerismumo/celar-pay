import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const backgroundColor = colors?.current?.background || colors.background;
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor }}>
      <View
        style={[
          styles.header,
          {
            borderBottomColor: isDark ? colors.gray[800] : colors.border,
          },
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
