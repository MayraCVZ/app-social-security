import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../views/Account";

const Stack = createStackNavigator();

export default function AccountNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accountt"
        component={AccountScreen}
        /*options={{
          title: 'Home', //Set Header Title
          headerStyle: {
            backgroundColor: '#d8d8d8', //Set Header color
          },
          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          // headerLeft: () => <ActionBarImage />,
        }}*/
        options={{
          title: "",
          headerStyle: {
            //backgroundColor: '#fff',
            height: 0 //Set Header color
          }
        }}
      />
    </Stack.Navigator>
  );
}
