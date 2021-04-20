import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import { firebaseConfig } from "../../firebase.config";

// Initialize Firebase
const app = (!firebase.apps.length) ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const firestore = firebase.firestore(app);

export const auth = app.auth();

export const signInWithEmailAsync = (email, password) => auth.signInWithEmailAndPassword(email, password);

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