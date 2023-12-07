import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const register = async (email: string, password: string) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredentials.user.getIdToken();
  return token;
};

export const signIn = async (email: string, password: string) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredentials.user.getIdToken();
  return token;
};
