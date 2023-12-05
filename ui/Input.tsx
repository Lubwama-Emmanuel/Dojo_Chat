import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
  inputConfig: {
    placeholder: string;
    onChangeText: (enteredValue: string) => void;
  };
}

export default function Input({ inputConfig }: InputProps) {
  return (
    <View>
      <TextInput {...inputConfig} style={styles.inputContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 15,
    borderRadius: 50,
    width: 350,
    marginVertical: 10,
    borderColor: "#f59e0b",
  },
});
