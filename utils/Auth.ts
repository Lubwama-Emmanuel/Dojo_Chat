import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const register = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Here is what we have", userCredential);
    })
    .catch((error) => {
      console.log("an error here", error.message);
    });
};

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Here is what we have", userCredential);
    })
    .catch((error) => {
      console.log("an error here", error.message);
    });
};
