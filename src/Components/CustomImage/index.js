import Assets from "Assets";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
  const [isLoading, setLoading] = useState(true);
  let styles = StyleSheet.flatten([
    borderWidth && { borderWidth: borderWidth, borderColor: "white" },
    borderColor && { borderColor },
    size && { width: size, height: size },
    round && { borderRadius: size ? size : style?.width ? style?.width : 100 },
    corner && { borderRadius: corner },
    center && { alignSelf: "center" },
    style,
  ]);

  function onLoadStart() {
    setLoading(true);
    // setErrorMessage(false);
  }

  function onLoadEnd() {
    setLoading(false);
  }
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        {
          overflow: "hidden",
        },
        styles,
      ]}
    >
      <FastImage
        // onLoadStart={onLoadStart}
        // onLoadEnd={onLoadEnd}
        source={src}
        resizeMode={resizeMode || "cover"}
        style={{ width: 100 + "%", height: 100 + "%" }}
      />
    </TouchableOpacity>
  );
}
