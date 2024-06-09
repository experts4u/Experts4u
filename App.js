import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { Navigation_ref } from "./src/Utils/NavigationHelper";
import RootNavigation from "./src/RootNavigation";
import FlashMessage from "react-native-flash-message";
import Fonts from "Configs/Fonts";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "ReduxState";

import { enableLatestRenderer } from "react-native-maps";

const App = () => {
  enableLatestRenderer();

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);
  // const requestLocationPermission = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Permission',
  //           message: 'This app needs access to your location.',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Location permission granted');

  //         GetLocation.getCurrentPosition({
  //           enableHighAccuracy: true,
  //           timeout: 60000,
  //         })
  //           .then(location => {
  //             setLongitude(location.longitude);
  //             setLatitude(location.latitude);
  //             Dispatch(
  //               saveCurrentLocation([location.longitude, location.latitude]),
  //             );
  //           })
  //           .catch(error => {
  //             const {code, message} = error;
  //             console.warn(code, message);
  //           });
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     } else {
  //       GetLocation.getCurrentPosition(
  //         position => {
  //           console.log(position, 'ff');
  //         },
  //         error => {
  //           console.log(error.code, error.message);
  //         },
  //         {enableHighAccuracy: true, timeout: 60000},
  //       );
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  // console.log(longitude, latitude);

  // const requestLocationPermission = async () => {
  //   try {
  //     // Check if location permission is granted
  //     const permissionResult = await check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (
  //       permissionResult === RESULTS.DENIED ||
  //       permissionResult === RESULTS.BLOCKED
  //     ) {
  //       console.log('Location permission denied');
  //       return;
  //     }

  //     // // Check if location services are enabled
  //     // const isLocationEnabled = await GetLocatio;
  //     // if (!isLocationEnabled) {
  //     //   console.log('Location services are disabled');
  //     //   // Prompt user to enable location services
  //     //   OpenSettings.openLocation();
  //     //   return;
  //     // }

  //     // Request permission if not granted
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'This app needs access to your location.',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Location permission granted');
  //       // Get the current position
  //       try {
  //         const location = await GetLocation.getCurrentPosition({
  //           enableHighAccuracy: true,
  //           timeout: 60000,
  //         });
  //         console.log('Location:', location);
  //       } catch (error) {
  //         console.warn('Error getting location:', error);

  //         if (error === 'Error: Location not available') {
  //           // Prompt user to open location settings

  //           console.log('Opening settings...');

  //           const settingsUrl = Platform.select({
  //             ios: 'app-settings:',
  //             android: 'location-services:',
  //           });

  //           console.log('Settings URL:', settingsUrl);

  //           const canOpenSettings = await Linking.canOpenURL(settingsUrl);
  //           console.log('Can open settings:', canOpenSettings);

  //           if (canOpenSettings) {
  //             Linking.openSettings(settingsUrl);
  //           } else {
  //             console.log('Cannot open settings on this device.');
  //           }
  //         }
  //       }
  //     } else {
  //       console.log('Location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn('Error:', err);
  //   }
  // };

  // async function handleCheckPressed() {
  //   if (Platform.OS === 'android') {
  //     const checkEnabled = await isLocationEnabled();
  //     console.log('checkEnabled', checkEnabled);
  //   }
  // }
  // useEffect(() => {
  //   if (focus) {
  //     handleCheckPressed();
  //   }
  // }, [focus]);

  return (
    <PersistGate persistor={persistor}>
      <NavigationContainer ref={Navigation_ref}>
        <RootNavigation />
        <FlashMessage
          position="top"
          titleStyle={{
            fontFamily: Fonts.PoppinsMedium,
          }}
        />
      </NavigationContainer>
    </PersistGate>
  );
};
export default App;
