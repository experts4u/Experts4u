// import {useNavigation} from '@react-navigation/native';
// import Assets from 'Assets';
// import CustomButton from 'Components/CustomButton';
// import CustomImage from 'Components/CustomImage';
// import CustomInput from 'Components/CustomInput';
// import CustomRow from 'Components/CustomRow';
// import CustomText from 'Components/CustomText';
// import Fonts from 'Configs/Fonts';
// import Theme from 'Configs/Theme';
// import Routes from 'RootNavigation/Routes';
// import {
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   View,
//   useWindowDimensions,
// } from 'react-native';

// export default function () {
//   const Navigation = useNavigation();
//   const dimension = useWindowDimensions();

//   const width = dimension.width;
//   return (
//     // <SafeAreaView
//     //   style={{
//     //     flex: 1,
//     //     backgroundColor: Theme.PrimaryColor,
//     //     paddingHorizontal: 20,
//     //   }}>
//     <ScrollView
//       contentContainerStyle={{
//         backgroundColor: Theme.PrimaryColor,
//         paddingHorizontal: 20,
//         flex: 1,
//       }}
//       showsVerticalScrollIndicator={false}>
//       <View style={{}}>
//         <CustomImage
//           src={Assets.welcomewhite}
//           size={140}
//           resizeMode={'center'}
//         />
//       </View>
//       <View
//         style={
//           {
//             // marginTop: 10,
//           }
//         }>
//         <CustomText
//           size={15}
//           value={'Enter Your Mobile Number'}
//           color={'white'}
//           medium
//         />
//       </View>
//       <CustomRow
//         style={{
//           backgroundColor: 'white',
//           alignItems: 'center',
//           // justifyContent: 'center',

//           borderRadius: 11,
//           marginTop: 10,
//           paddingHorizontal: 10,
//           paddingVertical: 7,
//         }}>
//         <View>
//           <CustomText color={'grey'} medium value={'+91 '} size={14} />
//         </View>
//         <View
//           style={{
//             borderLeftColor: 'grey',
//             borderLeftWidth: 1,
//             backgroundColor: 'grey',
//             flex: 1,
//             marginVertical: 8,
//             marginHorizontal: 3,
//           }}
//         />
//         <View>
//           <TextInput
//             maxLength={10}
//             placeholderTextColor={'grey'}
//             keyboardType="number-pad"
//             placeholder="Enter Your Mobile Number"
//             style={{
//               padding: 5,

//               // marginLeft: 5,
//               fontSize: 14,
//             }}
//           />
//         </View>
//       </CustomRow>
//       <View
//         style={{
//           alignSelf: 'center',
//           marginTop: 10,
//         }}>
//         <CustomText
//           size={12}
//           color={'white'}
//           regular
//           value={'You’ll receive 4-digit code to verify the number'}
//         />
//       </View>
//       <View
//         style={{
//           marginTop: 20,
//         }}>
//         <CustomButton
//           onPress={() => {
//             Navigation.navigate(Routes.OtpScreen);
//           }}
//           style={{
//             backgroundColor: 'white',
//             borderRadius: 30,
//             paddingVertical: 15,
//           }}
//           title={'Continue'}
//           titleStyle={{
//             color: Theme.PrimaryColor,
//             fontFamily: Fonts.PoppinsMedium,
//           }}
//         />
//       </View>

//       <CustomRow
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 30,
//         }}>
//         <View
//           style={{
//             height: 1,
//             width: width / 3,
//             backgroundColor: 'white',
//             opacity: 0.6,
//           }}
//         />
//         <CustomText
//           bold
//           value={' OR '}
//           margin_h={10}
//           color={'white'}
//           size={18}
//         />
//         <View
//           style={{
//             height: 1,
//             width: width / 3,
//             backgroundColor: 'white',
//             opacity: 0.6,
//           }}
//         />
//       </CustomRow>

//       <View
//         style={{
//           alignSelf: 'center',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 30,
//         }}>
//         <CustomText
//           size={18}
//           value={'Login with Social Media'}
//           medium
//           color={'white'}
//         />
//       </View>

//       <View
//         style={{
//           alignSelf: 'center',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: 30,
//           backgroundColor: 'white',
//           padding: 6,
//           borderRadius: 30,
//         }}>
//         <CustomImage
//           src={Assets.googlelogocolor}
//           size={40}
//           resizeMode={'center'}
//         />
//       </View>
//       <View
//         style={{
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'row',
//           marginTop: 30,
//         }}>
//         <CustomText
//           align={'center'}
//           regular
//           size={12}
//           color={'white'}
//           value={'By Clicking, I accept'}
//           style={{}}
//         />
//         <CustomText
//           align={'center'}
//           regular
//           margin_h={10}
//           size={12}
//           color={'white'}
//           value={'the Terms of Services'}
//           style={{
//             textDecorationLine: 'underline',
//           }}
//         />
//       </View>
//     </ScrollView>
//     // </SafeAreaView>
//   );
// }

import Assets from 'Assets';
import CustomImage from 'Components/CustomImage';
import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import {useEffect, useRef, useState} from 'react';
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomRow from 'Components/CustomRow';
import Fonts from 'Configs/Fonts';
import {useNavigation} from '@react-navigation/native';
import Routes from 'RootNavigation/Routes';
import CustomIcon from 'Components/CustomIcon';
import CustomButton from 'Components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomInput from 'Components/CustomInput';
import useFetch from 'Hooks/useFetch';
import Endpoints from 'Configs/API/Endpoints';
import ToastMessage from 'Utils/ToastMessage';
import {ValidateList, ValidationTypes} from 'Utils/ValidationHelper';
import TextMessages from 'Utils/TextMessages';
import Loader from 'Components/CustomLoader';

export default function () {
  const Navigation = useNavigation();

  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const dimension = useWindowDimensions();

  const width = dimension.width;
  const height = dimension.height;

  const {isLoading, response, fetchData, error} = useFetch({
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
    // Dispatch(saveUserInfo(response));
    // Dispatch(saveAccessToken(response.token));
    ToastMessage.Success(response?.message);
    Navigation.navigate(Routes.OtpScreen, {number});
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
        backgroundColor: 'white',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        contentContainerStyle={{
          backgroundColor: Theme.PrimaryColor,
        }}>
        <View
          style={{
            marginTop: 10,
          }}>
          <View
            style={{
              backgroundColor: '#4894f0',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              alignSelf: 'center',
              // marginVertical: 30,
              borderRadius: 60,
              paddingHorizontal: 10,
              paddingVertical: 15,
              height: 100,
              marginTop: '4%',
            }}>
            <CustomIcon
              name={'mobile-phone'}
              type={'FA'}
              color={'white'}
              size={50}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <CustomText
              value={'Mobile Number'}
              color={'white'}
              bold
              size={20}
            />
          </View>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            <CustomText
              size={13}
              medium
              color={'white'}
              value={'We have to send OTP to authenticate your number'}
              margin_v={10}
              align={'center'}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopLeftRadius: 100,
            marginTop: 40,
          }}>
          <View
            style={{
              marginTop: 100,
              width: '80%',
              alignSelf: 'center',
            }}>
            <CustomRow
              style={{
                alignItems: 'center',
                // justifyContent: 'center',

                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderBottomWidth: 2,
                borderColor: 'grey',
              }}>
              <View>
                <CustomText color={'grey'} medium value={'+91 '} size={14} />
              </View>
              <View
                style={{
                  borderLeftColor: 'grey',
                  borderLeftWidth: 1,
                  backgroundColor: 'grey',
                  flex: 1,
                  marginVertical: 8,
                  marginHorizontal: 3,
                }}
              />
              <View>
                <TextInput
                  autoFocus={true}
                  value={number}
                  onChangeText={e => setNumber(e)}
                  maxLength={10}
                  placeholderTextColor={'grey'}
                  keyboardType="number-pad"
                  placeholder="Enter Your Mobile Number"
                  style={{
                    padding: 5,

                    fontSize: 14,
                    color: 'grey',
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
              isLoading ? <Loader color={'white'} size={15} /> : 'Continue'
            }
            width={'80%'}
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
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
