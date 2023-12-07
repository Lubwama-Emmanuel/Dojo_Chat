import { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const userId = auth?.currentUser?.email ?? "test1@gmail.com";
  const name = auth?.currentUser?.displayName ?? "test";

  useLayoutEffect(() => {
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
        avatar: "https://placeimg.com/140/140/any",
      }}
    />
  );
}
