import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPTextView from 'react-native-otp-textinput';
import CustomRow from 'Components/CustomRow';
import Fonts from 'Configs/Fonts';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Routes from 'RootNavigation/Routes';
import CustomIcon from 'Components/CustomIcon';
import CustomButton from 'Components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ToastMessage from 'Utils/ToastMessage';
import Endpoints from 'Configs/API/Endpoints';
import useFetch from 'Hooks/useFetch';
import {useDispatch} from 'react-redux';
import {saveAccessToken, saveUserInfo} from 'ReduxState/Slices/UserSlice';
import Loader from 'Components/CustomLoader';

export default function () {
  const Navigation = useNavigation();

  const [otpValue, setOtpValue] = useState('');
  const [otpfilled, setotpfilled] = useState('');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const Dispatch = useDispatch();
  const focused = useIsFocused();

  let {params} = useRoute();

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  let configs = {
    endpoint: Endpoints.otp,
    body: {
      mobileNo: params.number,
      otp: otpValue,
    },
    method: 'Post',
  };

  let resendConfig = {
    endpoint: Endpoints.resendotp,
    body: {
      mobileNo: params.number,
    },
    method: 'Post',
  };

  let {isLoading, fetchData, response, error} = useFetch(configs);

  let {
    isLoading: loadingg,
    fetchData: resendFetch,
    response: resp,
    error: e,
  } = useFetch(resendConfig);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (otpValue.length == 4) {
      fetchData();
      Keyboard.dismiss();
    }
  }, [otpValue]);

  const handleValidation = () => {
    startLoading();
    if (otpValue.length != 4) {
      ToastMessage.Error('Code invalid');
      return;
    }
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 5000);
    fetchData();
  };

  const handleResponse = () => {
    Dispatch(saveAccessToken(response.token));
    ToastMessage.Success('Code verified');

    if (response?.user) {
      Dispatch(saveUserInfo(response));
    }

    if (response?.isNewUser == true) {
      Navigation.replace(Routes.SignupFormScreen);
    } else {
      Navigation.reset({
        routes: [
          {
            name: Routes.MainTabStack,
          },
        ],
        index: 0,
      });
    }
  };

  useEffect(() => {
    if (response) {
      handleResponse();
    }
  }, [response]);

  // useEffect(() => {
  //   if (focused) {
  //     setTimeout(() => {
  //       // if (focused) {
  //       setresendVisible(true);
  //       // }
  //     }, 30000);

  //     clearTimeout();
  //   }
  // }, [focused]);

  useEffect(() => {
    let timer;

    if (focused) {
      setSecondsLeft(30); // Reset the countdown to 30 seconds
      setResendVisible(true); // Show the resend button
      timer = setInterval(() => {
        setSecondsLeft(prevSeconds => {
          if (prevSeconds === 1) {
            setResendVisible(false); // Hide the resend button when countdown reaches 0
            clearInterval(timer); // Clear the interval when countdown reaches 0
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer); // Clear the interval if the component is no longer focused
      setResendVisible(false); // Hide the resend button if the component is no longer focused
    }

    return () => clearInterval(timer); // Cleanup the interval when the component is unmounted or when focused changes
  }, [focused]);

  const handleResendButton = () => {
    setResendVisible(true);
    if (resendVisible == true) {
      resendFetch();
      // setResendVisible(true);
    }
    return;
  };

  useEffect(() => {
    if (resp) {
      handleResend();
    }
  }, [resp]);

  const handleResend = () => {
    console.log(resp);
    ToastMessage.Success(resp?.message);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.PrimaryColor,
        backgroundColor: 'white',
      }}>
      <ScrollView
        keyboardShouldPersistTaps="never"
        contentContainerStyle={{
          flex: 1,
          backgroundColor: Theme.PrimaryColor,
          flexGrow: 1,
        }}>
        <View
          style={{
            marginTop: '4%',
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
            }}>
            <CustomIcon
              name={'keypad'}
              type={'ION'}
              color={'white'}
              size={50}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 6,
            }}>
            <CustomText value={'OTP'} color={'white'} bold size={20} />
          </View>
          <View
            style={{
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
            <CustomText
              size={15}
              medium
              color={'white'}
              value={'Please Enter the OTP Sent To Mobile Number'}
              margin_v={10}
              align={'center'}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 100,
            marginTop: '10%',
            flex: 1,
          }}>
          <View
            style={{
              marginTop: '18%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <OTPTextView
              autoComplete="sms-otp"
              keyboardType="number-pad"
              handleTextChange={e => {
                if (e.length === 4) {
                  setOtpValue(e);
                }
              }}
              handleCellTextChange={f => {
                console.log('f', f);
              }}
              textInputStyle={{
                // borderWidth: 2,
                backgroundColor: '#EEEEEE',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 17,
              }}
              offTintColor={'transparent'}
              tintColor={Theme.PrimaryColor}
              autoFocus={true}
              containerStyle={{
                margin: 10,
              }}
              ref={e => (otpInput = e)}
            />
          </View>

          <CustomRow
            style={{
              marginTop: '10%',
            }}
            h_center>
            <View
              style={{
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                marginTop: 20,
              }}>
              <CustomText
                size={16}
                style={{
                  fontFamily: Fonts.PoppinsMedium,
                }}
                color={Theme.PrimaryColor}
                value={'Didn' + "'" + 't receive an OTP?'}
              />
            </View>
          </CustomRow>
          <TouchableOpacity
            // activeOpacity={false}
            disabled={secondsLeft != 0 ? true : false}
            onPress={() => {
              handleResendButton();
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              size={14}
              color={Theme.PrimaryColor}
              margin_h={5}
              value={
                secondsLeft != 0 ? `Resend OTP (${secondsLeft})` : 'Resend OTP'
              }
              style={{
                fontFamily: Fonts.PoppinsMedium,
                textDecorationLine: 'underline',
                marginTop: 10,
                opacity: resendVisible == true ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>

          <CustomButton
            onPress={() => {
              handleValidation();
            }}
            style={{
              marginTop: Dimensions.get('window').height * 0.1,
              paddingVertical: 15,
            }}
            title={
              isLoading ? <Loader size={15} color={'white'} /> : 'Verify Now'
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
