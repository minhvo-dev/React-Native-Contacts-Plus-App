import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

/**
 * Select image from phone's library
 * @returns undefined if permission is not granted, otherwise a result object
 */
const pickImageAsync = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    return undefined;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1
  });

  return result;
};

const resizeImageAsync = async (uri) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 160, height: 160 } }],
    {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true
    }
  );
  return result;
};

const deleteImageAsync = async (uri) => {
  await FileSystem.deleteAsync(uri);
  if ((await FileSystem.getInfoAsync(uri)).exists) {
    console.log("delete failed", uri);
  }
};

export const getBase64ImageUriFromPhotoLibraryAsync = async () => {
  const pickerResult = await pickImageAsync();
  if (pickImageAsync === undefined) {
    return undefined;
  }
  if (pickerResult.cancelled) {
    return null;
  }
  const resizeResult = await resizeImageAsync(pickerResult.uri);
  const base64 = `data:image/jpeg;base64,${resizeResult.base64}`;
  await deleteImageAsync(pickerResult.uri);
  await deleteImageAsync(resizeResult.uri);
  return base64;
};