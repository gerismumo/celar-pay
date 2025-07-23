import { Link } from "expo-router";
import {  Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Text style={{color:"#ffffff"}}>Login Page</Text>
      <Link href="/(tabs)"><Text style={{color:"#ffffff"}}>Dashboard</Text></Link> 
      <Link href="/signup"><Text style={{color:"#ffffff"}}>Sign up</Text></Link> 
    </View>
  );
}
