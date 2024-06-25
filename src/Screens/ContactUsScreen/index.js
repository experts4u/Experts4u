import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import CustomHeader from "Components/CustomHeader";
import Assets from "Assets";
import CustomText from "Components/CustomText";
import CustomCard from "Components/CustomCard";
import CustomRow from "Components/CustomRow";
import CustomIcon from "Components/CustomIcon";
import Theme from "Configs/Theme";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";
import Fonts from "Configs/Fonts";
import { useNavigation } from "@react-navigation/native";
import Routes from "RootNavigation/Routes";

export default function () {
  const Navigation = useNavigation();
  const mailtoUrl = `mailto:${"info@experts4u.in"}`;

  const MakeCall = (number) => {
    RNImmediatePhoneCall.immediatePhoneCall(number);
  };
  // Open the default email client with the mailto URL

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <CustomRow
        style={{
          paddingHorizontal: 10,
          backgroundColor: "white",
          paddingVertical: 10,
        }}
        v_center
      >
        <TouchableOpacity
          onPress={() => {
            Navigation.goBack();
          }}
        >
          <CustomIcon
            type={"AN"}
            size={25}
            color={Theme.PrimaryColor}
            name={"arrowleft"}
          />
        </TouchableOpacity>
        <CustomText
          value={"Support"}
          style={{
            fontSize: 16,
            color: Theme.Black,
            fontFamily: Fonts.PoppinsMedium,
            textAlign: "left",
            marginLeft: 10,
          }}
        />
      </CustomRow>
      <ScrollView>
        <Image
          source={Assets.supportt}
          style={{
            width: "100%",

            height: 200,
          }}
          resizeMode="contain"
        />
        <CustomText
          size={20}
          align={"center"}
          style={{
            fontWeight: "600",
          }}
          value={"We are here to help you so please get into touch with us"}
        />

        <CustomCard
          style={{
            paddingBottom: 10,
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(mailtoUrl);
            }}
          >
            <CustomRow
              style={{
                marginHorizontal: 10,
              }}
              v_center
            >
              <CustomIcon
                name={"email"}
                type={"FT"}
                color={Theme.PrimaryColor}
              />
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <CustomText
                  value={"Email"}
                  style={{
                    fontWeight: "600",
                  }}
                />
                <CustomText
                  value={"info@experts4u.in"}
                  style={{
                    fontWeight: "500",
                  }}
                />
              </View>
            </CustomRow>
          </TouchableOpacity>
        </CustomCard>
        <CustomCard
          style={{
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              MakeCall("+919711751777");
            }}
          >
            <CustomRow
              style={{
                marginHorizontal: 10,
              }}
              v_center
            >
              <CustomIcon
                name={"call"}
                type={"ION"}
                color={Theme.PrimaryColor}
              />
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <CustomText
                  value={"Phone"}
                  style={{
                    fontWeight: "600",
                  }}
                />
                <CustomText
                  value={"+91 9711751777"}
                  style={{
                    fontWeight: "500",
                  }}
                />
              </View>
            </CustomRow>
          </TouchableOpacity>
        </CustomCard>
        <CustomCard
          style={{
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              let messageContent = "Hi I would like to know...";
              const encodedMessage = encodeURIComponent(messageContent);
              Linking.openURL(
                `whatsapp://send?phone=${+919711751777}&text=${encodedMessage}`
              );
            }}
          >
            <CustomRow
              style={{
                marginHorizontal: 10,
              }}
              v_center
            >
              <CustomIcon
                name={"whatsapp"}
                type={"FA"}
                color={Theme.PrimaryColor}
              />
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <CustomText
                  value={"Whatsapp"}
                  style={{
                    fontWeight: "600",
                  }}
                />
                <CustomText
                  value={"+91 9711751777"}
                  style={{
                    fontWeight: "500",
                  }}
                />
              </View>
            </CustomRow>
          </TouchableOpacity>
        </CustomCard>
      </ScrollView>
    </SafeAreaView>
  );
}
