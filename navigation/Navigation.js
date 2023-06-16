import * as React from "react";
import { BackButton } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../views/HomeScreen";
import SeguimientoScreen from "../views/SeguimientoScreen";
import AgendaScreen from "../views/AgendaScreen";
import AgendaNewScreen from "../views/AgendaNewScreen";
import UserData from "../components/auth/UserData";
import AccountNavigation from "./AccountNavigation";
import useAuth from "../hooks/useAuth";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AgendaNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Agenda digital" component={AgendaNewScreen} />
      <Stack.Screen name="ActualizarCita" component={AgendaScreen}
        /*options={{
          headerLeft: () => (
            <BackButton
              icon={() => <Icon name="custom-back-arrow" size={24} />}
            />
          ),
        }}*/ />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Reuniones") {
            iconName = focused ? "reader-outline" : "reader";
          } else if (route.name === "Seguimiento al expediente") {
            iconName = focused ? "newspaper-outline" : "newspaper";
          } else if (route.name === "AgendaTab") {
            iconName = focused ? "today-outline" : "today";
          } else if (route.name === "PerfilTab") {
            iconName = focused ? "person-circle-outline" : "person-circle";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarStyle: {
          backgroundColor: '#0E55A7',
          //height: 55,
        }
      })}
    >
      <Tab.Screen name="Reuniones" component={HomeScreen}
        options={{
          title: 'Reuniones',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }} />
      <Tab.Screen name="AgendaTab" component={AgendaNavigator}
        options={{
          title: "Agenda digital",
          headerStyle: { height: 0 }
        }} />
      <Tab.Screen name="Seguimiento al expediente" component={SeguimientoScreen} />
      <Tab.Screen name="PerfilTab" component={UserData} options={{ title: "Mi perfil" }} />

    </Tab.Navigator>
  );
}
const Navigation = () => {
  const { auth } = useAuth();
  return auth ? <TabNavigation /> : <AccountNavigation />;
};
export default Navigation;