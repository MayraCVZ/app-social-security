import React from "react";
import { View, Text } from "react-native";
import LoginForm from "../components/auth/LoginForm";
import UserData from "../components/auth/UserData";
import HomeScreen from "../views/HomeScreen";
import useAuth from "../hooks/useAuth";

export default function Account({ navigation }) {
  const { auth } = useAuth();
  return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}