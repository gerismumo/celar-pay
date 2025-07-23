import { Link } from "expo-router";
import {  Text, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View>
      <Text style={{color:"#ffffff"}}>Sign up</Text>
      <Link href="/login"><Text style={{color:"#ffffff"}}>Login</Text></Link> 
    </View>
  );
}
