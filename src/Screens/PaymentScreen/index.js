import { useNavigation, useRoute } from "@react-navigation/native";
import Assets from "Assets";
import CustomButton from "Components/CustomButton";
import CustomCard from "Components/CustomCard";
import CustomHeader from "Components/CustomHeader";
import CustomHeading from "Components/CustomHeading";
import CustomIcon from "Components/CustomIcon";
import CustomImage from "Components/CustomImage";
import CustomInput from "Components/CustomInput";
import Loader from "Components/CustomLoader";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import Endpoints from "Configs/API/Endpoints";
import Theme from "Configs/Theme";
import useFetch from "Hooks/useFetch";
import { AccessToken_ } from "ReduxState/ReducerHelpers";
import { clearCart } from "ReduxState/Slices/UserSlice";
import Routes from "RootNavigation/Routes";
import ToastMessage from "Utils/ToastMessage";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const Navigation = useNavigation();
  const user_info = useSelector((v) => v.user?.userInfo);
  const userID = useSelector((v) => v?.user?.userInfo?.user?._id);
  let token = useSelector(AccessToken_);

  const [method, setMethod] = useState(0);
  const [orderR, setOrderR] = useState();

  console.log("user_info", user_info);
  console.log("userID", userID);

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
    payment_Mode: method == 0 ? "online" : "",
    surgeCharges: requestBody?.surgeCharges,
    tip: requestBody?.tip,
    userId: user_info?._id ? user_info?._id : userID,
    otherCharges: requestBody?.OtherCharges,

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

  // const payWithRazorpay = () => {
  //   if (!orderR) {
  //     console.error("Order data is missing.");
  //     return;
  //   }
  //   let options = {
  //     description: "Credits towards consultation",
  //     image: "https://i.imgur.com/3g7nmJC.png",
  //     currency: "INR",
  //     key: "rzp_test_RL1inAeIn1XHdn", // Your api key
  //     amount: orderR?.payableCharges * 100,
  //     name: "experts4u",
  //     amount_paid: "0",
  //     amount_due: orderR?.order?.amount_due,
  //     receipt: orderR?.order?.receipt,
  //     order_id: orderR?.order?.id,
  //     prefill: {
  //       email: "Rahul@razorpay.com",
  //       contact: "9191919191",
  //       name: "Rahul",
  //     },
  //     theme: { color: Theme.PrimaryColor },
  //   };

  //   // const options = {
  //   //   description: "Credits towards consultation",
  //   //   image: "https://i.imgur.com/3g7nmJC.png",
  //   //   currency: "INR",
  //   //   key: "rzp_test_RL1inAeIn1XHdn",
  //   //   amount: orderR.payableCharges * 100,
  //   //   name: "experts4u",
  //   //   amount_paid: "0",
  //   //   amount_due: orderR?.order.amount_due,
  //   //   receipt: orderR?.order.receipt,
  //   //   order_id: orderR?.order.id,
  //   //   prefill: {
  //   //     email: "Rahul@razorpay.com",
  //   //     contact: "9191919191",
  //   //     name: "Rahul",
  //   //   },
  //   //   theme: { color: Theme.PrimaryColor },
  //   // };

  //   RazorpayCheckout.open(options)
  //     .then((data) => handlePaymentSuccess(data))
  //     .catch((error) => handlePaymentFailure(error));
  // };
  const payWithRazorpay = () => {
    let options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_RL1inAeIn1XHdn", // Your api key
      amount: orderR?.payableCharges * 100,
      name: "experts4u",
      amount_paid: "0",
      amount_due: orderR?.order?.amount_due,
      receipt: orderR?.order?.receipt,
      order_id: orderR?.order?.id,
      prefill: {
        email: "Rahul@razorpay.com",
        contact: "9191919191",
        name: "Rahul",
      },
      theme: { color: Theme.PrimaryColor },
    };
    Navigation.navigate(Routes.PaymentSuccess, {
      orderId: orderR?.jobId,
      date: orderR,
      direct: 1,
    });
    // Navigation.replace(Routes.PaymentSuccess, {
    //   orderId: orderR.order?.id,
    // });

    RazorpayCheckout.open(options)
      .then((data) => {
        console.log(`signature: ${data.razorpay_signature}`);
        console.log(`payment: ${data.razorpay_payment_id}`);
        console.log("orderR", orderR);
        const SERVER_URL = Endpoints.baseUrl + Endpoints.verifyOrder;
        const headers = {
          "x-razorpay-signature": data.razorpay_signature,
          Authorization: "Bearer " + token,
        };

        const requestBody = {
          order_id: params.responss?.order?.id,
          payment_id: data?.razorpay_payment_id,
        };

        axios
          .post(SERVER_URL, requestBody, { headers })
          .then((orderData) => {
            if (orderData) {
              // Navigation.navigate(Routes.PaymentSuccess, {
              //   orderId: orderR?.jobId,
              //   date: orderR,
              //   direct: 1,
              // });
              console.log("orderData", orderData);

              ToastMessage.Success("Order Created SuccessFully");
              // dispatch(clearCart());
            } else {
              console.log("Failed to create order.");
            }
          })
          .catch((error) => {
            console.error("Error creating order:", error);
            // Handle errors if any
          });
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const handlePaymentSuccess = (data) => {
    const SERVER_URL = Endpoints.baseUrl + Endpoints.verifyOrder;
    const headers = {
      "x-razorpay-signature": data.razorpay_signature,
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      order_id: data.order_id,
      payment_id: data.razorpay_payment_id,
    };

    axios
      .post(SERVER_URL, requestBody, { headers })
      .then((orderData) => {
        ToastMessage.Success("Order Created Successfully");
        // Additional actions after successful payment
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        // Handle errors if any
      });
  };

  const handlePaymentFailure = (error) => {
    console.error("Payment failed:", error);
    alert(`Error: ${error.code} | ${error.description}`);
    // Handle payment failure
  };

  const handleOrderResponse = () => {
    if (method === 1) {
      navigateToSuccessPage(orderResponse.data.jobId, orderResponse.data);
    } else {
      setTimeout(() => {
        payWithRazorpay();
      }, 0);
    }
  };

  const navigateToSuccessPage = (orderId, date) => {
    Navigation.navigate(Routes.PaymentSuccess, { orderId, date });
  };

  useEffect(() => {
    if (orderResponse != null) {
      setOrderR(orderResponse.data);
    }
  }, [orderResponse]);
  console.log("orderResponse", orderResponse);
  // useEffect(() => {
  //   if (orderResponse?.data) {
  //     handleOrderResponse();
  //   }
  // }, [orderResponse]);

  useEffect(() => {
    if (orderR != null && orderResponse?.data) {
      handleOrderResponse();
    }
  }, [orderR]);

  // useEffect(() => {
  //   if (orderResponse) {
  //     setOrderR(orderResponse?.data);
  //   }
  // }, [orderResponse]);

  // useEffect(() => {
  //   if (orderResponse ) {
  //     handleOrderResponse();
  //   }
  // }, [orderResponse]);

  // const handleOrderResponse = () => {
  //   if (method == 1) {
  //     Navigation.navigate(Routes.PaymentSuccess, {
  //       orderId: orderResponse?.data?.jobId,
  //       date: orderResponse?.data,
  //     });
  //   } else {
  //     if (orderR) {
  //       payWithRazorpay();
  //     }
  //   }
  // };

  return (
    <View>
      <CustomHeader l_type={"back_arrow"} title={"Payment"} />
      <ScrollView>
        <CustomCard
          style={{
            paddingBottom: 10,
          }}
        >
          <CustomRow
            ratios={[1, 0]}
            style={{
              marignHorizontal: 10,
              paddingHorizontal: 10,
            }}
          >
            <CustomText regular value={"Amount to be paid"} />
            <CustomText
              color={Theme.Black}
              bold
              value={"₹ " + requestBody?.payableCharges}
            />
          </CustomRow>
        </CustomCard>

        <CustomCard>
          <CustomHeading heading={"All other option"} />
          <TouchableOpacity
            onPress={() => {
              setMethod(0);
            }}
          >
            <CustomRow
              style={{
                marginVertical: 8,
              }}
              spacing={10}
              ratios={[0, 1, 0]}
              v_center
            >
              {method == 1 ? (
                <CustomIcon
                  color={Theme.PrimaryColor}
                  type={"MC"}
                  name={"circle-outline"}
                  size={24}
                />
              ) : (
                <CustomIcon
                  type={"MC"}
                  name={"circle-slice-8"}
                  size={24}
                  color={Theme.PrimaryColor}
                />
              )}
              <View>
                <CustomText regular value={"Pay Online"} />
              </View>
              <CustomImage
                src={Assets.razorpay}
                size={40}
                resizeMode={"center"}
              />
            </CustomRow>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMethod(1);
            }}
          >
            <CustomRow
              style={{
                marginVertical: 8,
              }}
              spacing={10}
              ratios={[0, 1, 0]}
              v_center
            >
              {method != 1 ? (
                <CustomIcon
                  type={"MC"}
                  name={"circle-outline"}
                  size={24}
                  color={Theme.PrimaryColor}
                />
              ) : (
                <CustomIcon
                  type={"MC"}
                  name={"circle-slice-8"}
                  size={24}
                  color={Theme.PrimaryColor}
                />
              )}
              <View>
                <CustomText
                  regular
                  value={"Pay after Service\n(Cash/Paytm/Phone Pay/GPay)"}
                />
              </View>
              <CustomImage
                src={Assets.payafterservice}
                size={40}
                resizeMode={"center"}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomCard>
      </ScrollView>
      <View
        style={{
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <CustomText
          style={{
            alignSelf: "center",
          }}
          value={"100% Safe and Secure Transactions"}
        />
        <CustomButton
          disabled={orderLoad ? true : false}
          onPress={() => {
            fetchOrder();
          }}
          width={"80%"}
          title={orderLoad ? <Loader color={"white"} size={14} /> : "Continue"}
        />
      </View>
    </View>
  );
}
