import CustomHeader from "Components/CustomHeader";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import { Text, View } from "react-native";

export default function () {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CustomHeader l_type={"back_arrow"} title={"MY Benifits"} />
      <View
        style={{
          marginHorizontal: 30,
          marginTop: "50%",
          alignSelf: "center",
        }}
      >
        <CustomText
          color={Theme.PrimaryColor}
          size={44}
          bold
          value={"Coming Soon..."}
        />
      </View>
    </View>
  );
}
