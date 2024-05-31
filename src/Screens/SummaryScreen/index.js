import Assets from "Assets";
import CustomButton from "Components/CustomButton";
import CustomCard from "Components/CustomCard";
import CustomHeader from "Components/CustomHeader";
import CustomHeading from "Components/CustomHeading";
import CustomImage from "Components/CustomImage";
import CustomInput from "Components/CustomInput";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";

import Theme from "Configs/Theme";
import { useState, useEffect } from "react";
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as React from "react";
import CheckBox from "@react-native-community/checkbox";
import Fonts from "Configs/Fonts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Routes from "RootNavigation/Routes";

import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addSearchadressHistory,
  decreaseItemQuantity,
  increaseItemQuantity,
  saveAddress,
  saveTipForFuture,
} from "ReduxState/Slices/UserSlice";
import CustomIcon from "Components/CustomIcon";
import useFetch from "Hooks/useFetch";
import Endpoints from "Configs/API/Endpoints";
import AnimatedModal from "Components/AnimatedModal";
import moment from "moment";
import GoogleMapsView from "./Components";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Loader from "Components/CustomLoader";
import ToastMessage from "Utils/ToastMessage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Popup from "./Components/Pupup";
import DropDown from "Components/Dropdown";
import FastImage from "react-native-fast-image";

export default function () {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const focused = useIsFocused();

  const scrollCenterRef = useRef(null);
  const EditModalRef = React.useRef();
  const CoupenRef = useRef();
  const slotScrollRef = useRef(null);
  const AdressRef = useRef();
  const AdressSuggestions = useRef();
  const MapModelRef = useRef();
  const EditRef = useRef();
  const MapViewRef = useRef();
  const suggestionsRef = useRef(null);
  const slotRef = useRef();
  const ConfirmSlot = useRef();
  const IBtnRef = useRef();
  const CouponViewDetailsRef = useRef();
  const slotDateScrollRef = useRef(null);

  const CoupenApplyRef = useRef();
  const user_info = useSelector((v) => v.user);
  const user_ = useSelector((v) => v.user.userInfo);
  const [find, setFind] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [note, setNote] = useState();
  const [checked, setChecked] = useState(false);
  const [selectedTip, setSelectedTip] = useState(
    user_info?.saveTipForFuture ? user_info?.saveTipForFuture : 0
  );
  const [isCustom, setIsCustom] = useState(false);
  const [home, setHome] = useState(0);
  const [iBtnData, setIBtnData] = useState();
  const [coupenDetails, setCoupenDetails] = useState();
  const [currentAddress, setCurrentAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectSlot, setSelectSlot] = useState(null);
  const [AddressSlot, setAddressSlot] = useState(false);
  const [SuggestedAddress, setSuggestedAddress] = useState("");
  const [longitude, setLongitude] = useState(user_info?.currentLocation[0]);
  const [latitude, setLatitude] = useState(user_info?.currentLocation[1]);
  const [landmark, setLandmark] = useState("");
  const [adressEdit, setadressEdit] = useState(false);
  const [house, setHouse] = useState(
    editAddress?.houseOrFlatNo ? editAddress?.houseOrFlatNo : ""
  );
  const [apartment, setApartment] = useState("");
  const [usersAddreses, setusersAddreses] = useState();
  const [AppointmentsData, setAppointmentsData] = useState("");
  const [selectedAddress, setselectedAddress] = useState(null);
  const [editAddress, setEditAddress] = useState([]);
  const [ChargesData, setChargesData] = useState();
  const [selectedSlotData, setselectedSlotData] = useState("");
  const [selectedCoupen, setselectedCoupen] = useState(null);
  const [coupenListData, setcoupenListData] = useState();
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const scrollToCenter = (index) => {
    if (slotDateScrollRef?.current) {
      const scrollViewWidth =
        slotDateScrollRef?.current.width || Dimensions.get("window").width;
      const itemWidth = 70;
      const scrollToX = index * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
      slotDateScrollRef?.current.scrollTo({ x: scrollToX, animated: true });
    }
  };

  let addressofHistory = user_info?.historyofadress;

  console.log("selectedAddress", selectedAddress);

  useEffect(() => {
    if (isAnimating) {
      animateProgress();
    }
  }, [isAnimating]);
  const animateProgress = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => {
      // Animation completion callback
      setIsAnimating(false); // Reset animation state
      handleCouponApplyHideModel();
      progress.setValue(0);

      // handleAnimationComplete(); // Call function after animation completes
    });
  };
  let deleteAdr = editAddress?._id;

  const {
    response: responsee,
    fetchData: DeleteAdress,
    errorr,
  } = useFetch({
    endpoint: Endpoints.deleteAddress + deleteAdr,

    method: "DELETE",
  });

  useEffect(() => {
    if (responsee) {
      ToastMessage.Success("Address deleted succesfully");
      getDetails();
    }
  }, [responsee]);

  let cAddress = currentAddress ? currentAddress : " ";
  let cart = user_info?.cart;

  const User_data = useFetch({
    endpoint: Endpoints.getUserDetails + user_?.user?._id,
  });

  const calculateTotalServiceTime = () => {
    let totalMinutes = 0;

    cart?.forEach((service) => {
      const timeInMinutes =
        parseInt(service?.packageTotalTime) * parseInt(service?.quantity);

      // Add the time to totalMinutes
      totalMinutes += timeInMinutes;
    });

    // Convert totalMinutes to hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes;

    return { hours, minutes };
  };

  const totalServiceTimeInHours = calculateTotalServiceTime();

  useEffect(() => {
    if (user_info?.saveTipForFuture > 0) {
      setChecked(true);
    }
  }, [user_info]);

  const getDetails = async () => {
    try {
      let details = await User_data.fetchPromise();
      console.log("details of address", details?.data?.address.length);

      setusersAddreses(details.data.address);
      setselectedAddress(details.data.address[0]);
    } catch (e) {
      console.log("err", e);
    }
  };

  const handleSavedAddressShowModal = () => {
    AdressRef?.current?.showModal();
  };
  const handleSavedAddressHideModal = () => {
    AdressRef?.current?.hideModal();
  };
  const handleEdittShowModal = () => {
    EditModalRef?.current?.showModal();
  };
  const handleEdittHideModal = () => {
    EditModalRef?.current?.hideModal();
  };

  const handleAdressSuggestionShowModal = () => {
    AdressSuggestions?.current?.showModal();
  };
  const handleAdressSuggestionHideModal = () => {
    AdressSuggestions?.current?.hideModal();
  };
  const handleMapShowModal = () => {
    MapModelRef?.current?.showModal();
  };
  const handleHideModal = () => {
    AdressRef?.current?.hideModal();
  };
  const handleMapHideModal = () => {
    MapModelRef?.current?.hideModal();
  };

  const handleSlotsShowModal = () => {
    slotRef?.current?.showModal();
  };
  const handleSlotsHideModal = () => {
    slotRef?.current?.hideModal();
  };

  const handleConfirmSlotShowModal = () => {
    ConfirmSlot?.current?.showModal();
  };

  const handleConfirmSlotHideModal = () => {
    ConfirmSlot?.current?.hideModal();
  };

  const handleCoupenViewDetailModal = () => {
    CouponViewDetailsRef.current.showModal();
  };

  const handleCoupenViewDetailHideModal = () => {
    CouponViewDetailsRef.current.hideModal();
  };

  const extractCommonPcatIds = (dataArray) => {
    const commonPcatIds = new Set();
    dataArray.forEach((item) => {
      if (item?.pcatId && item?.pcatId !== undefined) {
        commonPcatIds.add(item?.pcatId);
      }
    });
    return Array.from(commonPcatIds); // Convert set to array for easier manipulation
  };

  console.log("selectedAddress", selectedAddress);
  const commonPcatIds = extractCommonPcatIds(user_info?.cart);

  const GetOtherCharges = useFetch({
    endpoint: Endpoints.OtherCharges,
    Token: false,
    body: {
      Pcat: commonPcatIds,
    },
  });
  const GetAppointments = useFetch({
    endpoint: Endpoints.GetAppointments,
    Token: false,
  });

  const GetAppoinmentData = async () => {
    try {
      let appointments = await GetAppointments.fetchPromise();

      setAppointmentsData(appointments?.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  // const getHighestValueCharges = (data) => {
  //   const chargesMap = {};

  //   data.forEach((charge) => {
  //     const { ChargesName, ChargesValue } = charge;
  //     if (
  //       !chargesMap[ChargesName] ||
  //       chargesMap[ChargesName].ChargesValue < ChargesValue
  //     ) {
  //       chargesMap[ChargesName] = charge;
  //     }
  //   });

  //   return Object.values(chargesMap);
  // };

  const getCharges = async () => {
    try {
      let Charges = await GetOtherCharges.fetchPromise();
      setChargesData(Charges?.Data);
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    if (focused) {
      getDetails();
      GetAppoinmentData();
      getCharges();
      setselectedCoupen(null);

      if (commonPcatIds) {
        getCharges();
      }
    }
  }, [focused]);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      getAddressFromCoordinates();
    }
  }, [latitude, longitude]);

  const getAddressFromCoordinates = () => {
    console.log("call hua");
    console.log("latitude", latitude);
    console.log("longitude", longitude);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data aya ", data);
        if (data.status === "OK") {
          const address = data.results[0].formatted_address;
          console.log(address, "adress");
          setFind(true);
          setCurrentAddress(address);
        } else {
          console.warn("Address not found");
        }
      })
      .catch((error) => {
        console.warn("Error getting address:", error);
      });
  };

  const QuantityControl = ({ quantities, onIncrease, onDecrease }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Theme.PrimaryLight,

          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          borderRadius: 5,
          width: 70,
          height: 27,
          borderColor: Theme.PrimaryColor,
          borderWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            width: 25,

            alignItems: "center",
            paddingVertical: 7,
          }}
          onPress={onDecrease}
        >
          <CustomIcon
            name={"minus"}
            type={"FA5"}
            color={Theme.PrimaryColor}
            size={11}
          />
        </TouchableOpacity>
        <CustomText size={13} medium value={quantities} />
        <TouchableOpacity
          style={{
            paddingVertical: 7,
            width: 25,
          }}
          onPress={onIncrease}
        >
          <CustomIcon
            name={"plus"}
            type={"FA5"}
            color={Theme.PrimaryColor}
            size={11}
            // style={{marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const sumRegulerPrice = user_info?.cart.reduce(
    (total, item) =>
      total + parseInt(item?.packageRegulerPrice) * item?.quantity,
    0
  );

  const sumTotalPrice = user_info?.cart.reduce(
    (total, item) => total + parseInt(item?.packagetotalPrice * item?.quantity),
    0
  );
  let totalAfterCharges =
    sumTotalPrice + parseInt(selectedSlotData?.surgCharges);
  const TotalSavedItemsCart = sumRegulerPrice - sumTotalPrice;

  const handleTipSelection = (tip) => {
    if (selectedTip === tip) {
      setSelectedTip(0); // Deselect the tip if it's already selected
      setIsCustom(true); // Set isCustom to true when deselecting
    } else {
      setSelectedTip(tip); // Select the tip if it's not selected
      setIsCustom(false); // Set isCustom to false when selecting a tip
    }
  };

  const Coupon = ({
    title,
    desc,
    code,
    additionalAmountNeeded,
    afterDiscount,
    capping,
    itemm,
  }) => {
    return (
      <CustomCard
        style={{
          paddingBottom: 0,
          backgroundColor: "white",
        }}
      >
        <CustomRow
          style={{
            paddingHorizontal: 10,
          }}
          ratios={[0, 1]}
          v_center
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 8,
              backgroundColor: "#EEEEEE",
              padding: 5,
              borderStyle: "dashed",
            }}
          >
            <CustomText
              margin_h={10}
              medium
              color={"black"}
              size={12}
              value={code}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setCoupenDetails(itemm);
              handleCoupenViewDetailModal();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-end",
            }}
          >
            <CustomText bold color={Theme.Black} value={"View details"} />
          </TouchableOpacity>
        </CustomRow>

        <View
          style={{
            marginHorizontal: 5,
            marginTop: 10,
          }}
        >
          <CustomText
            margin_h={5}
            bold
            size={17}
            value={title}
            color={"black"}
          />
        </View>

        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <CustomText value={desc} regular />
        </View>

        {additionalAmountNeeded < 1 ? (
          <View
            style={{
              // backgroundColor: 'grey',
              paddingVertical: 3,
              // alignItems: 'center',
              justifyContent: "center",
              // borderTopLeftRadius: 10,
              // borderTopRightRadius: 10,
              paddingLeft: 10,
              // marginTop: 10,
              marginVertical: 5,
            }}
          >
            <CustomText
              regular
              color={"green"}
              value={
                capping == true
                  ? `you will save upto ₹${afterDiscount} with this coupon`
                  : `you will save flat ₹${afterDiscount} with this coupon`
              }
            />
          </View>
        ) : (
          <View
            style={{
              // backgroundColor: 'grey',
              paddingVertical: 3,
              // alignItems: 'center',
              justifyContent: "center",
              // borderTopLeftRadius: 10,
              // borderTopRightRadius: 10,
              paddingLeft: 10,
              // marginTop: 10,
              marginVertical: 5,
            }}
          >
            <CustomText
              regular
              color={"red"}
              value={`Add items worth ₹ ${additionalAmountNeeded} more to unlock.`}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (additionalAmountNeeded <= 0) {
              setselectedCoupen({
                discountValue: afterDiscount,
                code: itemm?.couponCode,
              });
              handleCoupenHideModal();
              handleCouponApplyShowModel();
              setIsAnimating(true);
            } else {
              return;
            }
          }}
          style={{
            backgroundColor:
              additionalAmountNeeded <= 0 ? Theme.PrimaryColor : "grey",
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        >
          <CustomText bold size={15} color={"white"} value={"APPLY NOW"} />
        </TouchableOpacity>
      </CustomCard>
    );
  };

  const ShowAddressSlotModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={AddressSlot}
        onRequestClose={() => {
          setAddressSlot(!AddressSlot);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              marginTop: "160%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: "white",
              paddingBottom: 40,
            }}
          >
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 10,
              }}
            >
              <CustomRow
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "grey",
                }}
                ratios={[0, 1]}
                v_center
                h_center
              >
                <CustomImage
                  src={Assets.homegrey}
                  resizeMode={"center"}
                  size={20}
                />
                <CustomText
                  margin_h={10}
                  value={"Home - Sector 9, Vijay Nager"}
                />
                <CustomImage
                  src={Assets.pencilgrey}
                  size={20}
                  resizeMode={"center"}
                />
              </CustomRow>
              <CustomRow
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "grey",
                }}
                ratios={[0, 1]}
                v_center
                h_center
              >
                <CustomImage
                  src={Assets.clockgrey}
                  resizeMode={"center"}
                  size={20}
                />
                <CustomText margin_h={10} value={"Fri, May 05 - 03:30 Pm"} />
                <CustomImage
                  // style={{
                  //   position: "absolute",
                  //   right: 0,
                  // }}
                  src={Assets.pencilgrey}
                  size={20}
                  resizeMode={"center"}
                />
              </CustomRow>
              <CustomButton
                style={{
                  marginTop: 30,
                }}
                title={"Proceed To Pay"}
                onPress={() => {
                  setAddressSlot(false);
                  Navigation.navigate(Routes.PaymentScreen, {
                    sumRegulerPrice: sumRegulerPrice,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const handleInputChange = (text) => {
    // Check if the input is not empty
    if (text.trim() !== "") {
      // If not empty, parse the input and update selectedTip
      setSelectedTip(parseInt(text));
    } else {
      // If empty, set selectedTip to 0 or any other default value
      setSelectedTip(0);
    }
  };

  let totalOtherCharges = 0;
  ChargesData?.forEach((item) => {
    totalOtherCharges += parseInt(item.ChargesValue);
  });

  let paymentAfterCharges =
    parseInt(totalOtherCharges) +
    parseInt(sumTotalPrice) +
    parseInt(selectedSlotData?.surgCharges ? selectedSlotData?.surgCharges : 0);

  let paymentAfterTip = paymentAfterCharges + parseInt(selectedTip);

  let PaymentAfterCoupen =
    parseInt(paymentAfterCharges) -
    parseInt(selectedCoupen ? selectedCoupen?.discountValue : 0) +
    parseInt(selectedTip);

  const handleDatePress = (date) => {
    setSelectedDate(date.slotDate);
    setSelectSlot(null);
  };

  const slotsToShoww = selectedDate
    ? AppointmentsData?.find((item) => item.slotDate === selectedDate)?.slot ||
      []
    : [];

  let slotsToShow = slotsToShoww?.sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.slotTime.split("-")[0]}`);
    const timeB = new Date(`1970/01/01 ${b.slotTime.split("-")[0]}`);
    return timeA - timeB;
  });

  console.log("slotstoshow", slotsToShow);

  useEffect(() => {
    if (AppointmentsData.length > 0) {
      setSelectedDate(AppointmentsData[0].slotDate);
    }
  }, [AppointmentsData]);
  // const scrollToCenter = index => {
  //   if (slotDateScrollRef.current) {
  //     const scrollViewWidth =
  //       slotDateScrollRef.current.props.data.length * 120; // Adjust 120 according to your item width
  //     const itemWidth = 100; // Adjust this according to your item width
  //     const scrollToX =
  //       index * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
  //     slotDateScrollRef.current.scrollToOffset({
  //       offset: scrollToX,
  //       animated: true,
  //     });
  //   }
  // };

  const handleDatePresss = (item, index) => {
    setSelectedDate(item.slotDate);
    setSelectSlot(null);
    setselectedSlotData("");
    scrollToCenter(index);
  };

  const DateContent = ({ dates }) => {
    const slotDateScrollRef = useRef(null);

    const scrollToCenter = (index) => {
      if (slotDateScrollRef.current) {
        const scrollViewWidth =
          slotDateScrollRef.current.width || Dimensions.get("window").width;
        const itemWidth = 70;
        const scrollToX =
          index * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
        slotDateScrollRef.current.scrollTo({ x: scrollToX, animated: true });
      }
    };

    const handleDatePress = React.useCallback(
      (item, index) => {
        scrollToCenter(index);

        setSelectedDate(item.slotDate);
        setSelectSlot(null);
        setselectedSlotData("");
      },
      [scrollToCenter, setSelectedDate, setSelectSlot, setselectedSlotData]
    );

    return (
      <ScrollView
        ref={slotDateScrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {dates.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleDatePress(item, index)}
            style={{
              marginHorizontal: 10,
              width: 70,
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
        ))}
      </ScrollView>
    );
  };

  const MemoizedDateContent = React.memo(DateContent);

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
                // paddingHorizontal: 5,
                borderRadius: 5,
                marginLeft: 10,
                paddingHorizontal: 15,
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
                    left: 47,
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
                    value={"₹ " + item.surgCharges}
                  />
                </View>
              ) : null}
              <CustomText color={"#757575"} value={item.slotTime} />
            </TouchableOpacity>
          );
        })}

        {slots.length == 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 10,
              marginTop: 20,
            }}
          >
            <CustomText
              color={"grey"}
              medium
              align={"center"}
              value={
                "No more slots available for selected date .Please contact to admin  +91 9711751777  "
              }
            />
          </View>
        )}
      </View>
    );
  };

  const region = {
    latitude: latitude, // Latitude of the center of India
    longitude: longitude, // Longitude of the center of India
    latitudeDelta: 0.1, // Decreased value for higher zoom
    longitudeDelta: 0.1, // Decreased value for higher zoom
  };

  let myApiKey = "AIzaSyCBRJgSZT50bFwgbOQHOWdi0giGUEdG3MY";
  console.log("editaadress", editAddress);

  let editData = {
    addressId: deleteAdr,
    location: {
      latitude: latitude,
      longitude: longitude,
    },
    houseOrFlatNo: house,
    buildingName: apartment,
    landmark: landmark ? landmark : "",
    SaveAs: home == 0 ? "home" : "other",
    FullAddress: currentAddress,
  };
  let addData = {
    location: {
      latitude: latitude,
      longitude: longitude,
    },
    houseOrFlatNo: house,
    buildingName: apartment,
    landmark: landmark ? landmark : "",
    SaveAs: home == 0 ? "home" : "other",
    FullAddress: SuggestedAddress || currentAddress,
  };
  const { response, fetchData, isLoading } = useFetch({
    endpoint: editAddress?.FullAddress
      ? Endpoints.editAddressEndpoint + user_?.user?._id
      : Endpoints.AddAddress,
    body: editAddress?.FullAddress ? editData : addData,
    method: "post",
  });

  useEffect(() => {
    if (response) {
      handleResponse();
    }
  }, [response]);

  const handleResponse = () => {
    handleMapHideModal();
    if (editAddress?.FullAddress) {
      getDetails();
      setselectedAddress(response?.data);
      return;
    } else {
      setusersAddreses((prevAddresses) => [response?.data, ...prevAddresses]);
      setselectedAddress(response?.data);
    }
    handleSavedAddressShowModal();
  };

  const handleIBtnShowModal = () => {
    IBtnRef.current.showModal();
  };
  const handleCoupenShowModal = () => {
    CoupenRef.current.showModal();
  };
  const handleCoupenHideModal = () => {
    CoupenRef.current.hideModal();
  };

  const handleIBtnHideModal = () => {
    IBtnRef.current.hideModal();
  };

  const renderOption = (item, index) => {
    return (
      <CustomRow
        onPress={() => {
          item.action();
        }}
        // onPress={()=>{
        //   // scaleValue.value = 200;
        //   // leftValue.value = -100;
        //   // rightValue.value = 300;
        //   // closeModalRef?.current?.closeModal();
        //   setTimeout(()=>{
        //     item.action()
        //   },200);
        // }}
        contStyle={{
          alignItems: "center",
          paddingVertical: 7,
          paddingHorizontal: 10,
          // backgroundColor : 'red'
        }}
      >
        {/* <Image
          source={item.img}
          style={{ width: 15, height: 15 }}
          resizeMode="contain"
        /> */}
        <CustomIcon name={item.img} type={"AN"} size={15} />
        <CustomText value={item.label} Size={12} />
      </CustomRow>
    );
  };

  const cartItems = cart?.map((item) => {
    const commonFields = {
      PCGroup: item?.PCGroup?._id || item.PCGroup,
      PCatId: item?.pcatId || undefined,
      id: item?.id,
      type: item?.type,
      packageTitle: item?.packageTitle,
      packageName: item?.packageName || [],
      Quantity: item?.quantity,
      packageRegulerPrice: parseInt(item.packageRegulerPrice),
      packagetotalPrice: parseInt(item.packagetotalPrice),
      packageTotalTime: parseInt(item.packageTotalTime),
      Amount: parseInt(item.packagetotalPrice) * parseInt(item?.quantity),
    };

    if (item.type === "Editable") {
      commonFields["packageName"] = item.packageName;
    }

    return commonFields;
  });

  let chargesInfo = ChargesData?.map((charge) => ({
    charge: charge.ChargesName,
    price: charge.ChargesValue,
  }));

  useEffect(() => {
    if (cart) {
      getCharges();
    }
  }, [cart]);

  const requestBody = {
    slotDate: selectedDate,
    slotTime: selectedSlotData?.slotTime,
    clientAddressId: selectedAddress?._id,
    TServiceTiming: totalServiceTimeInHours.minutes,
    jobsSource: Platform.OS == "android" ? "Android App" : "IOSApp",
    RPrice: sumRegulerPrice,
    SPrice: sumTotalPrice,
    concession: "0",
    couponCode: selectedCoupen?.code,
    couponDiscount: selectedCoupen?.discountValue,
    surgeCharges: selectedSlotData?.surgCharges,
    cancelCharges: "0",
    payableCharges:
      totalOtherCharges > 0
        ? parseInt(PaymentAfterCoupen)
        : parseInt(sumTotalPrice),
    tip: selectedTip,
    jobPenalty: "0",
    jobStatus: 0,
    Note: note,
    cart: cartItems,
    payment_Mode: "online",
    Status: "pending",
    OtherCharges: chargesInfo,
  };

  let {
    fetchData: fetchOrder,
    response: orderResponse,
    error,
    isLoading: orderLoad,
  } = useFetch({
    endpoint: Endpoints.AddJobs,
    body: requestBody,
  });

  useEffect(() => {
    if (orderResponse) {
      handleOrderResponse();
    }
  }, [orderResponse]);

  let diffrence =
    cart.length > 0 &&
    parseInt(cart[0]?.PCGroup?.MinCartValue) - parseInt(sumTotalPrice);

  let coupengetData = {
    cartvalue: cart[0]?.PCGroup?.MinCartValue,
    cart: cart,
    inUserIDs: user_info?.userInfo?.user?._id,
  };

  const getCoupensList = useFetch({
    endpoint: Endpoints.getCoupen,
    body: coupengetData,
  });

  const getCoupList = async () => {
    try {
      let details = await getCoupensList.fetchPromise();
      setcoupenListData(details.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    if (focused) {
      getCoupList();
    }
  }, [focused]);

  const handleCouponApplyShowModel = () => {
    CoupenApplyRef.current.showModal();
  };
  const handleCouponApplyHideModel = () => {
    CoupenApplyRef.current.hideModal();
  };

  console.log("slotsToShow", slotsToShow);

  const scrollToCenterf = (index) => {
    if (scrollCenterRef?.current) {
      const scrollViewWidth =
        scrollCenterRef?.current.width || Dimensions.get("window").width;
      const itemWidth = 100;
      const scrollToX = 520;
      scrollCenterRef?.current.scrollTo({
        y: scrollToX,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CustomHeader l_type={"back_arrow"} title={"Summary"} />

      {cart.length == 0 ? (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={Assets.emptyCart}
            resizeMode="contain"
            style={{
              flexGrow: 0.3,
              flex: 1,
              // height: 50,
              width: "100%",
              // backgroundColor: 'red',
            }}
          />
          <CustomText
            style={{
              marginTop: 30,
            }}
            size={20}
            medium
            color={Theme.PrimaryColor}
            value={"Your Cart is Empty"}
          />
          <View
            style={{
              width: "50%",
            }}
          >
            <CustomText
              size={15}
              medium
              align={"center"}
              margin_v={10}
              value={"Look like you haven't added any item in your cart "}
            />
          </View>

          <CustomButton
            style={{
              alignSelf: "center",
              width: "90%",
            }}
            onPress={() => {
              Navigation.goBack();
            }}
            title={"Explore Services"}
          />
        </View>
      ) : (
        <>
          <KeyboardAvoidingView behavior={"padding"}>
            <ScrollView
              ref={scrollCenterRef}
              stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
              automaticallyAdjustKeyboardInsets={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="never"
              contentContainerStyle={{
                paddingBottom: 90,
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  backgroundColor: Theme.PrimaryLight,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  paddingVertical: 5,
                }}
              >
                <CustomRow
                  h_center
                  v_center
                  style={{
                    marginHorizontal: 10,
                    alignSelf: "center",
                  }}
                >
                  <CustomText size={12} regular value={"You’re saving total"} />
                  <CustomText
                    size={13}
                    style={{
                      fontFamily: undefined,
                      fontWeight: "700",
                    }}
                    value={" ₹"}
                  />
                  <CustomText size={12} bold value={TotalSavedItemsCart} />
                  <CustomText size={12} regular value={" on  this order!"} />
                  <CustomImage
                    style={{
                      marginLeft: 10,
                    }}
                    src={Assets.coins}
                    size={15}
                  />
                </CustomRow>
              </View>

              <CustomCard>
                <CustomHeading heading={"Service Added"} />

                {user_info?.cart?.map((item, index) => {
                  const totalPrice =
                    item.packagetotalPrice * parseInt(item?.quantity);

                  return (
                    <View
                      style={{
                        marginTop: 5,
                      }}
                      key={index}
                    >
                      <CustomRow
                        h_center
                        v_center
                        style={{
                          marginHorizontal: 10,
                          borderTopWidth: 1,
                          marginTop: 5,
                          paddingVertical: 4,
                          // borderStyle: "",
                          borderTopColor: "#F5F6FB",
                        }}
                        key={index}
                        ratios={[4, 0, 2]}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "90%",
                          }}
                        >
                          <CustomText
                            style={{
                              marginTop: 10,
                            }}
                            size={13}
                            medium
                            value={item.packageTitle}
                            color={"#757575"}
                          />
                          {item?.type != "Service" ? (
                            <CustomImage
                              onPress={() => {
                                setIBtnData(item);
                                handleIBtnShowModal();
                              }}
                              style={{
                                marginTop: 9,
                                marginLeft: 5,
                              }}
                              src={Assets.ibtn}
                              size={12}
                            />
                          ) : null}
                        </View>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            // backgroundColor: 'red',
                          }}
                        >
                          <QuantityControl
                            quantities={item?.quantity}
                            onIncrease={() => {
                              dispatch(
                                increaseItemQuantity({ itemId: item?.id })
                              );
                              setselectedCoupen(null);
                            }} // Pass index to handleIncrease
                            onDecrease={() => {
                              dispatch(
                                decreaseItemQuantity({ itemId: item?.id })
                              );
                              setselectedCoupen(null);
                            }} // Pass index to handleDecrease
                          />
                        </View>

                        <View
                          style={{
                            marginTop: 10,
                          }}
                        >
                          <CustomText
                            regular
                            style={{
                              alignSelf: "flex-end",
                            }}
                            value={"₹ " + totalPrice}
                          />
                        </View>
                      </CustomRow>
                    </View>
                  );
                })}
              </CustomCard>
              {selectedCoupen ? (
                <TouchableOpacity
                  onPress={() => {
                    handleCoupenShowModal();
                  }}
                >
                  <CustomCard>
                    <CustomHeading heading={"Coupen & offers"} />
                    <View>
                      <CustomRow
                        v_center
                        ratios={[0, 1, 0]}
                        style={{
                          width: "100%",
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                        }}
                      >
                        <View
                          style={{
                            borderRadius: 50,
                            backgroundColor: Theme.PrimaryColor,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 20,
                            height: 20,
                            marginRight: 10,
                          }}
                        >
                          <CustomText value={"%"} color={"white"} size={13} />
                        </View>
                        <View>
                          <CustomText
                            color={"#757575"}
                            bold
                            value={selectedCoupen?.code}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setselectedCoupen(null);
                          }}
                          style={{
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CustomText
                            value={"remove"}
                            color={Theme.PrimaryColor}
                            size={15}
                            margin_h={5}
                            bold
                          />
                          {/* <CustomIcon
                          color={Theme.PrimaryColor}
                          size={15}
                          name={'right'}
                          type={'AN'}
                        /> */}
                        </TouchableOpacity>
                      </CustomRow>
                    </View>
                  </CustomCard>
                </TouchableOpacity>
              ) : (
                <CustomCard>
                  <CustomHeading heading={"Coupen & offers"} />
                  <TouchableOpacity
                    onPress={() => {
                      handleCoupenShowModal();
                    }}
                  >
                    <CustomRow
                      v_center
                      ratios={[0, 1, 0]}
                      style={{
                        width: "100%",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 50,
                          backgroundColor: Theme.PrimaryColor,
                          justifyContent: "center",
                          alignItems: "center",
                          width: 20,
                          height: 20,
                          marginRight: 10,
                        }}
                      >
                        <CustomText value={"%"} color={"white"} size={13} />
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          // justifyContent: 'center',
                          flexDirection: "row",
                        }}
                      >
                        <CustomText
                          color={"#757575"}
                          bold
                          value={"Coupons and offers"}
                        />
                        <CustomText
                          size={12}
                          align={"center"}
                          color={"#757575"}
                          bold
                          value={"(" + coupenListData?.length + " Coupens)"}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-end",
                          flexDirection: "row",
                          alignItems: "center",
                          // alignItems: 'flex-end',
                        }}
                      >
                        <CustomText
                          value={"offers"}
                          color={Theme.PrimaryColor}
                          size={15}
                          margin_h={5}
                          bold
                        />
                        <CustomIcon
                          color={Theme.PrimaryColor}
                          size={15}
                          name={"right"}
                          type={"AN"}
                        />
                      </View>
                    </CustomRow>
                  </TouchableOpacity>
                </CustomCard>
              )}

              <CustomCard
                style={{
                  paddingBottom: 10,
                }}
              >
                <CustomHeading heading={"Payment summary"} />
                <CustomRow
                  style={{
                    marginHorizontal: 10,
                  }}
                  ratios={[1, 0]}
                >
                  <CustomText value={"Subtotal"} color={"#757575"} bold />
                  <CustomText
                    style={{
                      textDecorationLine: "line-through",
                      marginRight: 10,
                    }}
                    value={sumRegulerPrice ? "₹ " + sumRegulerPrice : 0}
                    color={Theme.Black}
                    regular
                  />
                  <CustomText
                    bold
                    value={sumTotalPrice ? "₹ " + sumTotalPrice : "0"}
                    color={Theme.Black}
                    regular
                  />
                </CustomRow>
                {selectedTip > 0 ? (
                  <CustomRow
                    ratios={[0, 1, 0]}
                    style={{
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomImage src={Assets.mybenifitsicon} size={15} />
                    <CustomText
                      medium
                      margin_h={10}
                      size={13}
                      color={"#757575"}
                      value={"Tip For Service Provider"}
                    />

                    <CustomText
                      regular
                      value={selectedTip ? "₹" + selectedTip : "₹" + "0"}
                    />
                  </CustomRow>
                ) : null}

                {selectedCoupen && (
                  <CustomRow
                    ratios={[0, 1, 0]}
                    style={{
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomImage src={Assets.freekit} size={15} />
                    <CustomText
                      medium
                      margin_h={10}
                      size={13}
                      color={"#757575"}
                      value={"Coupon Discount" + selectedCoupen.code}
                    />

                    <CustomText
                      color={Theme.PrimaryColor}
                      regular
                      value={"-₹" + selectedCoupen?.discountValue}
                    />
                  </CustomRow>
                )}

                {ChargesData
                  ? ChargesData.map((item, index) => {
                      return (
                        <CustomRow
                          ratios={[0, 1, 0]}
                          style={{
                            marginTop: 10,
                            marginHorizontal: 10,
                          }}
                        >
                          <CustomImage
                            src={{ uri: Endpoints.baseUrl + item.ChargesIcon }}
                            size={15}
                          />
                          <CustomText
                            size={13}
                            medium
                            margin_h={10}
                            value={item?.ChargesName}
                            color={"#757575"}
                          />

                          <CustomText
                            regular
                            value={"₹" + parseInt(item?.ChargesValue)}
                          />
                        </CustomRow>
                      );
                    })
                  : null}

                {selectedSlotData?.surgCharges > 0 && (
                  <CustomRow
                    ratios={[0, 1, 0]}
                    style={{
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomImage src={Assets.mybenifitsicon} size={15} />
                    <CustomText
                      medium
                      margin_h={10}
                      size={13}
                      color={"#757575"}
                      value={"Surg Charges"}
                    />

                    <CustomText
                      regular
                      value={
                        selectedSlotData?.surgCharges
                          ? "₹" + selectedSlotData?.surgCharges
                          : "₹" + "0"
                      }
                    />
                  </CustomRow>
                )}

                <View
                  style={{
                    borderTopWidth: 1,
                    // borderStyle: 'dashed',
                    borderColor: "#F5F6FB",
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
                  <CustomText
                    size={13}
                    color={Theme.Black}
                    bold
                    value={"Total"}
                  />
                  <CustomText
                    color={Theme.Black}
                    bold
                    value={
                      totalOtherCharges > 0
                        ? "₹" + parseInt(PaymentAfterCoupen)
                        : parseInt(sumTotalPrice)
                    }
                  />
                </CustomRow>
              </CustomCard>
              <CustomCard>
                <CustomHeading heading={"Add Suggestions"} />
                <View
                  style={{
                    marginHorizontal: 10,
                    marginTop: -10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomInput
                    value={note}
                    onChangeText={(e) => setNote(e)}
                    placeholderColor={"grey"}
                    multiline={true}
                    placeholder={"Type here"}
                    textAlignVertical={"top"}
                    containerStyle={{
                      height: 90,
                      marginHorizontal: 10,
                      color: "grey",
                    }}
                    inputStyle={{
                      height: 90,
                      color: "grey",
                    }}
                  />
                </View>
              </CustomCard>
              <CustomCard>
                <CustomHeading heading={"Tip your service provider"} />

                <CustomRow
                  style={{
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleTipSelection(20)}
                    style={{
                      backgroundColor:
                        selectedTip == 20 ? Theme.PrimaryColor : "transparent",
                      borderWidth: 1,
                      borderColor: Theme.PrimaryColor,
                      padding: 6,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomText
                      color={selectedTip == 20 ? "white" : Theme.PrimaryColor}
                      size={13}
                      value={"₹20"}
                      regular
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTipSelection(40)}
                    style={{
                      backgroundColor:
                        selectedTip == 40 ? Theme.PrimaryColor : "transparent",
                      borderWidth: 1,
                      borderColor: Theme.PrimaryColor,
                      padding: 6,

                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginHorizontal: 5,
                      marginLeft: 5,
                    }}
                  >
                    <CustomText
                      color={selectedTip == 40 ? "white" : Theme.PrimaryColor}
                      size={13}
                      value={"₹40"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleTipSelection(80)}
                    style={{
                      backgroundColor:
                        selectedTip == 80 ? Theme.PrimaryColor : "transparent",
                      borderWidth: 1,
                      borderColor: Theme.PrimaryColor,
                      padding: 6,

                      paddingHorizontal: 20,
                      borderRadius: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <CustomText
                      color={selectedTip == 80 ? "white" : Theme.PrimaryColor}
                      size={13}
                      value={"₹80"}
                    />
                  </TouchableOpacity>
                  <CustomRow
                    v_center
                    style={{
                      height: 32,
                      borderWidth: 1,
                      borderColor: Theme.PrimaryColor,

                      borderRadius: 7,
                      paddingHorizontal: 15,
                      color: Theme.PrimaryColor,
                      marginLeft: 5,
                    }}
                  >
                    <CustomText
                      value={"₹"}
                      size={14}
                      color={Theme.PrimaryColor}
                      style={{
                        marginBottom: 3,
                      }}
                    />
                    <TextInput
                      placeholderTextColor={"grey"}
                      style={{
                        color: Theme.PrimaryColor,
                        paddingTop: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        marginTop: 6,
                        marginBottom: -2,
                      }}
                      selectionColor={Theme.PrimaryColor}
                      // value={selectedTip.toString()}
                      maxLength={3}
                      placeholder="Custom"
                      keyboardType="number-pad"
                      onChangeText={handleInputChange}
                    />
                  </CustomRow>
                </CustomRow>
                {selectedTip ? (
                  <TouchableOpacity onPress={() => {}}>
                    <CustomRow
                      style={{
                        marginTop: 10,
                        marginLeft: 5,
                      }}
                      v_center
                    >
                      <CheckBox
                        tintColors={{
                          true: Theme.PrimaryColor,
                          false: Theme.PrimaryColor,
                        }}
                        onValueChange={() => {
                          if (user_info?.saveTipForFuture > 0) {
                            dispatch(saveTipForFuture(0));
                            setChecked(!checked);
                          } else {
                            dispatch(saveTipForFuture(selectedTip));
                            setChecked(!checked);
                          }
                        }}
                        value={checked}
                      />
                      <CustomText
                        size={12}
                        value={"Add this tip automatically to future ordrs"}
                      />
                    </CustomRow>
                  </TouchableOpacity>
                ) : null}

                <View
                  style={{
                    marginHorizontal: 10,
                    marginTop: 20,
                  }}
                >
                  <CustomText
                    color={"#00000080"}
                    value={
                      "Your kindness means a lot! 100% of your tip will go directly to your service provider."
                    }
                  />
                </View>
              </CustomCard>
            </ScrollView>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "white",
            }}
            behavior={"height"}
          >
            <View>
              <CustomCard
                style={{
                  width: "100%",
                  alignSelf: "center",
                  paddingBottom: 0,
                  paddingTop: 0,

                  borderBottomWidth: 0,
                }}
              >
                {diffrence > 0 && (
                  <View
                    style={{
                      alignSelf: "center",
                      backgroundColor: "grey",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 3,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <CustomText
                      margin_h={7}
                      color={"white"}
                      value={
                        "Please add" +
                        " " +
                        diffrence +
                        "Rupees items in your cart"
                      }
                    />
                  </View>
                )}
                <CustomButton
                  onPress={() => {
                    if (diffrence <= 0) {
                      if (usersAddreses?.length >= 0) {
                        handleSavedAddressShowModal();
                      } else {
                        handleAdressSuggestionShowModal();
                      }
                    }
                  }}
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    backgroundColor:
                      diffrence > 0 ? "grey" : Theme.PrimaryColor,
                  }}
                  title={"Add address and slot"}
                />
              </CustomCard>
            </View>
          </KeyboardAvoidingView>

          <AnimatedModal ref={AdressRef}>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 20,
                paddingTop: 10,
                marginTop: "40%",
              }}
            >
              <CustomRow
                style={{
                  marginHorizontal: 10,
                }}
                ratios={[1, 0]}
              >
                <CustomText medium value={"Saved address"} />
                <TouchableOpacity
                  onPress={() => {
                    handleSavedAddressHideModal();
                  }}
                >
                  <CustomIcon
                    color={Theme.PrimaryColor}
                    name={"cross"}
                    type={"ENT"}
                    size={21}
                  />
                </TouchableOpacity>
              </CustomRow>
              <TouchableOpacity
                onPress={() => {
                  handleAdressSuggestionShowModal();
                  setApartment(null);
                  setLandmark(null);
                  setHouse(null);
                  setCurrentAddress(null);
                  setEditAddress(null);
                  handleSavedAddressHideModal();
                }}
              >
                <CustomRow
                  v_center
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "grey",
                    borderStyle: "dashed",
                    paddingBottom: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <CustomIcon
                    name={"plus"}
                    color={Theme.PrimaryColor}
                    size={17}
                    type={"ENT"}
                  />
                  <CustomText
                    color={Theme.PrimaryColor}
                    bold
                    value={"Add a new address"}
                  />
                </CustomRow>
              </TouchableOpacity>
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: "red",
                  width: "100%",
                }}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      marginTop: 20,
                      marginHorizontal: 10,
                    }}
                  >
                    {usersAddreses?.map((item, index) => {
                      return (
                        <CustomRow
                          style={{
                            borderBottomWidth: 1,

                            borderBottomColor: "#CCCCCC",
                            paddingVertical: 15,
                          }}
                          v_center
                          ratios={[1, 0]}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setselectedAddress(item);
                            }}
                          >
                            <CustomRow
                              ratios={[0, 1, 1]}
                              style={
                                {
                                  // marginTop: 10,
                                }
                              }
                              v_center
                            >
                              <CustomIcon
                                name={
                                  selectedAddress?._id == item._id
                                    ? "circle-slice-8"
                                    : "circle-outline"
                                }
                                type={"MC"}
                                size={20}
                                color={
                                  selectedAddress?._id == item._id
                                    ? Theme.PrimaryColor
                                    : "grey"
                                }
                              />
                              <View
                                style={{
                                  marginHorizontal: 10,
                                }}
                              >
                                <CustomText
                                  value={item?.SaveAs}
                                  color={Theme.Black}
                                  bold
                                />
                                <CustomText
                                  regular
                                  value={
                                    item?.houseOrFlatNo +
                                    "," +
                                    item?.buildingName +
                                    item?.FullAddress
                                  }
                                />
                              </View>
                            </CustomRow>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setEditAddress(item);
                              handleEdittShowModal();
                            }}
                            style={{
                              paddingRight: 10,
                            }}
                          >
                            <CustomIcon
                              name={"dots-three-vertical"}
                              type={"ENT"}
                            />
                          </TouchableOpacity>
                        </CustomRow>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
              {/* {selectedAddress != null && ( */}
              <TouchableOpacity>
                <CustomButton
                  width={"90%"}
                  onPress={() => {
                    if (usersAddreses.length > 0) {
                      handleSavedAddressHideModal();
                      handleSlotsShowModal();
                      setSelectSlot(null);
                      setselectedSlotData(null);
                      setCurrentAddress(cAddress?.FullAddress);
                      dispatch(saveAddress(cAddress?.FullAddress));
                    } else {
                      showMessage({
                        message: "Please Add address first",
                        icon: "danger",
                        type: "danger",
                        position: "top",
                      });
                    }
                  }}
                  style={{
                    backgroundColor: !selectedAddress
                      ? "grey"
                      : Theme.PrimaryColor,
                  }}
                  title={"Okay, got it"}
                />
              </TouchableOpacity>
              {/* )} */}
            </View>
          </AnimatedModal>

          <AnimatedModal ref={MapModelRef}>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                }}
              >
                <ScrollView
                  automaticallyAdjustKeyboardInsets={true}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: "80%",
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      height: "40%",
                      width: "100%",
                    }}
                  >
                    <GoogleMapsView region={region} ref={MapViewRef} />

                    <TouchableOpacity
                      onPress={() => {
                        handleMapHideModal();
                      }}
                      style={{
                        position: "absolute",
                        top: 0,

                        backgroundColor: "white",
                        borderRadius: 20,
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                    >
                      <CustomIcon
                        name={"cross"}
                        type={"ENT"}
                        size={30}
                        color={Theme.PrimaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                      marginVertical: 20,
                    }}
                  >
                    <CustomRow
                      style={{
                        marginHorizontal: 10,
                      }}
                      v_center
                      ratios={[2, 1]}
                    >
                      <View
                        style={{
                          width: "80%",
                        }}
                      >
                        <CustomText
                          value={
                            currentAddress
                              ? currentAddress
                              : "Finding Current Address"
                          }
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          handleAdressSuggestionShowModal();
                          setCurrentAddress(null);
                          setLatitude(user_info?.currentLocation[1]);
                          setLongitude(user_info?.currentLocation[0]);
                          handleMapHideModal();
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "grey",
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 5,
                          marginTop: 10,
                        }}
                      >
                        <CustomText medium value={"Change"} />
                      </TouchableOpacity>
                    </CustomRow>
                    <View
                      style={{
                        backgroundColor: "white",
                      }}
                    >
                      <View
                        style={{
                          borderBottomColor: "grey",
                          marginTop: 10,
                          borderWidth: 0.5,
                          marginHorizontal: 10,
                          borderStyle: "dashed",
                          marginTop: 10,
                        }}
                      />
                      <View>
                        <View>
                          <CustomInput
                            value={house}
                            onChangeText={(e) => {
                              setHouse(e);
                            }}
                            containerStyle={{
                              width: "90%",
                            }}
                            placeholder={"House/flat No.*"}
                          />
                          <CustomInput
                            value={apartment}
                            onChangeText={(e) => {
                              setApartment(e);
                            }}
                            containerStyle={{
                              width: "90%",
                            }}
                            placeholder={"Appartment/Society/Building Name"}
                          />
                          <CustomInput
                            value={landmark}
                            onChangeText={(e) => {
                              setLandmark(e);
                            }}
                            containerStyle={{
                              width: "90%",
                            }}
                            placeholder={"Landmark (Optional)*"}
                          />
                        </View>

                        <View
                          style={{
                            marginHorizontal: 10,
                            marginTop: 10,
                            marginLeft: 20,
                          }}
                        >
                          <CustomText value={"Save as"} medium size={13} />

                          <CustomRow
                            style={{
                              marginTop: 10,
                            }}
                            v_center
                            spacing={10}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                setHome(0);
                              }}
                              style={{
                                borderWidth: 1,
                                borderColor:
                                  home == 1 ? "grey" : Theme.PrimaryColor,
                                padding: 5,
                                borderRadius: 10,
                              }}
                            >
                              <CustomText
                                color={home == 1 ? "grey" : Theme.PrimaryColor}
                                margin_h={10}
                                value={"Home"}
                                medium
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => {
                                setHome(1);
                              }}
                              style={{
                                borderWidth: 1,
                                borderColor:
                                  home == 0 ? "grey" : Theme.PrimaryColor,
                                padding: 5,
                                borderRadius: 10,
                              }}
                            >
                              <CustomText
                                margin_h={10}
                                color={home == 0 ? "grey" : Theme.PrimaryColor}
                                value={"Other"}
                                medium
                              />
                            </TouchableOpacity>
                          </CustomRow>
                        </View>

                        <TouchableOpacity>
                          <CustomButton
                            onPress={() => {
                              if (house && apartment) {
                                fetchData();
                              } else {
                                showMessage({
                                  message:
                                    "Please Check your House And Apartment Feild if empty fill it",
                                  icon: "danger",
                                  type: "danger",
                                  position: "top",
                                });
                              }
                            }}
                            width={"90%"}
                            title={"Save and Proceed to slots"}
                            style={{
                              marginTop: 30,
                              backgroundColor:
                                house && apartment
                                  ? Theme.PrimaryColor
                                  : "grey",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </AnimatedModal>

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
                ref={slotScrollRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  backgroundColor: "white",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  paddingBottom: "40%",
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
                      ratios={[2, 0.3]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          handleSlotsHideModal();
                          handleSavedAddressShowModal();
                          setselectedSlotData(null);
                        }}
                      >
                        <CustomRow v_center>
                          <CustomIcon
                            name={"home"}
                            type={"AN"}
                            size={20}
                            color={Theme.PrimaryColor}
                          />

                          <CustomText
                            numberOfLines={1}
                            margin_h={10}
                            value={
                              (selectedAddress
                                ? selectedAddress.houseOrFlatNo +
                                  "," +
                                  selectedAddress?.buildingName +
                                  "," +
                                  selectedAddress?.landmark +
                                  "," +
                                  selectedAddress?.FullAddress
                                : null) ||
                              (currentAddress ? currentAddress : null) ||
                              "Finding Address"
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
                          totalServiceTimeInHours?.minutes +
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
                        <MemoizedDateContent dates={AppointmentsData} />
                      </CustomRow>
                      {slotsToShow.length > 0 && (
                        <CustomRow
                          v_center
                          style={{
                            marginTop: 20,
                            marginHorizontal: 10,
                          }}
                        >
                          <CustomIcon
                            size={18}
                            name={"clockcircleo"}
                            type={"AN"}
                          />
                          <CustomText
                            medium
                            size={14}
                            value={" Select service time slot"}
                          />
                        </CustomRow>
                      )}

                      <View
                        style={{
                          marginTop: 20,
                        }}
                      >
                        <SlotComponent slots={slotsToShow} />
                      </View>
                    </CustomCard>
                    <CustomCard>
                      <CustomHeading heading={"Note:-"} />
                      <View
                        style={{
                          marginHorizontal: 10,
                        }}
                      >
                        <CustomText
                          margin_v={5}
                          value={
                            "\u2B24 " +
                            "Slot time (30 min) is arrival time of experts."
                          }
                        />
                        <CustomText
                          margin_v={5}
                          value={
                            "\u2B24 " +
                            "As part of our safety protocol, our experts will be working until 7 pm. Any services remaining will be scheduled for the next day."
                          }
                        />
                      </View>
                    </CustomCard>
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "white",
                  // alignItems: 'center',
                  justifyContent: "center",
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                <CustomButton
                  width={"90%"}
                  onPress={() => {
                    if (selectedSlotData) {
                      handleSlotsHideModal();
                      handleConfirmSlotShowModal();
                      scrollToCenterf();
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
                    backgroundColor:
                      selectedDate && selectedSlotData
                        ? Theme.PrimaryColor
                        : "grey",
                  }}
                  title={"Proceed To Checkout"}
                />
              </View>
            </View>
          </AnimatedModal>

          <AnimatedModal ref={ConfirmSlot}>
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  backgroundColor: "white",
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      handleSavedAddressShowModal();
                    }}
                  >
                    <CustomRow
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderStyle: "dashed",
                        borderColor: "grey",
                      }}
                      ratios={[0, 1]}
                      v_center
                      h_center
                    >
                      <CustomImage
                        onPress={() => {
                          handleSavedAddressShowModal();
                        }}
                        src={Assets.homegrey}
                        resizeMode={"center"}
                        size={20}
                      />
                      <CustomText
                        numberOfLines={1}
                        margin_h={10}
                        value={
                          (selectedAddress
                            ? selectedAddress.houseOrFlatNo +
                              "," +
                              selectedAddress?.buildingName +
                              "," +
                              selectedAddress?.landmark +
                              "," +
                              selectedAddress?.FullAddress
                            : null) ||
                          (currentAddress ? currentAddress : null) ||
                          "Finding Address"
                        }
                      />
                      <CustomImage
                        src={Assets.pencilgrey}
                        size={20}
                        resizeMode={"center"}
                      />
                    </CustomRow>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleSlotsShowModal();
                      setSelectSlot(null);
                      setselectedSlotData(null);
                      handleConfirmSlotHideModal();
                    }}
                  >
                    <CustomRow
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderStyle: "dashed",
                        borderColor: "grey",
                      }}
                      ratios={[0, 1]}
                      v_center
                      h_center
                    >
                      <CustomImage
                        onPress={() => {
                          handleSlotsShowModal();
                          setSelectSlot(null);
                          setselectedSlotData(null);
                          handleConfirmSlotHideModal();
                        }}
                        src={Assets.clockgrey}
                        resizeMode={"center"}
                        size={20}
                      />
                      <CustomText
                        margin_h={10}
                        value={
                          moment(selectedDate).format("dddd").slice(0, 3) +
                          " " +
                          selectedSlotData?.slotTime
                        }
                      />
                      <CustomImage
                        src={Assets.pencilgrey}
                        size={20}
                        resizeMode={"center"}
                      />
                    </CustomRow>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <CustomButton
                      onPress={() => {
                        Navigation.replace(Routes.PaymentScreen, {
                          requestBody: requestBody,
                        });
                      }}
                      title={
                        orderLoad ? <Loader color={"white"} size={15} /> : "Pay"
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </AnimatedModal>

          <AnimatedModal ref={AdressSuggestions}>
            <View
              style={{
                flex: 1,

                backgroundColor: "white",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <GooglePlacesAutocomplete
                styles={{
                  textInput: {
                    borderWidth: 1,
                    marginHorizontal: 10,
                    marginTop: 10,
                    borderColor: "grey",
                    color: "grey",
                  },
                  listView: {
                    position: "absolute",
                    top: 90,
                  },
                }}
                textInputProps={{
                  // onFocus
                  onFocus: () => {
                    setIsFocused(true);
                  },
                  onBlur: () => {
                    setIsFocused(false);
                  },
                }}
                listLoaderComponent={<Loader size={15} />}
                enablePoweredByContainer={false}
                autoFillOnNotFound={true}
                enableHighAccuracyLocation={true}
                fetchDetails={true}
                ref={suggestionsRef}
                nearbyPlacesAPI="GooglePlacesSearch"
                placeholder="Search"
                onPress={(data, details = null) => {
                  console.log("data", data);
                  let item = {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    FullAddress: data?.description,
                  };
                  setCurrentAddress(data.description);
                  setSuggestedAddress(data.description);
                  setLatitude(details.geometry.location.lat);
                  setLongitude(details.geometry.location.lng);
                  dispatch(addSearchadressHistory(item));

                  handleAdressSuggestionHideModal();
                  handleMapShowModal();
                }}
                onFail={(error) => console.error(error)}
                onKeyPress={(event) => {
                  if (event.nativeEvent.key === "Enter") {
                    return;
                  }
                }}
                query={{
                  key: myApiKey,
                  language: "en",
                  region: "in",
                }}
              />
              {!isFocused && (
                <View style={{ position: "absolute", top: 90 }}>
                  {addressofHistory?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        // setSuggestedAddress(item?.FullAddress);
                        setCurrentAddress(item?.FullAddress);
                        setLatitude(item?.latitude);
                        setLongitude(item?.longitude);
                        handleAdressSuggestionHideModal();
                        if (!selectedAddress?.FullAddress) {
                          setApartment(null);
                          setLandmark(null);
                          setHouse(null);
                        }
                        handleMapShowModal();
                      }}
                      style={{
                        marginHorizontal: 10,
                        marginTop: 20,
                      }}
                    >
                      <CustomText value={item?.FullAddress} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity
                onPress={() => {
                  handleAdressSuggestionHideModal();
                  // setselectedAddress(null);
                  // setCurrentAddress(null);

                  getAddressFromCoordinates();
                  handleMapShowModal();
                }}
                style={{
                  position: "absolute",
                  top: 70,
                  left: 12,
                }}
              >
                <CustomRow>
                  <CustomIcon
                    name={"location-crosshairs"}
                    type={"FA6"}
                    color={Theme.PrimaryColor}
                    size={20}
                  />
                  <CustomText
                    color={Theme.PrimaryColor}
                    medium
                    margin_h={5}
                    value={"Use Your Current Location"}
                  />
                </CustomRow>
              </TouchableOpacity>
            </View>
          </AnimatedModal>

          <AnimatedModal ref={IBtnRef}>
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                flex: 1,
                minHeight: 400,
                width: "100%",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}
            >
              <CustomText
                margin_v={20}
                margin_h={10}
                regular
                value={iBtnData?.packageTitle}
              />

              <View>
                <CustomHeading heading={"Services Name"} />
                {iBtnData?.packageName?.map((item, index) => {
                  return (
                    <CustomText
                      margin_h={20}
                      regular
                      value={"\u2022" + " " + item}
                    />
                  );
                })}
              </View>
            </View>
          </AnimatedModal>

          <AnimatedModal ref={EditModalRef}>
            <View
              style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "white",
                flex: 1,
                position: "absolute",
                width: "100%",
                bottom: 0,
              }}
            >
              <View
                style={{
                  marginTop: 40,
                }}
              >
                <CustomRow
                  style={{
                    marginLeft: 10,
                  }}
                  spacing={10}
                  ratios={[1, 1]}
                  v_center
                >
                  <View>
                    <CustomButton
                      onPress={() => {
                        setLongitude(editAddress?.location?.longitude);
                        setLatitude(editAddress?.location?.latitude);
                        setCurrentAddress(editAddress?.FullAddress);
                        setHome(editAddress?.SaveAs == "home" ? 0 : 1);
                        setHouse(editAddress?.houseOrFlatNo);
                        setLandmark(editAddress?.landmark);
                        setApartment(editAddress?.buildingName);
                        console.log("editAddress", editAddress);
                        handleEdittHideModal();
                        handleMapShowModal();
                      }}
                      width={"100%"}
                      title={"Edit"}
                    />
                  </View>
                  <View>
                    <CustomButton
                      onPress={() => {
                        DeleteAdress();
                        handleEdittHideModal();
                        handleSavedAddressHideModal();
                        getDetails();
                      }}
                      width={"100%"}
                      title={"Delete"}
                    />
                  </View>
                </CustomRow>
              </View>
            </View>
          </AnimatedModal>
          <AnimatedModal ref={CoupenRef}>
            <View
              style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "white",
              }}
            >
              <CustomRow
                ratios={[1, 0]}
                v_center
                style={{
                  backgroundColor: Theme.PrimaryColor,

                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                  }}
                >
                  <CustomText
                    size={19}
                    align={"center"}
                    bold
                    color={"white"}
                    value={"Coupons & Offers"}
                    margin_v={10}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    handleCoupenHideModal();
                  }}
                >
                  <CustomIcon
                    name={"cross"}
                    type={"ENT"}
                    size={20}
                    color={"white"}
                  />
                </TouchableOpacity>
              </CustomRow>
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                stickyHeaderIndices={[0]}
                contentContainerStyle={{
                  paddingBottom: coupenListData?.length < 3 ? "100%" : 50,
                  backgroundColor: "white",
                }}
              >
                <View>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      paddingBottom: 10,
                      elevation: 4,
                    }}
                  >
                    <CustomRow
                      ratios={[1, 0]}
                      style={{
                        width: "95%",
                        borderWidth: 1,
                        alignSelf: "center",
                        marginTop: 10,
                        paddingHorizontal: 10,
                        borderColor: "grey",
                        borderRadius: 10,
                      }}
                      v_center
                    >
                      <TextInput
                        style={{
                          fontFamily: Fonts.PoppinsRegular,
                          color: "grey",
                        }}
                        placeholder="Enter Coupon Code"
                        placeholderTextColor={"grey"}
                      />
                      <TouchableOpacity>
                        <CustomText
                          bold
                          color={Theme.PrimaryColor}
                          value={"Apply"}
                        />
                      </TouchableOpacity>
                    </CustomRow>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {coupenListData &&
                    coupenListData?.map((item, index) => {
                      let coupon = item;

                      const calculateTotalPriceWithCoupon = (cart, coupon) => {
                        let totalPrice = 0;

                        cart.forEach((item) => {
                          // if (coupon.inItem.includes(item.id)) {
                          totalPrice +=
                            parseInt(item.packagetotalPrice) *
                            parseInt(item.quantity);
                          // }
                        });

                        return totalPrice;
                      };
                      const calculateDiscountAmount = (
                        totalPrice,
                        discountPercentage
                      ) => {
                        return totalPrice * (discountPercentage / 100);
                      };
                      const totalPriceOfItemsForCoupon =
                        calculateTotalPriceWithCoupon(cart, coupon);

                      if (item?.couponType == "FirstTime" || "Fixed") {
                        afterDiscount = item?.couponValue;
                      }
                      console.log("affrrrre", afterDiscount);
                      if (item?.couponType == "discount") {
                        if (item?.couponCapping) {
                          afterDiscount = item?.couponCapping;
                        } else {
                          afterDiscount = calculateDiscountAmount(
                            parseInt(totalPriceOfItemsForCoupon),
                            parseInt(item?.couponValue)
                          );
                        }
                      }

                      const calculateAdditionalAmount = (
                        totalPrice,
                        minSpend
                      ) => {
                        return minSpend - totalPrice;
                      };
                      const additionalAmountNeeded = calculateAdditionalAmount(
                        totalPriceOfItemsForCoupon,
                        item?.minSpend
                      );

                      forAddData = {
                        code: item?.couponCode,
                        discountValue: afterDiscount,
                      };
                      return (
                        <Coupon
                          key={item?._id}
                          code={item?.couponCode}
                          desc={item?.couponDescription}
                          title={item?.couponTitle}
                          afterDiscount={afterDiscount}
                          additionalAmountNeeded={additionalAmountNeeded}
                          capping={item?.couponCapping ? true : false}
                          itemm={coupon}
                        />
                      );
                    })}

                  {coupenListData?.length == 0 && (
                    <FastImage
                      source={Assets.noCoupens}
                      resizeMode="contain"
                      style={{
                        height: 250,
                        width: "100%",
                        alignSelf: "center",
                        // flexGrow: 1,
                        marginTop: 80,
                      }}
                    />
                  )}
                </View>
              </ScrollView>
            </View>
          </AnimatedModal>

          <AnimatedModal
            parentStyle={{
              marginTop: 0,
              backgroundColor: "red",
            }}
            ref={CoupenApplyRef}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <FastImage
                resizeMode="contain"
                style={{
                  width: "100%",
                  flex: 1,

                  alignItems: "center",
                  justifyContent: "center",
                }}
                source={Assets.couponapply}
              >
                <View
                  style={{
                    // height: 250,
                    marginHorizontal: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: 40,
                    paddingHorizontal: 15,
                    paddingVertical: 30,
                    width: 200,
                  }}
                >
                  <CustomImage
                    src={Assets.discount}
                    size={60}
                    resizeMode={"center"}
                    style={{
                      position: "absolute",
                      top: -30,
                    }}
                  />
                  <CustomText
                    align={"center"}
                    value={"Coupon Applied Successfully"}
                    size={18}
                    medium
                    color={"black"}
                    style={{
                      marginTop: 10,
                    }}
                  />
                  <CustomText
                    align={"center"}
                    value={"You saved "}
                    size={18}
                    color={"black"}
                    margin_v={10}
                  />
                  <CustomText
                    align={"center"}
                    value={"₹ " + selectedCoupen?.discountValue}
                    size={18}
                    bold
                    color={"black"}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <Animated.View
                      style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: Theme.PrimaryColor,
                        borderRadius: 10,
                        transform: [{ scaleX: progress }],
                      }}
                    />
                  </View>
                </View>
              </FastImage>
            </View>
          </AnimatedModal>

          <AnimatedModal ref={CouponViewDetailsRef}>
            <View
              style={{
                backgroundColor: "white",
                // backgroundColor: 'red',
                marginTop: "80%",
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <CustomText
                margin_h={10}
                margin_v={10}
                value={"Terms And Conditions"}
                medium
                size={20}
              />

              <View
                style={{
                  marginHorizontal: 10,
                  // backgroundColor: 'red',
                  // flex: 1,
                  // paddingBottom: 40,
                }}
              >
                <CustomText value={coupenDetails?.couponDescription} regular />
              </View>
            </View>
          </AnimatedModal>
        </>
      )}
    </SafeAreaView>
  );
}
