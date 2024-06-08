import { createStackNavigator } from "@react-navigation/stack";
import Routes from "./Routes";
import AuthStack from "./AuthStack";
import * as Screens from "Screens";

import SplashScreen from "../Screens/SplashScreen";
import MainTabStack from "./MainTabStack";
import {
  AboutUsScreen,
  AddAddressScreen,
  AddItemsScreen,
  BookingHelpScreen,
  BookingOrderDetailScreen,
  ChildCatogary,
  ContactUsScreen,
  CoupenAndOfferScreen,
  EditProfileScreen,
  FavouriteBookingScreen,
  MyAddressScreen,
  MyRatingScreen,
  PaymentScreen,
  PaymentSuccess,
  ReferEarnScreen,
  SearchScreen,
  ServiceDetailsScreen,
  SignupFormScreen,
  SlotsScreen,
  SummaryScreen,
  SupportScreen,
  Testing,
  VideoScreen,
  WriteReviewScreen,
} from "Screens";
import TestScreen from "Screens/TestScreen";

const MainStack = createStackNavigator();
export default function () {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <MainStack.Screen name={"TestScreen"} component={TestScreen} /> */}
      <MainStack.Screen name={Routes.SplashScreen} component={SplashScreen} />
      <MainStack.Screen
        name={Routes.FindLocation}
        component={Screens.FindLocation}
      />

      <MainStack.Screen
        name={Routes.WelcomeScreen}
        component={Screens.WelcomeScreen}
      />
      <MainStack.Screen name={Routes.AuthStack} component={AuthStack} />
      <MainStack.Screen name={Routes.MainTabStack} component={MainTabStack} />
      <MainStack.Screen name={Routes.SearchScreen} component={SearchScreen} />
      <MainStack.Screen name={Routes.ChildCatogary} component={ChildCatogary} />
      <MainStack.Screen
        name={Routes.ServiceDetailsScreen}
        component={ServiceDetailsScreen}
      />
      <MainStack.Screen name={Routes.VideoScreen} component={VideoScreen} />

      <MainStack.Screen
        name={Routes.AddItemsScreen}
        component={AddItemsScreen}
      />
      <MainStack.Screen
        name={Routes.WriteReviewScreen}
        component={WriteReviewScreen}
      />
      <MainStack.Screen name={Routes.SummaryScreen} component={SummaryScreen} />
      <MainStack.Screen
        name={Routes.CoupenAndOfferScreen}
        component={CoupenAndOfferScreen}
      />
      <MainStack.Screen
        name={Routes.EditProfileScreen}
        component={EditProfileScreen}
      />
      <MainStack.Screen name={Routes.PaymentScreen} component={PaymentScreen} />
      <MainStack.Screen
        name={Routes.PaymentSuccess}
        component={PaymentSuccess}
      />

      <MainStack.Screen
        name={Routes.BookingHelpScreen}
        component={BookingHelpScreen}
      />
      <MainStack.Screen
        name={Routes.ReferEarnScreen}
        component={ReferEarnScreen}
      />
      <MainStack.Screen name={Routes.AboutUsScreen} component={AboutUsScreen} />
      <MainStack.Screen name={Routes.SupportScreen} component={SupportScreen} />
      <MainStack.Screen
        name={Routes.MyRatingScreen}
        component={MyRatingScreen}
      />
      <MainStack.Screen
        name={Routes.ContactUsScreen}
        component={ContactUsScreen}
      />
      <MainStack.Screen
        name={Routes.MyAddressScreen}
        component={MyAddressScreen}
      />
      <MainStack.Screen
        name={Routes.BookingOrderDetailScreen}
        component={BookingOrderDetailScreen}
      />
      <MainStack.Screen
        name={Routes.FavouriteBookingScreen}
        component={FavouriteBookingScreen}
      />
      {/* <MainStack.Screen
        name={Routes.SignupScreen}
        component={Screens.SignupScreen}
      /> */}
    </MainStack.Navigator>
  );
}
