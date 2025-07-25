import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/shared/contexts/ThemeContext";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentHeader = () => {
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft
            color={isDark ? colors.current.text : colors.text}
            size={24}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            { color: isDark ? colors.current.text : colors.text },
          ]}
        >
          Send Payment
        </Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PaymentHeader;
