// import Fonts from 'Configs/Fonts';
// import Theme from 'Configs/Theme';
import Theme from "Configs/Theme";
import React from "react";
import { StyleSheet, Text } from "react-native";
import fonts from "../../../assets/fonts";

let styles = StyleSheet.create({
  regular: {
    fontFamily: fonts.PoppinsRegular,
  },
  medium: {
    fontFamily: fonts.PoppinsMedium,
  },

  bold: {
    fontFamily: fonts.PoppinsBold,
  },

  thin: {
    fontFamily: fonts.PoppinsThin,
  },
  light: {
    fontFamily: fonts.PoppinsLight,
  },
});
export default function ({
  regular,
  medium,
  bold,
  thin,
  light,
  value,
  color,
  style,
  size,
  align,
  margin_h,
  margin_v,
  numberOfLines,
}) {
  let textStyles = StyleSheet.flatten([
    margin_h && { marginHorizontal: margin_h },
    margin_v && { marginVertical: margin_v },
    align && { textAlign: align },
    { color: Theme.Black },
    { lineHeight: 14 * 1.4 },
    regular && styles.regular,
    medium && styles.medium,
    bold && styles.bold,
    thin && styles.thin,
    light && styles.light,
    color && { color: color },
    size && { fontSize: size, lineHeight: size * 1.4 },
    style,
  ]);
  return (
    <Text numberOfLines={numberOfLines} style={[textStyles]}>
      {value ? value : ""}
    </Text>
  );
}
