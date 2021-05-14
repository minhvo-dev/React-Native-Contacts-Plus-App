import Constants from "expo-constants";

export const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  facebookAppId: Constants.manifest.extra.facebookAppId,
  googleApp: {
    androidClientId: Constants.manifest.extra.googleAppAndroidClientId,
    iOSClientId: Constants.manifest.extra.googleAppIOSClientId
  }
};