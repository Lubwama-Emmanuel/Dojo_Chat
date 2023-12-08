import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../Context";

export type RootStackParamList = {
  Profile: undefined;
};

export default function Chat() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { setToken } = useContext(AuthContext);

  const userId = auth?.currentUser?.email ?? "test1@gmail.com";
  const name = auth?.currentUser?.displayName ?? "test";
  const avatorUrl =
    auth?.currentUser?.photoURL ??
    "https://ui-avatars.com/api/?name=Emmanuel+Lubwama";

  console.log(avatorUrl);

  function signOutUser() {
    AsyncStorage.removeItem("token");
    setToken("");
  }

  function openProfile() {
    navigation.navigate("Profile");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            margin: 10,
          }}
          onPress={openProfile}
        >
          {/* <AntDesign name="logout" size={20} /> */}
          <Image
            source={{ uri: avatorUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10000,
            }}
          />
        </TouchableOpacity>
      ),
    });
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    // Adding chat or message to firestore
    addDoc(collection(db, "chats"), { _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userId,
        name: name,
        avatar: avatorUrl,
      }}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      renderAvatarOnTop={true}
    />
  );
}
