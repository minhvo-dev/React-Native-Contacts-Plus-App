import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import * as Google from "expo-google-app-auth";

import { firebaseConfig } from "../../firebase.config";

// Initialize Firebase
const app = (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const firestore = firebase.firestore(app);

export const auth = app.auth();

export const signInWithEmailAsync = (email, password) => auth.signInWithEmailAndPassword(email, password);

export const signInWithGoogle = async () => {
  const result = await Google.logInAsync({
    androidClientId: firebaseConfig.googleApp.androidClientId,
    iosClientId: firebaseConfig.googleApp.iOSClientId
  });

  if (result.type === "success") {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
    await auth.signInWithCredential(credential);
  }
};

export const signOutAsync = () => auth.signOut();

export const signUpWithEmailAsync = async (email, password, name) => {
  await auth.createUserWithEmailAndPassword(email, password);
  await updateUserDisplayName(name);
};

export const updateUserDisplayName = name =>
  auth
    .currentUser
    .updateProfile({
      displayName: name
    });