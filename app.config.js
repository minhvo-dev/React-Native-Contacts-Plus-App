import "dotenv/config";

export default {
  "name": "Contacts+",
  "slug": "ContactsPlus",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/app_icon.png",
  "splash": {
    "image": "./assets/contact_plus.png",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": false,
    "bundleIdentifier": "com.minhvodev.contactsplus",
    "buildNumber": "1.0.0",
    "config": {
      "googleSignIn": {
        "reservedClientId":"com.googleusercontent.apps.540054523482-ifgbmtq1u7se3hcupk0go3fmqc6qjlrv"
      }
    }
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/app_icon.png",
      "backgroundColor": "#FFFFFF"
    },
    "package": "com.minhvodev.contactsplus",
    "versionCode": 1
  },
  "web": {
    "favicon": "./assets/app_icon.png"
  },
  "extra": {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    userInfoDocument: process.env.USER_INFO_DOCUMENT,
    facebookAppId: process.env.FACEBOOK_APP_ID,
    googleAppIOSClientId: process.env.GOOGLE_APP_IOS_CLIENT_ID,
    googleAppAndroidClientId: process.env.GOOGLE_APP_ANDROID_CLIENT_ID
  }
}