import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  background: boolean;
  onPress: (event: GestureResponderEvent) => void;
}
export default function Button({ children, background, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.pressed, styles.btnPressed]
          : [styles.pressed, , background && { backgroundColor: "#f59e0b" }]
      }
    >
      <View style={[styles.container]}>
        <Text style={[styles.text, !background && styles.textColored]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

Button.defaultProps = {
  background: false,
  onPress: () => {},
};

const styles = StyleSheet.create({
  pressed: {
    borderRadius: 50,
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderWidth: 1,
    margin: 5,
    width: "80%",
    borderColor: "#f59e0b",
  },
  container: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#92400e",
  },
  textColored: {},
  btnPressed: {
    backgroundColor: "#f59e0b",
  },
});
