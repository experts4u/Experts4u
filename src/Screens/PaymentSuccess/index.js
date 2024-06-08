import Assets from "Assets";
import CustomImage from "Components/CustomImage";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import FastImage from "react-native-fast-image";
import Routes from "RootNavigation/Routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "ReduxState/Slices/UserSlice";

export default function () {
  const { params } = useRoute();
  const Navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      const timeout = setTimeout(() => {
        dispatch(clearCart());
        Navigation.navigate(Routes.MyBooking);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isFocused, Navigation]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <FastImage
        resizeMode="contain"
        style={{
          width: "100%",
          flex: 1,

          alignItems: "center",
          justifyContent: "center",
        }}
        source={Assets.couponapply}
      >
        <View
          style={{
            marginTop: 100,
          }}
        >
          <FastImage
            resizeMode="contain"
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
              marginBottom: 30,
            }}
            source={Assets.paymentSucces}
          />
        </View>

        <CustomText
          margin_h={20}
          color={Theme.PrimaryColor}
          align={"center"}
          bold
          size={27}
          value={"Booking Successfully Submitted!"}
        />
        <CustomText
          color={Theme.PrimaryColor}
          medium
          value={"Order Id: " + params?.orderId}
          margin_v={20}
        />
        <CustomText
          size={20}
          align={"center"}
          margin_v={20}
          color={Theme.Black}
          value={
            "Thank you for your booking! Our representative will contact you shortly."
          }
        />
      </FastImage>
    </View>
  );
}
