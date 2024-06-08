import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";

export default function ({
  src,
  style,
  round,
  corner,
  size,
  resizeMode,
  onPress,
  center,
  borderWidth,
  borderColor,
}) {
  let styles = StyleSheet.flatten([
    borderWidth && { borderWidth: borderWidth, borderColor: "white" },
    borderColor && { borderColor },
    size && { width: size, height: size },
    round && { borderRadius: size ? size : style?.width ? style?.width : 100 },
    corner && { borderRadius: corner },
    center && { alignSelf: "center" },
    style,
  ]);
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[{ overflow: "hidden" }, styles]}
    >
      <FastImage
        source={src}
        resizeMode={resizeMode || "cover"}
        style={{ width: 100 + "%", height: 100 + "%" }}
      />
    </TouchableOpacity>
  );
}
