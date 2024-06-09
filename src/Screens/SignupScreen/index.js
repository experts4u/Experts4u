import Assets from "Assets";
import CustomImage from "Components/CustomImage";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomRow from "Components/CustomRow";
import Fonts from "Configs/Fonts";
import { useNavigation } from "@react-navigation/native";
import Routes from "RootNavigation/Routes";
import CustomIcon from "Components/CustomIcon";
import CustomButton from "Components/CustomButton";

import useFetch from "Hooks/useFetch";
import Endpoints from "Configs/API/Endpoints";
import ToastMessage from "Utils/ToastMessage";
import { ValidateList, ValidationTypes } from "Utils/ValidationHelper";
import TextMessages from "Utils/TextMessages";
import Loader from "Components/CustomLoader";

export default function () {
  const Navigation = useNavigation();

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const dimension = useWindowDimensions();

  const width = dimension.width;
  const height = dimension.height;

  const { isLoading, response, fetchData, error } = useFetch({
    endpoint: Endpoints.login,

    body: {
      mobileNo: number,
    },
  });
  // console.log(number);

  const handleValidation = async () => {
    startLoading();
    let validate_arr = [
      [number, ValidationTypes.Mobile, TextMessages.MobileErr],
    ];
    let isValidated = await ValidateList(validate_arr);
    if (!isValidated) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    if (response) {
      handleResponse();
    }
  }, [response]);

  useEffect(() => {
    if (number.length == 10) {
      fetchData();
      Keyboard.dismiss();
      setLoading(true);
    }
  }, [number]);

  const handleResponse = () => {
    ToastMessage.Success(response?.message);
    Navigation.navigate(Routes.OtpScreen, { number });
  };

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.PrimaryColor,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        contentContainerStyle={{
          backgroundColor: Theme.PrimaryColor,
        }}
      >
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#4894f0",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              alignSelf: "center",
              // marginVertical: 30,
              borderRadius: 60,
              paddingHorizontal: 10,
              paddingVertical: 15,
              height: 100,
              marginTop: "4%",
            }}
          >
            <CustomIcon
              name={"mobile-phone"}
              type={"FA"}
              color={"white"}
              size={50}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <CustomText
              value={"Mobile Number"}
              color={"white"}
              bold
              size={20}
            />
          </View>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CustomText
              size={13}
              medium
              color={"white"}
              value={"We have to send OTP to authenticate your number"}
              margin_v={10}
              align={"center"}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            borderTopLeftRadius: 100,
            marginTop: 40,
          }}
        >
          <View
            style={{
              marginTop: 100,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <CustomRow
              style={{
                alignItems: "center",
                // justifyContent: 'center',

                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderBottomWidth: 2,
                borderColor: "grey",
              }}
            >
              <View>
                <CustomText color={"grey"} medium value={"+91 "} size={14} />
              </View>
              <View
                style={{
                  borderLeftColor: "grey",
                  borderLeftWidth: 1,
                  backgroundColor: "grey",
                  flex: 1,
                  marginVertical: 8,
                  marginHorizontal: 3,
                }}
              />
              <View>
                <TextInput
                  autoFocus={true}
                  value={number}
                  onChangeText={(e) => setNumber(e)}
                  maxLength={10}
                  placeholderTextColor={"grey"}
                  keyboardType="number-pad"
                  placeholder="Enter Your Mobile Number"
                  style={{
                    padding: 5,

                    fontSize: 14,
                    color: "grey",
                  }}
                />
              </View>
            </CustomRow>
          </View>

          <CustomButton
            onPress={() => {
              handleValidation();
            }}
            style={{
              marginTop: 100,
              paddingVertical: 15,
            }}
            title={
              isLoading ? <Loader color={"white"} size={15} /> : "Continue"
            }
            width={"80%"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
