import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/Chat";
import LogIn from "./screens/Login";
import SignUp from "./screens/SignUp";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LogIn}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}
