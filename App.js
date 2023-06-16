import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { auth } = useAuth();
  return (
    <AuthProvider independent={true}>
      <NavigationContainer independent={true}>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}