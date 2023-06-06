import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../views/HomeScreen";
import SeguimientoScreen from "../views/SeguimientoScreen";
import AgendaScreen from "../views/AgendaScreen";
import MateriaScreen from "../views/MateriaScreen";

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === "Reuniones") {
                iconName = focused ? "home-outline" : "home";
              } else if (route.name === "Seguimiento al expediente") {
                iconName = focused ? "newspaper-outline" : "newspaper";
              } else if (route.name === "Agenda digital") {
                iconName = focused ? "today-outline" : "today";
              } else if (route.name === "Log out") {
                iconName = focused ? "log-out-outline" : "log-out";
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#A9A9A9",
            
            tabBarStyle:{
              backgroundColor:'#0E55A7',
             // height:100,
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
        <Tab.Screen name="Seguimiento al expediente" component={SeguimientoScreen} />
        <Tab.Screen name="Agenda digital" component={AgendaScreen} />
        <Tab.Screen name="Log out" component={MateriaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
