import axios from "axios";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.apiKey;

export async function authenticate(mode, email, password) {
  console.log("email", email);
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    { email: email, password: password, returnSecureToken: true }
  );
  return res;
}

export async function createNewUser(email, password) {
  return authenticate("signUp", email, password);
}

export async function logInUser(email, password) {
  return authenticate("signInWithPassword", email, password);
}
