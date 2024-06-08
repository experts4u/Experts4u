import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../../Screens/SplashScreen";
import WelcomeScreen from "../../Screens/WelcomeScreen";
import Routes from "RootNavigation/Routes";
import * as Screens from "Screens";

const Stack = createStackNavigator();
export default function () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Routes.SignupScreen}
        component={Screens.SignupScreen}
      />
      <Stack.Screen name={Routes.OtpScreen} component={Screens.OtpScreen} />
      <Stack.Screen
        name={Routes.SignupFormScreen}
        component={Screens.SignupFormScreen}
      />
    </Stack.Navigator>
  );
}
