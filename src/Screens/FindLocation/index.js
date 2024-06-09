import React, { useState, useEffect } from "react";
import {
  PermissionsAndroid,
  View,
  Platform,
  Linking,
  Alert,
  Button,
  BackHandler,
  AppState,
} from "react-native";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import GetLocation from "react-native-get-location";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentLocation } from "ReduxState/Slices/UserSlice";
import CustomText from "Components/CustomText";
import Assets from "Assets";
import Routes from "RootNavigation/Routes";
import { useCallback } from "react";

export default function () {
  const [find, setFind] = useState(false);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [currentAddress, setCurrentAddress] = useState("");
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);
  const [isDataEnabled, setDataEnabled] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (isFocused) {
      requestLocationPermission();
    }
  }, [isFocused]);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      getAddressFromCoordinates();
    }
  }, [latitude, longitude]);
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // App resumed from the background
        // Reinitialize location service to fetch updated location
        requestLocationPermission();
      }
      setAppState(nextAppState);
    };

    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      // No need to remove the event listener
      // React will handle it automatically
    };
  }, [appState]);

  const requestLocationPermission = async () => {
    try {
      // Check if location permission is granted
      const permissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonPositive: "OK",
        }
      );

      if (
        permissionResult !== PermissionsAndroid.RESULTS.GRANTED &&
        permissionResult !== PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        console.log("Location permission denied");
        return;
      }

      if (permissionResult === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log("Location permission denied and cannot be requested again");
        return;
      }

      // Get the current position
      const location = await GetLocation.getCurrentPosition({
        timeout: 60000,
        showLocationDialog: true,
      });
      console.log("Location:", location);
      setLongitude(location.longitude);
      setLatitude(location.latitude);
      dispatch(saveCurrentLocation([location.longitude, location.latitude]));
    } catch (error) {
      console.warn("Error:", error);
      if (error == "Error: Location not available") {
        Alert.alert(
          "Navigate Confirmation",
          "For a better experience,turn on device location,which uses Google's location service.",
          [
            {
              text: "NO",
              onPress: () => BackHandler.exitApp(),
              style: "cancel",
            },
            {
              text: "Yes, Navigate Me",
              onPress: () =>
                Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS"),
            },
          ],
          { cancelable: false }
        );
      }

      // Log the error object to see its structure
      console.log("Error object:", error);

      // To open GPS Location setting
      // Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
      // Alert.prompt('Please open location ');

      // const settingsUrl = Platform.select({
      //   ios: 'app-settings:',
      //   android: 'location-services:',
      // });
      // const canOpenSettings = await Linking.canOpenURL(settingsUrl);
      // if (canOpenSettings) {
      //   Linking.openSettings(settingsUrl);
      // } else {
      //   console.log('Cannot open settings on this device.');
      // }

      // if (error) {
      //   ('Prompt user to open location settings');
      //   console.log('Opening settings...');
      //   const settingsUrl = Platform.select({
      //     // ios: 'app-settings:',
      //     android: 'location-services:',
      //   });
      //   console.log('Settings URL:', settingsUrl);
      //   const canOpenSettings = await Linking.canOpenURL(settingsUrl);
      //   console.log('Can open settings:', canOpenSettings);
      //   if (canOpenSettings) {
      //     Linking.openSettings(settingsUrl);
      //   } else {
      //     console.log('Cannot open settings on this device.');
      //   }
      // }
    }
  };

  let myApiKey = "AIzaSyCBRJgSZT50bFwgbOQHOWdi0giGUEdG3MY";

  const getAddressFromCoordinates = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const address = data.results[0].formatted_address;
          setFind(true);
          setCurrentAddress(address);
        } else {
          console.warn("Address not found");
        }
      })
      .catch((error) => {
        console.warn("Error getting address:", error);

        if (error == "TypeError: Network request failed") {
        }
      });
  };

  useEffect(() => {
    if (find) {
      requestLocationPermission();

      setTimeout(() => {
        if (userState?.userInfo == null) {
          navigation.replace(Routes.AuthStack);
        } else {
          navigation.replace(Routes.MainTabStack);
        }
      }, 2000);
      return clearTimeout();
    }
  }, [find]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FastImage
        source={find ? Assets.locationgif2 : Assets.locationgif1}
        style={{ height: find ? 170 : 170, width: 500 }}
        resizeMode="center"
      />

      {/* {!enabled && (
        <Button
          onPress={requestResolution}
          title="Request Resolution Location Settings"
        />
      )} */}
      <View
        style={{
          // backgroundColor: 'red',
          width: "50%",
        }}
      >
        <CustomText
          size={19}
          bold
          color={"black"}
          align={"center"}
          value={currentAddress ? currentAddress : "Fetching Your Location"}
        />
      </View>
    </View>
  );
}
