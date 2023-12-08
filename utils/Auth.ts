import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredentials.user;

  // Generate avatar color
  const color = getRandomColor();

  console.log("color", color);

  // Update user profile
  await updateProfile(user, {
    displayName: name,
    photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=${color}&color=fff`,
  });

  // Save user data along with the avatar color in firestore
  await addDoc(collection(db, "users"), {
    uuid: user.uid,
    email: user.email,
    avatarColor: color,
    avatatURL: user.photoURL,
  });

  const token = await user.getIdToken();
  console.log(user);
  return token;
};

export const signIn = async (email: string, password: string) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log(userCredentials.user.photoURL);
  const token = await userCredentials.user.getIdToken();
  return token;
};
