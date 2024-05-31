import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BottomTab from 'Components/BottomTab';
import Routes from 'RootNavigation/Routes';
import * as Screens from 'Screens';

const MainTab = createMaterialTopTabNavigator();
export default function () {
  return (
    <MainTab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBarPosition="bottom"
      backBehavior="history"
      tabBar={BottomTab}>
      <MainTab.Screen name={Routes.HomeScreen} component={Screens.HomeScreen} />
      <MainTab.Screen name={Routes.MyBooking} component={Screens.MyBooking} />
      <MainTab.Screen name={Routes.MyBenifits} component={Screens.MyBenifits} />
      <MainTab.Screen name={Routes.Wallet} component={Screens.Wallet} />
      <MainTab.Screen
        name={Routes.AccountScreen}
        component={Screens.AccountScreen}
      />
    </MainTab.Navigator>
  );
}
