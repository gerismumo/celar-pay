import { Link } from "expo-router";
import {  Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text style={{color:"#ffffff"}}>Home</Text>
      <Link href="/(auth)/login"><Text style={{color:"#ffffff"}}>Get Started</Text></Link> 
    </View>
  );
}
