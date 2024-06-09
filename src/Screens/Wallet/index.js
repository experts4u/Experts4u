import Assets from "Assets";
import CustomHeader from "Components/CustomHeader";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import { Image, Text, View } from "react-native";

export default function () {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CustomHeader l_type={"back_arrow"} title={"Wallet"} />
      <View
        style={{
          marginHorizontal: 30,
          marginTop: "40%",
          alignSelf: "center",
        }}
      >
        <Image
          source={Assets.comingsoon}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
    </View>
  );
}
