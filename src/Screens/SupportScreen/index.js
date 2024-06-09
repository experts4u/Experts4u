import ComingSoon from "Components/ComingSoon";
import CustomHeader from "Components/CustomHeader";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import { View } from "react-native";

export default () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CustomHeader l_type={"back_arrow"} title={"Support"} />
      <ComingSoon />
    </View>
  );
};
