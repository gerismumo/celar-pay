import { Link } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primary, Colors.primaryDark]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.jpeg")}
                style={styles.logo}
              />
              <View style={styles.logoGlow} />
            </View>
            <Text style={styles.title}>Celar Pay</Text>
            <Text style={styles.tagline}>Empowering Your Finances</Text>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.subtitle}>
              Fast, secure, and simple payments for developers & PSPs.
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
                <LinearGradient
                  colors={[Colors.secondary, Colors.secondaryDark]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                  <ArrowRight size={20} color={Colors.accent} />
                </LinearGradient>
              </TouchableOpacity>
            </Link>

            <Text style={styles.footerText}>
              Join thousands of developers and PSPs worldwide
            </Text>
          </View>
        </View>
        <View style={styles.decoration1} />
        <View style={styles.decoration2} />
        <View style={styles.decoration3} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    position: "relative",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.textLight,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoGlow: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 70,
    backgroundColor: Colors.textLight,
    opacity: 0.1,
    zIndex: -1,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: Colors.textLight,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: Colors.purple[100],
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 20,
    color: Colors.textLight,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 28,
    fontWeight: "400",
    opacity: 0.9,
  },
  ctaButton: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
    letterSpacing: 0.5,
  },
  footerText: {
    fontSize: 14,
    color: Colors.purple[100],
    textAlign: "center",
    opacity: 0.7,
  },
  decoration1: {
    position: "absolute",
    top: 100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    zIndex: 0,
  },
  decoration2: {
    position: "absolute",
    bottom: 200,
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(252, 199, 55, 0.1)",
    zIndex: 0,
  },
  decoration3: {
    position: "absolute",
    top: height * 0.3,
    left: width * 0.8,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    zIndex: 0,
  },
});
