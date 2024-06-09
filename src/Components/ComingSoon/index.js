import Assets from "Assets";
import { Image, View } from "react-native";

export default function () {
  return (
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
  );
}
