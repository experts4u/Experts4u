import CustomText from "Components/CustomText";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CustomCard from "Components/CustomCard";
import CustomRow from "Components/CustomRow";
import CustomImage from "Components/CustomImage";
import Assets from "Assets";
import CustomHeading from "Components/CustomHeading";
import Theme from "Configs/Theme";
import Fonts from "Configs/Fonts";
import React, { useEffect, useRef, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Routes from "RootNavigation/Routes";
import CustomIcon from "Components/CustomIcon";
import Endpoints from "Configs/API/Endpoints";
import useFetch from "Hooks/useFetch";
import CustomButton from "Components/CustomButton";
import moment from "moment";
import AnimatedModal from "Components/AnimatedModal";
import ToastMessage from "Utils/ToastMessage";
import { showMessage } from "react-native-flash-message";
import Loader from "Components/CustomLoader";
import { UserInfo_ } from "ReduxState/ReducerHelpers";
import { useSelector } from "react-redux";
import RNImmediatePhoneCall from "react-native-immediate-phone-call";

export default () => {
  const scrollViewRef = useRef();
  const [ChargesData, setChargesData] = useState();
  const userDetails = useSelector((v) => v?.user?.userInfo?.user);
  const [first, setfirst] = useState(0);
  const slotRef = useRef();
  const CancelConfirmRef = useRef();
  const { params } = useRoute();
  const Navigation = useNavigation();
  const focused = useIsFocused();
  const [AppointmentsData, setAppointmentsData] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAddress, setselectedAddress] = useState([]);
  const [selectedSlotData, setselectedSlotData] = useState("");
  const [selectSlot, setSelectSlot] = useState("");
  const [selectedReason, setselectedReason] = useState("");
  const [cancelActive, setcancelActive] = useState(false);
  const [afterResheduleCard, setAfterResheduleCard] = useState(0);
  const [bookingData, setBookingData] = useState();
  const [slotss, setSlotss] = useState([]);

  useEffect(() => {
    if (params) {
      setBookingData(params?.item);
      GetJob();
    }
  }, [params]);

  const GetAppointments = useFetch({
    endpoint: Endpoints.GetAppointments,
    Token: false,
  });
  const GetJobData = useFetch({
    endpoint: Endpoints.getJobById + params?.item?.jobId,
    Token: false,
  });

  const handleDatePress = (date) => {
    setSelectedDate(date.slotDate);
    setSelectSlot(null);
  };

  const GetAppoinmentData = async () => {
    try {
      let appointments = await GetAppointments.fetchPromise();

      setAppointmentsData(appointments?.data);
    } catch (e) {
      console.log("err", e);
    }
  };
  const GetJob = async () => {
    try {
      let job = await GetJobData.fetchPromise();
      setBookingData(job?.data?.jobs[0]);

      // setAppointmentsData(appointments?.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    if (focused) {
      GetAppoinmentData();
    }
  }, [focused]);

  let item = params?.item;
  let BookingID = bookingData?._id;

  const { isLoading, response, fetchData, error } = useFetch({
    endpoint: Endpoints.reshedule + BookingID,

    body: {
      slotDate: selectedDate,
      slotTime: selectedSlotData?.slotTime,
      action: "reschedule",
      types: "user",
    },
  });

  useEffect(() => {
    if (response) {
      ToastMessage.Success(response?.message || response);
      Navigation.goBack();
    }
  }, [response]);

  const {
    isLoading: CancelLoading,
    response: cancelResponse,
    fetchData: FetchCancel,
    error: CancelError,
  } = useFetch({
    endpoint: Endpoints.cancelBooking + BookingID,
    body: {
      reasons: selectedReason,
      jobStatus: 9,
      action: "canceled",
      types: "user",
    },
  });

  useEffect(() => {
    if (cancelResponse) {
      handleConfirmHideModal();
      GetJob();
      scrollToTop();
      ToastMessage.Success("Booking Cancelled successfully");
    }
  }, [cancelResponse]);

  const DateContent = React.memo(({ dates, day, onDatePress, index }) => {
    return (
      <FlatList
        data={dates}
        horizontal
        keyExtractor={(item) => item.slotDate}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onDatePress(item);
            }}
            style={{
              marginHorizontal: 10,
              borderWidth: 1,
              padding: 5,
              paddingHorizontal: 17,
              alignItems: "center",
              borderRadius: 10,
              borderColor:
                selectedDate === item.slotDate ? Theme.PrimaryColor : "#E3E3E3",
            }}
            key={index}
          >
            <CustomText
              color={
                selectedDate === item.slotDate ? Theme.PrimaryColor : "black"
              }
              regular
              value={moment(item.slotDate).format("dddd").slice(0, 3)}
            />
            <CustomText
              size={20}
              bold
              margin_v={10}
              value={moment(item.slotDate).format("D")}
            />
          </TouchableOpacity>
        )}
      />
    );
  });

  const slotsToShow = selectedDate
    ? AppointmentsData?.find((item) => item.slotDate === selectedDate)?.slot ||
      []
    : [];

  useEffect(() => {
    if (AppointmentsData.length > 0) {
      setSelectedDate(AppointmentsData[0].slotDate);
    }
  }, [AppointmentsData]);

  const updatedData = slotsToShow?.map((item) => {
    const updatedSlotTime = item.slotTime.replace(/(AM|PM)/, "");
    return { ...item, slotTime: updatedSlotTime };
  });

  const SlotComponent = ({ slots }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {slots.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectSlot(index);
                setselectedSlotData(item);
              }}
              style={{
                borderWidth: 1,
                marginHorizontal: 10,
                marginVertical: 6,
                paddingVertical: 8,
                paddingHorizontal: 5,
                borderRadius: 5,
                marginLeft: 10,
                borderColor:
                  selectSlot == index ? Theme.PrimaryColor : "#E3E3E3",
              }}
              key={index}
            >
              {item.surgCharges > 0 ? (
                <View
                  style={{
                    position: "absolute",
                    borderWidth: 1,

                    left: 27,
                    bottom: 28,
                    paddingHorizontal: 7,
                    backgroundColor: "white",
                    borderColor: Theme.PrimaryColor,
                    borderRadius: 4,
                  }}
                >
                  <CustomText
                    regular
                    size={10}
                    color={Theme.PrimaryColor}
                    value={item.surgCharges}
                  />
                </View>
              ) : null}
              <CustomText color={"#757575"} value={item.slotTime} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleSlotsShowModal = () => {
    slotRef?.current?.showModal();
  };
  const handleSlotsHideModal = () => {
    slotRef?.current?.hideModal();
  };
  const handleConfirmShowModal = () => {
    CancelConfirmRef?.current?.showModal();
  };
  const handleConfirmHideModal = () => {
    CancelConfirmRef?.current?.hideModal();
  };

  let ReasonsCancel = [
    "Service no longer required",
    "Professional not assigned",
    "Placed the request by mistake",
    "Bokking address is incorrect",
    "Hired someone else ",
  ];

  let services = bookingData?.cart || [];

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const MakeCall = (number) => {
    RNImmediatePhoneCall.immediatePhoneCall(number);
  };

  const extractCommonPcatIds = (dataArray) => {
    const commonPcatIds = new Set();
    dataArray.forEach((item) => {
      if (item?.PCatId && item?.PCatId !== undefined) {
        commonPcatIds.add(item?.PCatId);
      }
    });
    return Array.from(commonPcatIds);
  };
  const commonPcatIds = extractCommonPcatIds(services);

  const GetOtherCharges = useFetch({
    endpoint: Endpoints.OtherCharges,
    Token: false,
    body: {
      Pcat: commonPcatIds,
    },
  });

  const getCharges = async () => {
    try {
      let Charges = await GetOtherCharges.fetchPromise();
      setChargesData(Charges?.Data);
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    if (item) {
      // getCharges();
      setChargesData(item?.otherCharges);
    }
  }, [item]);

  const extractAndSplitLogs = (logs) => {
    return logs?.map((log) => {
      // Remove the "LOG  service names " part
      let trimmedLog = log.replace("LOG  service names ", "");
      // Split into parts before and after the colon
      let parts = trimmedLog.split(" : ");
      return {
        beforeColon: parts[0],
        afterColon: parts[1],
      };
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CustomRow
        v_center
        ratios={[0, 0, 1]}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: "white",
        }}
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
          style={{
            textAlign: "left",
          }}
          size={15}
          medium
          value={bookingData?.cart[0]?.PCGId?.PCGName}
        />
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Routes.ContactUsScreen);
          }}
        >
          <CustomText size={15} medium align={"right"} value={"Help"} />
        </TouchableOpacity>
      </CustomRow>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        {bookingData?.jobStatus >= 1 && bookingData?.jobStatus <= 6 ? (
          <CustomCard>
            <CustomHeading heading={"Order Id: " + bookingData?.jobId} />

            <CustomRow
              style={{
                marginTop: 10,
                marginHorizontal: 10,
              }}
              ratios={[0, 1]}
            >
              <CustomRow v_center>
                <CustomImage
                  src={{
                    uri:
                      Endpoints.baseUrl +
                      bookingData?.jobAssignSProviderId?.ProfilePhoto,
                  }}
                  resizeMode={"center"}
                  size={50}
                  round
                />
                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <CustomText
                    color={Theme.PrimaryColor}
                    medium
                    value={"Assigned Expert"}
                  />
                  <CustomText
                    value={bookingData?.jobAssignSProviderId?.Name}
                    medium
                    color={Theme.Black}
                  />
                </View>
              </CustomRow>
              <TouchableOpacity
                onPress={() => {
                  MakeCall("9711751777");
                }}
                style={{
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  backgroundColor: "#EEEEEE",
                  alignSelf: "flex-end",
                  padding: 8,
                  borderRadius: 40,
                }}
              >
                <CustomIcon
                  name={"call"}
                  type={"ION"}
                  color={Theme.PrimaryColor}
                  size={20}
                />
              </TouchableOpacity>
            </CustomRow>
          </CustomCard>
        ) : null}

        {[0, 7, 9, 10, 11, 12].includes(bookingData?.jobStatus) && (
          <CustomCard>
            <CustomHeading heading={"Order ID: " + bookingData?.jobId} />
            {bookingData?.jobStatus >= 9 && bookingData?.jobStatus <= 12 ? (
              <CustomText
                bold
                color={"red"}
                size={15}
                value={"Booking Cancelled"}
                margin_h={5}
              />
            ) : null}

            {bookingData?.jobStatus == 0 && (
              <CustomText
                bold
                color={Theme.PrimaryColor}
                size={15}
                value={"Booking Accepted"}
                margin_h={5}
              />
            )}
            {bookingData?.jobStatus == 7 && (
              <CustomText
                bold
                color={"green"}
                size={15}
                value={"Booking Closed"}
                margin_h={5}
              />
            )}
            <View style={{ marginHorizontal: 5 }}>
              <CustomRow ratios={[0, 1, 0]}>
                {bookingData?.jobStatus == 0 ? (
                  <View
                    style={{
                      width: "85%",
                    }}
                  >
                    <CustomText
                      size={14}
                      medium
                      value={"Expert is not assigned yet"}
                    />
                    <CustomText
                      size={12}
                      regular
                      value={
                        "An expert will be assigned before 60 min of schedule time"
                      }
                    />
                  </View>
                ) : null}

                {bookingData?.jobStatus >= 9 && bookingData?.jobStatus <= 12 ? (
                  <View>
                    <CustomText medium value={"Booking has been Cancelled"} />
                    <CustomText
                      regular
                      value={
                        "For more details please  \ncontact on : +91 9711751777"
                      }
                    />
                  </View>
                ) : null}

                {bookingData?.jobStatus == 7 ? (
                  <View>
                    <CustomText medium value={"Booking has been Closed"} />
                    <CustomText
                      regular
                      value={"Thanks For Choosing Us Please book again"}
                    />
                  </View>
                ) : null}

                <CustomImage
                  src={Assets.search}
                  size={30}
                  round
                  resizeMode={"contain"}
                />
              </CustomRow>
            </View>
          </CustomCard>
        )}

        <CustomCard>
          <CustomHeading heading={"Booking Details"} />
          <View
            style={{
              marginBottom: 10,
            }}
          >
            {services.map((item, inde) => {
              let PackageServicesListData = extractAndSplitLogs(
                (item?.packageName?.length > 0 && item?.packageName) || []
              );
              return (
                <CustomRow
                  ratios={[1, 0]}
                  style={{
                    marginHorizontal: 10,
                    marginTop: 6,
                  }}
                >
                  <View>
                    <CustomText
                      size={12}
                      bold
                      value={item?.packageTitle + " X " + item?.Quantity}
                    />
                    {PackageServicesListData?.length > 0 &&
                      PackageServicesListData?.map((item, index) => {
                        return (
                          <CustomRow
                            style={{
                              marginLeft: 15,
                            }}
                          >
                            <CustomText
                              size={12}
                              style={{
                                fontWeight: "600",
                                marginBottom: 5,
                              }}
                              color={Theme.Black}
                              value={"\u2022 "}
                            />
                            <Text
                              style={{
                                fontWeight: "600",
                                marginBottom: 5,
                                color: Theme.Black,
                                fontSize: 12,
                              }}
                            >
                              {item?.beforeColon + " : "}

                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Theme.Black,
                                  fontWeight: "400",
                                }}
                              >
                                {item?.afterColon}
                              </Text>
                            </Text>
                          </CustomRow>
                        );
                      })}
                  </View>

                  <CustomText value={"₹" + item?.Amount} regular />
                </CustomRow>
              );
            })}
          </View>

          <CustomRow
            style={{
              marginHorizontal: 10,
            }}
            ratios={[1, 0]}
          >
            <CustomText value={"Subtotal"} color={Theme.Black} bold />
            <CustomText
              style={{
                textDecorationLine: "line-through",
                marginRight: 10,
              }}
              value={"₹" + bookingData?.RPrice}
              color={Theme.Black}
              regular
            />
            <CustomText
              bold
              value={"₹" + bookingData?.SPrice}
              color={Theme.Black}
              regular
            />
          </CustomRow>
          {parseInt(bookingData?.tip) > 0 && (
            <CustomRow
              ratios={[0, 1, 0]}
              v_center
              style={{
                // marginTop: 10,
                marginHorizontal: 10,
                marginBottom: -10,
              }}
            >
              <CustomText medium size={23} value={"\u2022"} />
              <CustomText
                medium
                margin_h={10}
                size={12}
                color={"#757575"}
                value={"Tip For Service Provider"}
              />

              <CustomText
                color={"#757575"}
                regular
                size={12}
                value={"₹" + bookingData?.tip}
              />
            </CustomRow>
          )}

          {parseInt(bookingData?.concession) > 0 && (
            <CustomRow
              ratios={[0, 1, 0]}
              style={{
                // marginTop: 10,
                marginHorizontal: 10,
                marginBottom: -10,
              }}
              v_center
            >
              <CustomText medium size={23} value={"\u2022"} />
              <CustomText
                medium
                margin_h={10}
                size={12}
                color={"#757575"}
                value={"Concession "}
              />

              <CustomText
                color={"red"}
                size={12}
                regular
                value={"- ₹" + bookingData?.concession}
              />
            </CustomRow>
          )}

          {ChargesData
            ? ChargesData.map((item, index) => {
                return (
                  <CustomRow
                    ratios={[0, 1, 0]}
                    v_center
                    style={{
                      // marginTop: 10,
                      marginHorizontal: 10,
                      marginBottom: -10,
                    }}
                  >
                    <CustomText medium size={23} value={"\u2022"} />
                    <CustomText
                      size={12}
                      medium
                      margin_h={10}
                      value={item?.charge}
                      color={"#757575"}
                    />

                    <CustomText
                      color={"#757575"}
                      regular
                      size={12}
                      value={"₹" + parseInt(item?.price)}
                    />
                  </CustomRow>
                );
              })
            : null}
          {bookingData?.surgeCharges > 0 && (
            <CustomRow
              ratios={[0, 1, 0]}
              style={{
                marginHorizontal: 10,
                marginBottom: -10,
              }}
              v_center
            >
              <CustomText medium size={23} value={"\u2022"} />
              <CustomText
                color={"#757575"}
                size={12}
                medium
                margin_h={10}
                value={"SURG Charges"}
              />

              <CustomText
                color={"#757575"}
                regular
                size={12}
                value={"₹" + bookingData?.surgeCharges}
              />
            </CustomRow>
          )}
          {bookingData?.couponDiscount > 0 && (
            <CustomRow
              ratios={[0, 1, 0]}
              style={{
                marginHorizontal: 10,
                marginBottom: -10,
              }}
              v_center
            >
              <CustomText medium size={23} value={"\u2022"} />
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <CustomText
                  color={"#757575"}
                  size={12}
                  medium
                  margin_h={10}
                  value={"Coupon Discount :"}
                />
                <CustomText
                  color={"red"}
                  size={12}
                  medium
                  value={"(" + bookingData?.couponCode + ")"}
                />
              </View>

              <CustomText
                // color={'#757575'}
                color={"red"}
                regular
                value={" - " + "₹" + bookingData?.couponDiscount}
              />
            </CustomRow>
          )}

          <View
            style={{
              borderTopWidth: 1,
              borderStyle: "dashed",
              borderColor: "grey",
              marginTop: 10,
              marginHorizontal: 10,
            }}
          />
          <CustomRow
            ratios={[1, 0]}
            style={{
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <CustomText size={13} color={Theme.Black} bold value={"Total"} />
            <CustomText
              color={Theme.Black}
              bold
              value={"₹" + bookingData?.payableCharges}
            />
          </CustomRow>
        </CustomCard>

        <CustomCard>
          <CustomHeading heading={"Address"} />
          <CustomRow
            style={{
              marginLeft: 10,
              gap: 5,
            }}
            v_center
          >
            <CustomIcon
              name={"location-pin"}
              color={Theme.PrimaryColor}
              size={14}
              type={"ENT"}
            />
            <View
              style={{
                width: "98%",
              }}
            >
              <CustomText
                value={bookingData?.clientAddress?.SaveAs}
                color={Theme.Black}
                bold
              />
              <CustomText
                regular
                value={
                  bookingData?.clientAddress?.houseOrFlatNo +
                  "," +
                  bookingData?.clientAddress?.buildingName +
                  "," +
                  bookingData?.clientAddress?.landmark +
                  ", " +
                  bookingData?.clientAddress?.FullAddress
                }
              />
            </View>
          </CustomRow>
        </CustomCard>
        <CustomCard>
          <CustomHeading heading={"Timing"} />
          <CustomRow
            style={{
              marginLeft: 10,
            }}
            v_center
          >
            <CustomIcon
              name={"clockcircleo"}
              type={"AN"}
              color={Theme.PrimaryColor}
              size={14}
            />
            <CustomText
              margin_h={10}
              regular
              value={
                bookingData?.slotDate.slice(0, 10) +
                " (" +
                bookingData?.slotTime +
                ")" +
                " - " +
                bookingData?.TServiceTiming +
                " Mins"
              }
            />
          </CustomRow>
        </CustomCard>
        <CustomCard>
          <CustomHeading heading={"Note"} />
          <View
            style={{
              marginHorizontal: 10,
              flex: 1,
            }}
          >
            <CustomRow ratios={[0, 1]} v_center>
              <CustomText
                style={{
                  marginRight: 10,
                }}
                value={"\u2B24"}
              />
              <CustomText
                // margin_v={5}
                value={"Slot time (30 min) is arrival time of experts."}
              />
            </CustomRow>
            <CustomRow ratios={[0, 1]}>
              <CustomText
                style={{
                  marginRight: 10,
                }}
                value={"\u2B24"}
              />

              <CustomText
                // margin_v={5}
                value={
                  "As part of our safety protocol ,our experts will be working until 7pm. any services remaining will be scheduled for the next day"
                }
              />
            </CustomRow>
          </View>
        </CustomCard>
        {bookingData?.Note && (
          <CustomCard>
            <CustomHeading heading={"Suggestion"} />
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <CustomText margin_v={5} value={bookingData?.Note} />
            </View>
          </CustomCard>
        )}
      </ScrollView>
      {bookingData?.jobStatus != 9 &&
      bookingData?.jobStatus != 10 &&
      bookingData?.jobStatus != 11 &&
      bookingData?.jobStatus != 12 ? (
        <View>
          <CustomCard
            style={{
              position: "absolute",
              bottom: -11,
              width: "100%",
              paddingBottom: 30,
              backgroundColor: "white",
            }}
          >
            <CustomRow
              ratios={[1, 1]}
              spacing={20}
              v_center
              style={{
                marginHorizontal: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handleSlotsShowModal();
                  setcancelActive(false);
                  setSelectSlot(null);
                  setselectedSlotData(null);
                }}
                style={{
                  backgroundColor: Theme.PrimaryColor,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 15,
                }}
              >
                <CustomText color={"white"} bold value={"Reschedule"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setcancelActive(true);
                  handleSlotsShowModal();
                }}
                style={{
                  backgroundColor: Theme.PrimaryColor,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  borderRadius: 15,
                }}
              >
                <CustomText bold color={"white"} value={"Cancel Job"} />
              </TouchableOpacity>
            </CustomRow>
          </CustomCard>
        </View>
      ) : null}

      <AnimatedModal ref={slotRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "white",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              paddingBottom: 40,
            }}
          >
            <View>
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 10,
                }}
              >
                <CustomRow
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                    borderStyle: "dashed",
                    borderColor: "#E3E3E3",
                  }}
                  ratios={[1, 0.3]}
                >
                  <TouchableOpacity>
                    <CustomRow v_center>
                      <CustomIcon
                        name={"home"}
                        type={"AN"}
                        size={20}
                        color={Theme.PrimaryColor}
                      />
                      <CustomText />
                      <CustomText
                        numberOfLines={1}
                        margin_h={10}
                        value={
                          bookingData?.clientAddress?.houseOrFlatNo +
                          "," +
                          bookingData?.clientAddress?.buildingName +
                          bookingData?.clientAddress?.FullAddress
                        }
                        regular
                        size={13}
                      />
                      <TouchableOpacity>
                        <CustomIcon
                          size={10}
                          name={"right"}
                          type={"AN"}
                          color={Theme.PrimaryColor}
                        />
                      </TouchableOpacity>
                    </CustomRow>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleSlotsHideModal();
                      setcancelActive(false);
                    }}
                    style={{
                      alignSelf: "flex-end",
                    }}
                  >
                    <CustomIcon
                      name={"cross"}
                      size={25}
                      type={"ENT"}
                      color={Theme.PrimaryColor}
                    />
                  </TouchableOpacity>
                </CustomRow>
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <CustomText
                    medium
                    color={Theme.Black}
                    value={"Select service date and time"}
                  />
                  <CustomText
                    regular
                    color={Theme.Black}
                    size={13}
                    value={
                      "Your service will take approx. " +
                      bookingData?.TServiceTiming +
                      " mins"
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <CustomCard>
                  <CustomRow
                    v_center
                    style={{
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomIcon name={"calendar"} type={"AN"} size={14} />
                    <CustomText
                      size={14}
                      medium
                      value={" Select service date"}
                    />
                  </CustomRow>
                  <CustomRow
                    style={{
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                      borderStyle: "dashed",
                      borderColor: "grey",
                      marginHorizontal: 10,
                    }}
                  >
                    <DateContent
                      dates={AppointmentsData}
                      onDatePress={handleDatePress}
                    />
                  </CustomRow>

                  <CustomRow
                    v_center
                    style={{
                      marginTop: 20,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomIcon size={18} name={"clockcircleo"} type={"AN"} />
                    <CustomText
                      medium
                      size={14}
                      value={" Select service time slot"}
                    />
                  </CustomRow>

                  <View
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <SlotComponent slots={updatedData} />
                  </View>
                </CustomCard>
                <CustomCard>
                  <CustomHeading heading={"Note:-"} />
                  <View
                    style={{
                      marginHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    <CustomRow ratios={[0, 1]} v_center>
                      <CustomText
                        style={{
                          marginRight: 10,
                        }}
                        value={"\u2B24"}
                      />
                      <CustomText
                        // margin_v={5}
                        value={"Slot time (30 min) is arrival time of experts."}
                      />
                    </CustomRow>
                    <CustomRow ratios={[0, 1]}>
                      <CustomText
                        style={{
                          marginRight: 10,
                        }}
                        value={"\u2B24"}
                      />

                      <CustomText
                        value={
                          "As part of our safety protocol ,our experts will be working until 7pm. any services remaining will be scheduled for the next day"
                        }
                      />
                    </CustomRow>
                  </View>
                </CustomCard>
              </View>
            </View>
          </ScrollView>
          {cancelActive ? (
            <CustomRow
              h_center
              ratios={[1, 1]}
              style={{
                paddingLeft: 10,
              }}
            >
              <CustomButton
                onPress={() => {
                  if (selectedSlotData) {
                    fetchData();
                  } else {
                    showMessage({
                      message: "Please  Select Your Slot",
                      icon: "danger",
                      type: "danger",
                      position: "top",
                    });
                  }
                }}
                style={{
                  backgroundColor: selectedSlotData
                    ? Theme.PrimaryColor
                    : "grey",
                }}
                title={
                  isLoading ? <Loader color={"white"} size={13} /> : "Reshedule"
                }
              />

              <CustomButton
                onPress={() => {
                  handleSlotsHideModal();
                  handleConfirmShowModal();
                }}
                style={{
                  backgroundColor: Theme.PrimaryColor,
                }}
                title={"Cancel Booking"}
                width={"90%"}
              />
            </CustomRow>
          ) : (
            <CustomButton
              width={"90%"}
              onPress={() => {
                if (selectedSlotData) {
                  fetchData();
                } else {
                  showMessage({
                    message: "Please  Select Your Slot",
                    icon: "danger",
                    type: "danger",
                    position: "top",
                  });
                }
              }}
              style={{
                backgroundColor: selectedSlotData ? Theme.PrimaryColor : "grey",
              }}
              title={
                isLoading ? <Loader color={"white"} size={13} /> : "Reshedule"
              }
            />
          )}
        </View>
      </AnimatedModal>

      <AnimatedModal ref={CancelConfirmRef}>
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,

            position: "absolute",
            bottom: -10,
            width: "100%",
            maxHeight: Dimensions.get("screen").height - 100,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <CustomHeading
            style={{
              marginTop: 10,
              marginLeft: 10,
            }}
            heading={"Cancellation Reason"}
          />
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 10,
            }}
          >
            {ReasonsCancel.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setselectedReason(item);
                  }}
                >
                  <CustomRow
                    v_center
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <CustomIcon
                      name={
                        selectedReason == item
                          ? "circle-slice-8"
                          : "circle-outline"
                      }
                      type={"MC"}
                      size={18}
                      color={"black"}
                    />
                    <CustomText margin_h={10} regular size={15} value={item} />
                  </CustomRow>
                </TouchableOpacity>
              );
            })}
          </View>

          <CustomButton
            onPress={() => {
              if (!selectedReason) {
                return;
              } else {
                FetchCancel();
              }
            }}
            style={{
              backgroundColor: selectedReason ? Theme.PrimaryColor : "grey",
            }}
            title={"Cancel Booking"}
            width={"90%"}
          />
        </View>
      </AnimatedModal>
    </SafeAreaView>
  );
};
