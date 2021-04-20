import { Linking } from "react-native";

export const openSMSAppAsync = async (number) => {
  const url = `sms:${number}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("SMS is not supported");
  }
};

export const openCallAppAsync = async (number) => {
  const url = `tel:${number}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("Call is not supported");
  }
};

export const openEmailAppAsync = async (email) => {
  const url = `mailto:${email}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("Email is not supported");
  }
};

export const openFacebookAppAsync = async (facebook) => {
  // const url = `https://www.facebook.com/${facebook}`;
  const url = `fb://facewebmodal/f?href=https://www.facebook.com/${facebook}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("Facebook is not supported");
  }
};

export const openTwitterAppAsync = async (twitter) => {
  const url = `twitter://user?screen_name=${twitter}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("Twitter is not supported");
  }
};

export const openInstagramAppAsync = async (instagram) => {
  const url = `instagram://user?username=${instagram}`;
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("Instagram is not supported");
  }
};

export const openWebBrowserAsync = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
  else {
    throw new Error("Web browser is not supported");
  }
};