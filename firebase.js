import { initializeApp, getApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  //   authDomain: "dojochat-37057.appspot.com",
  projectId: "dojochat-37057",
  storageBucket: "dojochat-37057.appspot.com",
  //   messagingSenderId: "your_messaging_sender_id",
  appId: "1:922429953234:ios:5de34ccec82709f5a6890b",
  //   measurementId: "your_measurement_id", // optional
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth };
