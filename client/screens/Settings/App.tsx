import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ChevronRight,
  LogOut,
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
} from "lucide-react-native";

const App = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const { colors, isDark } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      showToast("success", "Logged out successfully");
    } catch (error) {
      showToast("error", "Failed to log out");
    }
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: (
            <User
              size={20}
              color={isDark ? colors.gray[400] : colors.gray[600]}
            />
          ),
          label: "Profile",
          onPress: () => {},
        },
        {
          icon: (
            <Bell
              size={20}
              color={isDark ? colors.gray[400] : colors.gray[600]}
            />
          ),
          label: "Notifications",
          onPress: () => {},
        },
        {
          icon: (
            <Shield
              size={20}
              color={isDark ? colors.gray[400] : colors.gray[600]}
            />
          ),
          label: "Security",
          onPress: () => {},
        },
      ],
    },
    {
      title: "Payments",
      items: [
        {
          icon: (
            <CreditCard
              size={20}
              color={isDark ? colors.gray[400] : colors.gray[600]}
            />
          ),
          label: "Payment Methods",
          onPress: () => {},
        },
        {
          icon: (
            <HelpCircle
              size={20}
              color={isDark ? colors.gray[400] : colors.gray[600]}
            />
          ),
          label: "Support",
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.background },
      ]}
    >
      <View
        style={[
          styles.userInfoContainer,
          { borderBottomColor: isDark ? colors.gray[800] : colors.border },
        ]}
      >
        <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.userInitial}>
            {user?.email.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text
            style={[
              styles.userEmail,
              { color: isDark ? colors.current.text : colors.text },
            ]}
          >
            {user?.email}
          </Text>
          <Text
            style={[
              styles.userRole,
              { color: isDark ? colors.gray[400] : colors.textSecondary },
            ]}
          >
            Role: {user?.role.toUpperCase()}
          </Text>
        </View>
      </View>

      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? colors.gray[300] : colors.gray[700] },
            ]}
          >
            {section.title}
          </Text>

          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={[
                styles.settingItem,
                {
                  borderBottomColor: isDark ? colors.gray[800] : colors.border,
                },
              ]}
              onPress={item.onPress}
            >
              <View style={styles.settingItemLeft}>
                {item.icon}
                <Text
                  style={[
                    styles.settingItemLabel,
                    { color: isDark ? colors.current.text : colors.text },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              <ChevronRight
                size={20}
                color={isDark ? colors.gray[500] : colors.gray[400]}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={[styles.settingItem, styles.logoutButton]}
        onPress={handleLogout}
        testID="logout-button"
      >
        <View style={styles.settingItemLeft}>
          <LogOut size={20} color={colors.error} />
          <Text
            style={[
              styles.settingItemLabel,
              styles.logoutText,
              { color: colors.error },
            ]}
          >
            Log Out
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text
          style={[
            styles.versionText,
            { color: isDark ? colors.gray[500] : colors.gray[400] },
          ]}
        >
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#9929EA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  userInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  userDetails: {
    flex: 1,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 24,
  },
  logoutText: {
    fontWeight: "500",
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  versionText: {
    fontSize: 14,
  },
});

export default App;
