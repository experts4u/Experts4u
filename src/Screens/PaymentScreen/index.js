import {useNavigation, useRoute} from '@react-navigation/native';
import Assets from 'Assets';
import CustomButton from 'Components/CustomButton';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomHeading from 'Components/CustomHeading';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomInput from 'Components/CustomInput';
import Loader from 'Components/CustomLoader';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Endpoints from 'Configs/API/Endpoints';
import Theme from 'Configs/Theme';
import useFetch from 'Hooks/useFetch';
import {AccessToken_} from 'ReduxState/ReducerHelpers';
import {clearCart} from 'ReduxState/Slices/UserSlice';
import Routes from 'RootNavigation/Routes';
import ToastMessage from 'Utils/ToastMessage';
import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';

export default function () {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const Navigation = useNavigation();
  const user_info = useSelector(v => v.user);
  const userID = useSelector(v => v?.user?.userInfo?.user?._id);
  let token = useSelector(AccessToken_);

  const [method, setMethod] = useState(0);
  const [orderR, setOrderR] = useState();

  const requestBody = params?.requestBody;

  const Submission = {
    Note: requestBody?.Note,
    RPrice: requestBody?.RPrice,
    SPrice: requestBody?.SPrice,
    Status: requestBody?.Status,
    TServiceTiming: requestBody?.TServiceTiming,
    appointmentId: requestBody?.appointmentId,
    cancelCharges: requestBody?.cancelCharges,
    cart: requestBody?.cart,
    clientAddressId: requestBody?.clientAddressId,
    concession: requestBody?.concession,
    couponCode: requestBody?.couponCode,
    couponDiscount: requestBody?.couponDiscount,
    jobStatus: requestBody?.jobStatus,
    jobsSource: requestBody?.jobsSource,
    payableCharges: requestBody?.payableCharges,
    payment_Mode: method == 0 ? 'online' : '',
    surgeCharges: requestBody?.surgeCharges,
    tip: requestBody?.tip,
    userId: userID,

    slotDate: requestBody?.slotDate,
    slotTime: requestBody?.slotTime,
  };

  let {
    fetchData: fetchOrder,
    response: orderResponse,
    error,
    isLoading: orderLoad,
  } = useFetch({
    endpoint: Endpoints.AddJobs,
    body: Submission,
  });

  useEffect(() => {
    if (orderResponse) {
      setOrderR(orderResponse?.data);
      console.log('orderResponse', orderResponse);
    }
  }, [orderResponse]);

  useEffect(() => {
    if (orderResponse) {
      handleOrderResponse();
    }
  }, [orderResponse]);

  console.log('orderR?.order?.amount,', orderR);

  const payWithRazorpay = () => {
    let options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_RL1inAeIn1XHdn', // Your api key
      amount: orderR?.payableCharges * 100,
      name: 'experts4u',
      amount_paid: '0',
      amount_due: orderR?.order?.amount_due,
      receipt: orderR?.order?.receipt,
      order_id: orderR?.order?.id,
      prefill: {
        email: 'Rahul@razorpay.com',
        contact: '9191919191',
        name: 'Rahul',
      },
      theme: {color: Theme.PrimaryColor},
    };

    Navigation.replace(Routes.PaymentSuccess, {
      orderId: orderR.order?.id,
    });

    RazorpayCheckout.open(options)
      .then(data => {
        console.log(`signature: ${data.razorpay_signature}`);
        console.log(`payment: ${data.razorpay_payment_id}`);
        const SERVER_URL = Endpoints.baseUrl + Endpoints.verifyOrder;
        const headers = {
          'x-razorpay-signature': data.razorpay_signature,
          Authorization: 'Bearer ' + token,
        };

        const requestBody = {
          order_id: params.responss?.order?.id,
          payment_id: data?.razorpay_payment_id,
        };

        axios
          .post(SERVER_URL, requestBody, {headers})
          .then(orderData => {
            if (orderData) {
              ToastMessage.Success('Order Created SuccessFully');
              dispatch(clearCart());
            } else {
              console.log('Failed to create order.');
            }
          })
          .catch(error => {
            console.error('Error creating order:', error);
            // Handle errors if any
          });
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const handleOrderResponse = () => {
    // payWithRazorpay()
    console.log(orderResponse);
    if (method == 1) {
      Navigation.navigate(Routes.PaymentSuccess, {
        orderId: orderResponse?.data?.jobId,
      });
    } else {
      if (orderR) {
        payWithRazorpay();
      }
    }
  };

  // const payWithRazorpay = () => {
  //   let options = {
  //     description: 'Credits towards consultation',
  //     image: 'https://i.imgur.com/3g7nmJC.png',
  //     currency: 'INR',
  //     key: 'rzp_test_RL1inAeIn1XHdn', // Your api key
  //     amount: params?.responss?.order?.amount,
  //     name: 'Rahul',
  //     amount_paid: '0',
  //     amount_due: params?.responss?.order?.amount_due,
  //     receipt: params.responss?.order?.receipt,
  //     order_id: params.responss?.order?.id,
  //     prefill: {
  //       email: 'Rahul@razorpay.com',
  //       contact: '9191919191',
  //       name: 'Rahul',
  //     },
  //     theme: {color: Theme.PrimaryColor},
  //   };

  //   RazorpayCheckout.open(options)
  //     .then(data => {
  //       // handle success
  //       console.log(`signature: ${data.razorpay_signature}`);
  //       setSignature(data?.razorpay_signature);
  //       setPaymentId(data.razorpay_payment_id);
  //       console.log(`payment: ${data.razorpay_payment_id}`);

  //       // Call the function to proceed with payment
  //       proceedWithPayment();
  //     })
  //     .catch(error => {
  //       // handle failure
  //       alert(`Error: ${error.code} | ${error.description}`);
  //     });
  // };

  // const proceedWithPayment = () => {
  //   // Check if signature is available
  //   if (signature.length > 0) {
  //     const SERVER_URL = Endpoints.baseUrl + Endpoints.verifyOrder;
  //     const headers = {
  //       'x-razorpay-signature': signature,
  //     };
  //     console.log('Headers:', headers);
  //     const requestBody = {
  //       order_id: params.responss?.order?.id,
  //       payment_id: paymentId, // Assuming paymentId is set elsewhere
  //     };

  //     axios
  //       .post(SERVER_URL, requestBody, {headers})
  //       .then(orderData => {
  //         // Handle the order data returned from the server
  //         if (orderData) {
  //           console.log('Order created successfully:', orderData);
  //           ToastMessage.Success('Order Created SuccessFully');
  //           dispatch(clearCart());
  //           Navigation.replace(Routes.MainTabStack);
  //           // Do something with the order data
  //         } else {
  //           console.log('Failed to create order.');
  //           // Handle the case where order creation failed
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error creating order:', error);
  //         // Handle errors if any
  //       });
  //   } else {
  //     // Signature not available yet, handle accordingly
  //     console.log('Signature not available yet');
  //     // You might want to add some handling here, like showing a message to the user or retrying after some time
  //   }
  // };

  return (
    <View>
      <CustomHeader l_type={'back_arrow'} title={'Payment'} />
      <ScrollView>
        <CustomCard
          style={{
            paddingBottom: 10,
          }}>
          <CustomRow
            ratios={[1, 0]}
            style={{
              marignHorizontal: 10,
              paddingHorizontal: 10,
            }}>
            <CustomText regular value={'Amount to be paid'} />
            <CustomText
              color={Theme.Black}
              bold
              value={requestBody?.payableCharges}
            />
          </CustomRow>
        </CustomCard>

        <CustomCard>
          <CustomHeading heading={'All other option'} />
          <TouchableOpacity
            onPress={() => {
              setMethod(0);
            }}>
            <CustomRow
              style={{
                marginVertical: 8,
              }}
              spacing={10}
              ratios={[0, 1, 0]}
              v_center>
              {/* <CustomImage
                src={Assets.upiselect}
                resizeMode={'center'}
                size={24}
              /> */}
              {method == 1 ? (
                <CustomIcon
                  color={Theme.PrimaryColor}
                  type={'MC'}
                  name={'circle-outline'}
                  size={24}
                />
              ) : (
                <CustomIcon
                  type={'MC'}
                  name={'circle-slice-8'}
                  size={24}
                  color={Theme.PrimaryColor}
                />
              )}
              <View>
                <CustomText regular value={'Pay Online'} />
              </View>
              <CustomImage
                src={Assets.razorpay}
                size={40}
                resizeMode={'center'}
              />
            </CustomRow>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMethod(1);
            }}>
            <CustomRow
              style={{
                marginVertical: 8,
              }}
              spacing={10}
              ratios={[0, 1, 0]}
              v_center>
              {method != 1 ? (
                <CustomIcon
                  type={'MC'}
                  name={'circle-outline'}
                  size={24}
                  color={Theme.PrimaryColor}
                />
              ) : (
                <CustomIcon
                  type={'MC'}
                  name={'circle-slice-8'}
                  size={24}
                  color={Theme.PrimaryColor}
                />
              )}
              <View>
                <CustomText
                  regular
                  value={'Pay after Service\n(Cash/Paytm/Phone Pay/GPay)'}
                />
              </View>
              <CustomImage
                src={Assets.payafterservice}
                size={40}
                resizeMode={'center'}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomCard>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <CustomText
          style={{
            alignSelf: 'center',
          }}
          value={'100% Safe and Secure Transactions'}
        />
        <CustomButton
          onPress={() => {
            fetchOrder();
          }}
          width={'80%'}
          title={orderLoad ? <Loader color={'white'} size={14} /> : 'Continue'}
        />
      </View>
    </View>
  );
}
