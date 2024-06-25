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
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

export default function () {
  const Navigation = useNavigation();
  const state = useSelector((v) => v.user);
  // useEffect(() => {

  //   setTimeout(() => {

  //     if (state?.userInfo !== null) {

  //       Navigation.replace(Routes.FindLocation);
  //     } else {
  //       Navigation.replace(Routes.WelcomeScreen);
  //     }
  //   }, 1800);
  // }, []);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permission = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
        console.log("android hai");

        const result = await check(permission);
        console.log("result", result);
        console.log("RESULTS", RESULTS);

        if (
          result === RESULTS.DENIED ||
          result === RESULTS.UNAVAILABLE ||
          result === RESULTS.BLOCKED
        ) {
          const requestResult = await request(permission);
          return requestResult === RESULTS.GRANTED;
        }

        return result === RESULTS.GRANTED;
      } catch (error) {
        console.error("Error checking location permission:", error);
        return false;
      }
    };

    const handleNavigation = async () => {
      try {
        if (state?.userInfo !== null) {
          const hasLocationPermission = await checkLocationPermission();

          if (hasLocationPermission) {
            Navigation.replace(Routes.FindLocation);
          } else {
            Navigation.replace(Routes.MainTabStack);
          }
        } else {
          Navigation.replace(Routes.WelcomeScreen);
        }
      } catch (error) {
        console.error("Error handling navigation:", error);
        Navigation.replace(Routes.WelcomeScreen);
      }
    };

    const timerId = setTimeout(handleNavigation, 1800);

    return () => clearTimeout(timerId);
  }, [state]);

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
