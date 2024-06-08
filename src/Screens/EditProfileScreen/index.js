import CheckBox from "@react-native-community/checkbox";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Assets from "Assets";
import CustomButton from "Components/CustomButton";
import CustomIcon from "Components/CustomIcon";
import CustomImage from "Components/CustomImage";
import CustomInput from "Components/CustomInput";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import Endpoints from "Configs/API/Endpoints";
import Fonts from "Configs/Fonts";
import Theme from "Configs/Theme";
import useFetch from "Hooks/useFetch";
import Routes from "RootNavigation/Routes";
import ImagePicker from "Utils/ImagePicker";
import TextMessages from "Utils/TextMessages";
import ToastMessage from "Utils/ToastMessage";
import { ValidateList, ValidationTypes } from "Utils/ValidationHelper";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function () {
  const user_info = useSelector((v) => v.user.userInfo);
  const focused = useIsFocused();
  const [userData, setUserData] = useState();

  const [gender, setGender] = useState(userData?.gender == "male" ? 1 : 0);
  const [name, setName] = useState(userData?.name);
  const [profileImage, setProfileImage] = useState();
  const Navigation = useNavigation();

  useEffect(() => {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor(Theme.PrimaryColor);
    StatusBar.setBarStyle("default");
  }, []);

  const PickImage = async (setImage) => {
    try {
      let image = await ImagePicker();
      setImage?.(image);
    } catch (e) {
      console.log("e", e);
    }
  };
  const User_data = useFetch({
    endpoint: Endpoints.getUserDetails + user_info?.user?._id,
  });

  const { response, fetchPromise } = useFetch({
    endpoint: Endpoints.EditProfile + user_info?.user?._id,
    formData: true,
    method: "put",
  });

  const handleValidation = async () => {
    let validate_arr = [
      [name, ValidationTypes.Empty, TextMessages.FullNameErr],
    ];

    let validated = await ValidateList(validate_arr);

    if (!validated) {
      return;
    }
    let formData = new FormData();
    formData.append("name", name),
      formData.append("gender", gender == 0 ? "male" : "female"),
      formData.append("photo", profileImage);

    try {
      let response = await fetchPromise(formData);
      if (response) {
        ToastMessage.Success("Profile updates Successfully");
        Navigation.goBack();
      }
    } catch (e) {
      console.log("my_new_error", e);
    }
  };
  const getDetails = async () => {
    try {
      let details = await User_data.fetchPromise();
      setUserData(details.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    if (focused) {
      getDetails();
    }
  }, [focused]);

  useEffect(() => {
    if (userData) {
      setName(userData?.name);
    }
  }, [userData]);

  console.log("userData", userData?.name);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        backgroundColor: Theme.PrimaryColor,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginTop: 20,
            marginLeft: 30,
            marginHorizontal: 10,
          }}
        >
          <CustomText
            size={22}
            color={"white"}
            value={"Great!!\nLet’s  Edit  Your Profile"}
            bold
            align={"left"}
          />
        </View>

        <View
          style={{
            backgroundColor: "white",

            flex: 1,
            marginTop: "10%",
            borderTopLeftRadius: 100,

            paddingBottom: 130,
          }}
        >
          <View
            style={{
              marginTop: 70,
              width: "80%",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                PickImage(setProfileImage);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <CustomImage
                round
                src={
                  profileImage
                    ? {
                        uri: profileImage?.uri
                          ? profileImage?.uri
                          : profileImage,
                      }
                    : Assets.placeholderimage
                }
                size={100}
              />
            </TouchableOpacity>
            <CustomRow
              ratios={[0, 0, 1]}
              style={{
                alignItems: "center",

                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderBottomWidth: 2,
                borderColor: "grey",
              }}
            >
              <View>
                <CustomIcon
                  name={"person"}
                  color={"grey"}
                  size={15}
                  type={"ION"}
                />
              </View>
              <View
                style={{
                  borderLeftColor: "grey",
                  borderLeftWidth: 1,
                  backgroundColor: "grey",
                  flex: 1,
                  marginVertical: 8,
                  marginHorizontal: 6,
                }}
              />
              <TextInput
                value={name}
                onChangeText={(e) => {
                  setName(e);
                }}
                placeholderTextColor={"grey"}
                placeholder={"Full Name"}
                style={{
                  paddingVertical: 5,
                  fontSize: 14,
                  paddingHorizontal: 0,
                }}
              />
            </CustomRow>
          </View>

          <View
            style={{
              marginTop: 10,
              width: "80%",
              alignSelf: "center",
            }}
          >
            {/* <CustomRow
              style={{
                alignItems: 'center',

                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderBottomWidth: 2,
                borderColor: 'grey',
              }}>
              <View>
                <CustomIcon
                  color={'grey'}
                  name={'mail'}
                  size={15}
                  type={'ION'}
                />
              </View>
              <View
                style={{
                  borderLeftColor: 'grey',
                  borderLeftWidth: 1,
                  backgroundColor: 'grey',
                  flex: 1,
                  marginVertical: 8,
                  marginHorizontal: 5,
                }}
              />
              <View>
                <TextInput
                  maxLength={10}
                  placeholderTextColor={'grey'}
                  keyboardType="email-address"
                  placeholder="Email"
                  style={{
                    paddingVertical: 5,
                    fontSize: 14,

                    paddingHorizontal: 0,
                  }}
                />
              </View>
            </CustomRow> */}
          </View>
          {/* <View
            style={{
              marginTop: 10,
              width: '80%',
              alignSelf: 'center',
            }}>
            <CustomRow
              style={{
                alignItems: 'center',

                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderBottomWidth: 2,
                borderColor: 'grey',
              }}>
              <View>
                <CustomIcon
                  color={'grey'}
                  name={'phone'}
                  size={15}
                  type={'ENT'}
                />
              </View>
              <View
                style={{
                  borderLeftColor: 'grey',
                  borderLeftWidth: 1,
                  backgroundColor: 'grey',
                  flex: 1,
                  marginVertical: 8,
                  marginHorizontal: 5,
                }}
              />
              <View>
                <TextInput
                  maxLength={10}
                  placeholderTextColor={'grey'}
                  keyboardType="email-address"
                  placeholder="Mobile Number"
                  style={{
                    paddingVertical: 5,
                    fontSize: 14,

                    paddingHorizontal: 0,
                  }}
                />
              </View>
            </CustomRow>
          </View> */}

          <View
            style={{
              width: Dimensions.get("window").width - 80,
              alignSelf: "center",

              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <CustomRow
              ratios={[1, 1]}
              style={{
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setGender(0);
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,

                  borderColor: gender == 0 ? Theme.PrimaryColor : "grey",
                  justifyContent: "center",
                  backgroundColor: gender == 0 ? Theme.PrimaryColor : "white",

                  marginRight: 5,
                  paddingVertical: 3,
                }}
              >
                <CustomRow
                  style={{
                    paddingVertical: 7,
                  }}
                  spacing={10}
                  h_center
                  v_center
                >
                  <CustomIcon
                    name={"male"}
                    type={"ION"}
                    color={gender == 0 ? "white" : "black"}
                    size={15}
                  />
                  <CustomText
                    medium
                    value={"Male"}
                    size={15}
                    color={gender == 0 ? "white" : "black"}
                  />
                </CustomRow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender(1);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: gender == 0 ? "grey" : Theme.PrimaryColor,
                  borderRadius: 10,
                  backgroundColor: gender == 0 ? "white" : Theme.PrimaryColor,
                  paddingVertical: 3,
                }}
              >
                <CustomRow
                  style={{
                    paddingVertical: 7,

                    justifyContent: "center",
                  }}
                  h_center
                  v_center
                >
                  <CustomIcon
                    name={"female"}
                    type={"ION"}
                    color={gender == 0 ? "black" : "white"}
                    size={15}
                  />

                  <CustomText
                    margin_h={6}
                    medium
                    value={"Female"}
                    size={15}
                    color={gender == 0 ? "black" : "white"}
                  />
                </CustomRow>
              </TouchableOpacity>
            </CustomRow>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          marginHorizontal: 30,
          // flex: 1,
          position: "absolute",
          bottom: 0,
          width: "90%",
          alignSelf: "center",
          backgroundColor: "white",
        }}
      >
        <CustomButton
          onPress={() => {
            handleValidation();
          }}
          style={{
            paddingVertical: 15,
          }}
          title={"Update"}
          width={"100%"}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
