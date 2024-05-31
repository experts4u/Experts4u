import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import Assets from 'Assets';
import CustomButton from 'Components/CustomButton';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomInput from 'Components/CustomInput';
import Loader from 'Components/CustomLoader';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Endpoints from 'Configs/API/Endpoints';
import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import useFetch from 'Hooks/useFetch';
import {saveUserInfo} from 'ReduxState/Slices/UserSlice';
import Routes from 'RootNavigation/Routes';
import TextMessages from 'Utils/TextMessages';
import ToastMessage from 'Utils/ToastMessage';
import {ValidateList, ValidationTypes} from 'Utils/ValidationHelper';
import {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

export default function () {
  const [gender, setGender] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');

  const Navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor(Theme.PrimaryColor);
    StatusBar.setBarStyle('default');
  }, []);

  let {isLoading, fetchData, response, error} = useFetch({
    endpoint: Endpoints.CreateProfile,
    body: {
      name: name,
      email: email,
      gender: gender == 0 ? 'male' : 'female',
    },
  });

  const handleValidation = async () => {
    startLoading();
    let validate_arr = [
      [name, ValidationTypes.Empty, TextMessages.FullNameErr],

      [email, ValidationTypes.Email, TextMessages.EmailErr],
    ];
    let isValidated = await ValidateList(validate_arr);
    if (!isValidated) {
      return;
    }
    fetchData();
  };

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (response) {
      handleResponse();
    }
  }, [response]);

  const handleResponse = () => {
    dispatch(saveUserInfo(response?.user));
    ToastMessage.Success(response?.user.name + 'Profile created Successfully');

    Navigation.reset({
      routes: [
        {
          name: Routes.MainTabStack,
        },
      ],
      index: 0,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.PrimaryColor,
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 20,
            marginLeft: 30,
            marginHorizontal: 10,
          }}>
          <CustomText
            size={22}
            color={'white'}
            value={'Great!!\nLet’s Create Your Profile'}
            bold
            align={'left'}
          />
        </View>

        <View
          style={{
            backgroundColor: 'white',
            // backgroundColor: 'red',
            flex: 1,
            marginTop: '10%',
            borderTopLeftRadius: 100,
            // borderTopRightRadius: 30,
            paddingBottom: 130,
          }}>
          <View
            style={{
              marginTop: 70,
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
                <CustomIcon
                  name={'person'}
                  color={'grey'}
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
                  marginHorizontal: 6,
                }}
              />
              <View>
                <TextInput
                  value={name}
                  maxLength={10}
                  placeholderTextColor={'grey'}
                  onChangeText={e => {
                    setName(e);
                  }}
                  // keyboardType="number-pad"
                  placeholder="Full Name"
                  style={{
                    paddingVertical: 5,

                    // marginLeft: 5,
                    fontSize: 14,
                    paddingHorizontal: 0,
                  }}
                />
              </View>
            </CustomRow>
          </View>

          <View
            style={{
              marginTop: 10,
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
                  value={email}
                  placeholderTextColor={'grey'}
                  keyboardType="email-address"
                  onChangeText={e => {
                    setEmail(e);
                  }}
                  placeholder="Email"
                  style={{
                    paddingVertical: 5,
                    fontSize: 14,

                    paddingHorizontal: 0,
                  }}
                />
              </View>
            </CustomRow>
          </View>

          <View
            style={{
              width: Dimensions.get('window').width - 80,
              alignSelf: 'center',

              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <CustomRow
              ratios={[1, 1]}
              style={{
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setGender(0);
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,

                  borderColor: gender == 0 ? Theme.PrimaryColor : 'grey',
                  justifyContent: 'center',
                  backgroundColor: gender == 0 ? Theme.PrimaryColor : 'white',

                  marginRight: 5,
                  paddingVertical: 3,
                }}>
                <CustomRow
                  style={{
                    // paddingHorizontal: 5,
                    paddingVertical: 7,
                  }}
                  spacing={10}
                  h_center
                  v_center

                  // ratios={[0, 1]}
                >
                  {/* <CustomImage size={15} src={Assets.malered} /> */}
                  <CustomIcon
                    name={'male'}
                    type={'ION'}
                    color={gender == 0 ? 'white' : 'black'}
                    size={15}
                  />
                  <CustomText
                    medium
                    value={'Male'}
                    size={15}
                    color={gender == 0 ? 'white' : 'black'}
                  />
                </CustomRow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender(1);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: gender == 0 ? 'grey' : Theme.PrimaryColor,
                  borderRadius: 10,
                  backgroundColor: gender == 0 ? 'white' : Theme.PrimaryColor,
                  paddingVertical: 3,
                }}>
                <CustomRow
                  style={{
                    // paddingHorizontal: 0,
                    paddingVertical: 7,

                    justifyContent: 'center',
                  }}
                  h_center
                  v_center>
                  {/* <CustomImage size={15} src={Assets.malered} /> */}
                  <CustomIcon
                    name={'female'}
                    type={'ION'}
                    color={gender == 0 ? 'black' : 'white'}
                    size={15}
                  />

                  <CustomText
                    margin_h={6}
                    // style={{
                    //   marginTop: 4,
                    // }}
                    medium
                    value={'Female'}
                    size={15}
                    color={gender == 0 ? 'black' : 'white'}
                  />
                </CustomRow>
              </TouchableOpacity>
            </CustomRow>
          </View>

          <View
            style={{
              marginHorizontal: 35,
              marginTop: 20,
            }}>
            {/* <CustomInput
              containerStyle={{
                // backgroundColor: '#FFD15C66',
                backgroundColor: '#4D97F3',
                fontFamily: Fonts.PoppinsBold,

              }}

              placeholder={'Enter Referral Code'}
              placeholderColor={'white'}
              Left
              leftIcon={Assets.coupen}
            /> */}
            <CustomRow
              v_center
              style={{
                borderBottomWidth: 2,
                borderBottomColor: 'grey',
                marginTop: 20,
              }}>
              <CustomImage
                src={Assets.coupen}
                resizeMode={'center'}
                size={22}
              />
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
              <TextInput
                style={{
                  padding: 4,
                }}
                placeholderTextColor={'grey'}
                placeholder="Enter Referral Code"
              />
            </CustomRow>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 30,
          flex: 1,
          position: 'absolute',
          bottom: 0,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <CustomRow v_center>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={{marginRight: 10}}
              tintColors={{
                true: Theme.PrimaryColor,
                false: Theme.PrimaryColor,
              }} //
            />

            <CustomText
              style={{
                marginLeft: -10,
              }}
              value={'I agree to the'}
            />
            <CustomText
              style={{
                textDecorationLine: 'underline',
                marginLeft: 6,
              }}
              regular
              color={Theme.PrimaryColor}
              value={'Terms & Conditions'}
            />
          </CustomRow>
        </View>
        <CustomButton
          onPress={() => {
            handleValidation();
          }}
          style={{
            paddingVertical: 15,
          }}
          title={
            isLoading ? (
              <Loader size={12} color={Theme.PrimaryColor} />
            ) : (
              'Continue'
            )
          }
          width={'100%'}
        />
      </View>
    </SafeAreaView>
  );
}
