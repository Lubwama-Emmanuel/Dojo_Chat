import { useState } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { logInUser } from "../utils/api";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { signIn } from "../utils/Auth";

export type RootStackParamList = {
  SignUp: undefined;
};

const initialValues = {
  email: "",
  password: "",
};

export default function LogIn(this: any) {
  const [inputValues, setInputValues] = useState(initialValues);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  async function authenicateUser() {
    try {
      signIn(inputValues.email, inputValues.password);
    } catch (error) {
      console.log("an error occured here", error);
      return;
    }
  }

  function SignUpInstead() {
    navigation.navigate("SignUp");
  }

  function handleInputValues(inputIdentifier: string, enteredValue: string) {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/bg.png")} style={styles.image} />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>LogIn</Text>
        <Input
          inputConfig={{
            placeholder: "Enter Email",
            onChangeText: handleInputValues.bind(this, "email"),
          }}
        />
        <Input
          inputConfig={{
            placeholder: "Enter Password",
            onChangeText: handleInputValues.bind(this, "password"),
          }}
        />
        <Button background onPress={authenicateUser}>
          Log In
        </Button>
        <Text>Or</Text>
        <Button>Log In with Google</Button>
        <Button>Log In with Apple</Button>
        <Button>Log In with Facebook</Button>
        <Pressable onPress={() => SignUpInstead()}>
          <Text style={styles.link}>New Here ? Sign Up instead</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: "center",
    color: "red",
    borderTopLeftRadius: 50,
    tranform: [{ translateY: 60 }],
    position: "absolute",
    bottom: 0,
    height: "85%",
    width: "100%",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 50,
    marginVertical: 10,
    textTransform: "uppercase",
    color: "#92400e",
    fontWeight: "700",
  },

  image: {
    width: "100%",
    position: "absolute",
    height: "20%",
    top: 0,
  },
  link: {
    color: "#92400e",
    fontSize: 18,
    marginVertical: 20,
  },
});
