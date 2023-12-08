import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Chat from "./screens/Chat";
import LogIn from "./screens/Login";
import SignUp from "./screens/SignUp";
import { AuthContext } from "./Context";
import Profile from "./screens/Profile";

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
      <Stack.Screen options={{}} name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
      }

      setIsLoading(false);
    }
    fetchToken();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <NavigationContainer>
        {token ? <ChatStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default function App() {
  return <RootNavigator />;
}
