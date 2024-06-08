import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";

export default function ({ style, children, onPress }) {
  return (
    <TouchableOpacity
      style={[
        {
          // elevation: 4,
          backgroundColor: "white",
          overflow: "hidden",
          borderRadius: 10,
          shadowColor: "red",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          textAlign: "center",
          borderColor: "grey",
          borderWidth: 0.25,
        },
        style,
      ]}
      //   disabled={!onPress}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
