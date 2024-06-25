import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "./Styles";
import CustomImage from "../../Components/CustomImage";
import Assets from "../../Assets";
import { assets } from "../../../react-native.config";
import fonts from "../../../assets/fonts";
import CustomRow from "Components/CustomRow";
import Theme from "Configs/Theme";
import { useNavigation } from "@react-navigation/native";
import Routes from "RootNavigation/Routes";
import Swiper from "react-native-swiper";
import { useEffect, useState } from "react";
import CustomIcon from "Components/CustomIcon";
import CustomText from "Components/CustomText";
import { PERMISSIONS, RESULTS } from "react-native-permissions";

export default function () {
  const Navigation = useNavigation();
  const [value, setValue] = useState(0);
  const [images, setImages] = useState([
    Assets.haircutimg,
    Assets.haircutsecond,
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CustomImageSwiper = ({ images, currentIndex }) => {
    const handleIndexChanged = (index) => {
      setCurrentIndex(index);
    };

    useEffect(() => {
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor(Theme.PrimaryColor);
      StatusBar.setBarStyle("default");
    }, []);

    return (
      <Swiper
        index={currentIndex}
        scrollEnabled={false}
        onIndexChanged={handleIndexChanged}
        style={Styles.wrapper}
        showsButtons={false}
        paginationStyle={Styles.pagination}
        activeDotStyle={Styles.activeDot}
      >
        {images.map((image, index) => (
          <View key={index} style={Styles.slide}>
            <CustomImage src={image} style={Styles.image} />
          </View>
        ))}
      </Swiper>
    );
  };

  const handleNextImage = () => {
    if (value === 0) {
      setValue(1); // Switch to another content
    } else {
      const checkLocationPermission = async () => {
        try {
          const permission = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
          console.log("android hai");

          const result = await check(permission);
          console.log("result", result);
          console.log("RESULTS", RESULTS);

          if (
            result === RESULTS.DENIED ||
            result === RESULTS.UNAVAILABLE ||
            result === RESULTS.BLOCKED
          ) {
            const requestResult = await request(permission);
            return requestResult === RESULTS.GRANTED;
          }

          return result === RESULTS.GRANTED;
        } catch (error) {
          console.error("Error checking location permission:", error);
          return false;
        }
      };

      // const handleNavigation = async () => {
      //   try {
      //     if (state?.userInfo !== null) {
      //       const hasLocationPermission = await checkLocationPermission();

      //       if (hasLocationPermission) {
      //         Navigation.replace(Routes.FindLocation);
      //       } else {
      //         Navigation.replace(Routes.MainTabStack);
      //       }
      //     } else {
      //       Navigation.replace(Routes.WelcomeScreen);
      //     }
      //   } catch (error) {
      //     console.error("Error handling navigation:", error);
      //     Navigation.replace(Routes.WelcomeScreen);
      //   }
      // };

      Navigation.navigate(Routes.AuthStack); // Navigate to another screen
    }
  };
  return (
    <SafeAreaView style={Styles.root}>
      <View style={Styles.imgContainer}>
        <CustomImage
          src={Assets.welcomewhite}
          size={120}
          resizeMode={"center"}
        />
      </View>

      <CustomImageSwiper
        onIndexChanged={() => {
          setValue(1);
        }}
        images={images}
        currentIndex={value}
      />

      <View style={Styles.bottomContainer}>
        {value == 0 ? (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: 3,
                width: 54,
                backgroundColor: Theme.PrimaryColor,
                marginBottom: 40,
                marginTop: 20,
                borderTopLeftRadius: 23,
                borderBottomLeftRadius: 23,
              }}
            />
            <View
              style={{
                height: 3,
                width: 54,
                backgroundColor: "#1D1D1D33",
                marginBottom: 40,
                marginTop: 20,
                borderTopRightRadius: 23,
                borderBottomRightRadius: 23,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: 3,
                width: 54,
                backgroundColor: Theme.PrimaryColor,
                marginBottom: 40,
                marginTop: 20,
                borderTopLeftRadius: 23,
                borderBottomLeftRadius: 23,
              }}
            />
            <View
              style={{
                height: 3,
                width: 54,
                backgroundColor: Theme.PrimaryColor,
                marginBottom: 40,
                marginTop: 20,
                borderTopRightRadius: 23,
                borderBottomRightRadius: 23,
              }}
            />
          </View>
        )}

        {value == 0 ? (
          <CustomRow
            v_center
            style={{
              justifyContent: "space-between",
              width: "100%",
              padding: 5,
            }}
          >
            <View
              style={{
                // alignItems: 'center',
                // justifyContent: 'center'
                padding: 10,
              }}
            >
              <Text style={Styles.wlcmtxt}>Welcome to</Text>
              <View>
                <Text style={Styles.logotxt}>Experts4U</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleNextImage();
              }}
              style={{
                backgroundColor: Theme.PrimaryColor,

                borderRadius: 60,

                marginRight: -60,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <CustomIcon
                name={"right"}
                type={"AN"}
                size={20}
                color={"white"}
              />
            </TouchableOpacity>
          </CustomRow>
        ) : (
          <CustomRow
            v_center
            style={{
              justifyContent: "space-between",
              width: "100%",
              padding: 5,
            }}
          >
            <View
              style={{
                // alignItems: 'center',
                // justifyContent: 'center'
                padding: 10,
              }}
            >
              <Text style={Styles.wlcmtxt}>Welcome to</Text>
              <View>
                <Text style={Styles.logotxt}>Experts4U</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleNextImage();
              }}
              style={{
                backgroundColor: Theme.PrimaryColor,

                borderRadius: 60,

                marginRight: -40,
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomText value={"Get Started"} color={"white"} size={14} />
            </TouchableOpacity>
          </CustomRow>
        )}
      </View>
    </SafeAreaView>
  );
}
