import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "./screens/Chat";
import LogIn from "./screens/Login";
import SignUp from "./screens/SignUp";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LogIn"
        component={LogIn}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: () => null,
        }}
        name="Chat"
        component={Chat}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  // useSelector((state) => console.log(state));
  const token = "";
  return (
    <NavigationContainer>
      {token ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return <RootNavigator />;
}
