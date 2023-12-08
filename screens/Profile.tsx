import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Context";
import { collection, getDocs, query, where } from "firebase/firestore";

export type RootStackParamList = {
  Profile: undefined;
};

export default function Profile() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { setToken } = useContext(AuthContext);
  const [userColor, setUserColor] = useState("");

  const currentUser = auth?.currentUser;

  const dp = currentUser?.photoURL ?? "";
  const uid = currentUser?.uid;

  function signOutUser() {
    AsyncStorage.removeItem("token");
    setToken("");
  }

  useEffect(() => {
    // Set navigation options
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            margin: 10,
          }}
          onPress={signOutUser}
        >
          <AntDesign name="logout" size={20} />
        </TouchableOpacity>
      ),
    });

    // fetch User data
    async function fetchUserData() {
      const q = query(collection(db, "users"), where("uuid", "==", uid));
      const querySnapshot = await getDocs(q);

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
        console.log("color", userColor);
        console.log(userData.avatarColor);
        setUserColor(userData.avatarColor);
      });
      console.log("results", userData);
    }

    if (uid) {
      fetchUserData();
    }
  }, [uid, navigation, userColor]);

  return (
    <View style={[styles.imageContainer, { backgroundColor: userColor }]}>
      <View>
        <Image source={{ uri: dp }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 1000,
  },
});
