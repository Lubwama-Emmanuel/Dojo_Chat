import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { createNewUser } from "../utils/api";

import Button from "../ui/Button";
import Input from "../ui/Input";
import { register } from "../utils/Auth";

export type RootStackParamList = {
  LogIn: undefined;
};

const initialValues = {
  email: "",
  password: "",
};

export default function SignUp(this: any) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [inputValues, setInputValues] = useState(initialValues);

  function LogInInstead() {
    navigation.navigate("LogIn");
  }

  async function createUser() {
    try {
      // await createNewUser(inputValues.email, inputValues.password);
      register(inputValues.email, inputValues.password);
    } catch (error) {
      console.log("an error occured here");
      return;
    }
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
        <Text style={styles.heading}>Sign Up</Text>
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
        <Button background onPress={createUser}>
          Sign Up
        </Button>
        <Text>Or</Text>
        <Button>Log In with Google</Button>
        <Button>Log In with Apple</Button>
        <Button>Log In with Facebook</Button>
        <Pressable onPress={() => LogInInstead()}>
          <Text style={styles.link}>Have an Account? Log In Instead</Text>
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
    resizeMode: "cover",
  },
  link: {
    color: "#92400e",
    fontSize: 18,
    marginVertical: 20,
  },
});
