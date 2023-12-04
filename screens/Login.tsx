import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LogIn() {
  function LogInWithGoogle() {
    console.log("Sign In With Google");
  }
  return (
    <View style={styles.container}>
      <Image source={require("../assets/bg.png")} style={styles.image} />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>LogIn</Text>
        <Input
          inputConfig={{
            placeholder: "Enter Email",
          }}
        />
        <Input
          inputConfig={{
            placeholder: "Enter Password",
          }}
        />
        <Button background onPress={() => LogInWithGoogle()}>
          Log In
        </Button>
        <Text>Or</Text>
        <Button onPress={() => LogInWithGoogle()}>Log In with Google</Button>
        <Button>Log In with Apple</Button>
        <Button>Log In with Facebook</Button>
        <Pressable >
          <Text>New Here ? Sign Up instead</Text>
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
    height: "75%",
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
    height: "30%",
    top: 0,
    resizeMode: "cover",
  },
});
