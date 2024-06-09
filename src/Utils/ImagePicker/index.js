import React from "react";
import ImageCropPicker from "react-native-image-crop-picker";
import { launchImageLibrary } from "react-native-image-picker";

export default function () {
  const imagePicker = ImageCropPicker;
  return new Promise((resolve, reject) => {
    imagePicker
      .openPicker({
        // includeBase64: true,
        compressImageQuality: 0.4,
        mediaType: "photo",
      })
      .then((resp) => {
        let obj = {
          uri: resp.path,
          type: resp.mime,
          name: resp.fileName || resp.path.split("/").pop(),
          // base64: `data:${resp.mime};base64,${resp.data}`,
        };
        resolve(obj);
      })
      .catch((e) => {
        reject(e);
      });
    return;
    launchImageLibrary({ quality: 0.5, includeBase64: true }, (resp) => {
      if (resp.didCancel) {
        reject(resp);
      } else {
        let obj = {
          uri: resp.uri,
          type: resp.type,
          name: resp.fileName || resp.uri.split("/").pop(),
          base64: `data:${resp.type};base64,${resp.base64}`,
        };
        resolve(obj);
      }
    });
  });
}
