import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Styles from "./Styles";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../RootNavigation/Routes";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";

export default function () {
  const Navigation = useNavigation();
  const state = useSelector((v) => v.user);
  useEffect(() => {
    setTimeout(() => {
      if (state?.userInfo !== null) {
        Navigation.replace(Routes.FindLocation);
      } else {
        Navigation.replace(Routes.WelcomeScreen);
      }
    }, 1800);
  }, []);

  useEffect(() => {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("default");
  }, []);
  return (
    <SafeAreaView style={Styles.root}>
      <View style={Styles.container}>
        <FastImage
          source={require("../../Assets/transparentf.gif")}
          style={Styles.img}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
