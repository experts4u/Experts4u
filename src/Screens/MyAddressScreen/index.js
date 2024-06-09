import { useIsFocused } from "@react-navigation/native";
import Assets from "Assets";
import AnimatedModal from "Components/AnimatedModal";
import CustomButton from "Components/CustomButton";
import CustomCard from "Components/CustomCard";
import CustomHeader from "Components/CustomHeader";
import CustomIcon from "Components/CustomIcon";
import CustomImage from "Components/CustomImage";
import CustomInput from "Components/CustomInput";
import Loader from "Components/CustomLoader";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import Endpoints from "Configs/API/Endpoints";
import Theme from "Configs/Theme";
import useFetch from "Hooks/useFetch";
import { editAddress } from "ReduxState/Slices/UserSlice";
import GoogleMapsView from "Screens/SummaryScreen/Components";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSelector } from "react-redux";

export default () => {
  const MapModelRef = useRef();
  const focused = useIsFocused();
  const AdressSuggestions = useRef();
  const suggestionsRef = useRef();

  const [first, setfirst] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");
  const [change, setChange] = useState(0);
  const [find, setFind] = useState(false);
  const [userData, setUserData] = useState([]);

  const [home, setHome] = useState(edit == "home" ? 0 : 1);
  const [edit, setEdit] = useState("");
  const [deleteAdr, setDeleteAdr] = useState("");
  const user_info = useSelector((v) => v.user);
  const [SuggestedAddress, setSuggestedAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");

  const user_ = useSelector((v) => v.user.userInfo);
  const [longitude, setLongitude] = useState(user_info?.currentLocation[0]);
  const [latitude, setLatitude] = useState(user_info?.currentLocation[1]);

  const handleMapHideModal = () => {
    MapModelRef?.current?.hideModal();
  };

  const handleMapShowModal = () => {
    MapModelRef?.current?.showModal();
  };

  const handleAdressSuggestionShowModal = () => {
    AdressSuggestions?.current?.showModal();
  };
  const handleAdressSuggestionHideModal = () => {
    AdressSuggestions?.current?.hideModal();
  };

  useEffect(() => {
    if (deleteAdr) {
      DeleteAdress();
    }
  }, [deleteAdr]);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      getAddressFromCoordinates();
    }
  }, [latitude, longitude]);

  let myApiKey = "AIzaSyCBRJgSZT50bFwgbOQHOWdi0giGUEdG3MY";

  const getAddressFromCoordinates = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${myApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
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

  const User_data = useFetch({
    endpoint: user_info?.user
      ? Endpoints.getUserDetails + user_info?.user?._id
      : Endpoints.getUserDetails + user_info?._id,
  });

  const getDetails = async () => {
    try {
      let details = await User_data.fetchPromise();
      setUserData(details.data.address);
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    if (user_info?._id || (user_info.user?._id && focused)) {
      getDetails();
    }
  }, [focused]);
  const {
    response: responsee,
    fetchData: DeleteAdress,
    error,
  } = useFetch({
    endpoint: Endpoints.deleteAddress + deleteAdr,

    method: "DELETE",
  });

  useEffect(() => {
    if (responsee) {
      getDetails();
    }
  }, [responsee]);

  const { response, fetchData, isLoading } = useFetch({
    endpoint: Endpoints.AddAddress,
    body: {
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      houseOrFlatNo: house,
      buildingName: apartment,
      landmark: landmark ? landmark : "",
      SaveAs: home == 0 ? "home" : "other",
      FullAddress: SuggestedAddress || currentAddress,
    },
    method: "post",
  });

  const region = {
    latitude: latitude, // Latitude of the center of India
    longitude: longitude, // Longitude of the center of India
    latitudeDelta: 0.1, // Decreased value for higher zoom
    longitudeDelta: 0.1, // Decreased value for higher zoom
  };

  useEffect(() => {
    if (response) {
      handleResponse();
    }
  }, [response]);

  const handleResponse = () => {
    handleMapHideModal();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <CustomHeader l_type={"back_arrow"} title={"My Address"} />
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView>
          <View>
            {userData?.length > 0 ? (
              userData?.map((item, index) => {
                return (
                  <CustomCard>
                    <CustomRow
                      style={{
                        marginHorizontal: 10,
                      }}
                      ratios={[0, 1]}
                    >
                      <CustomImage
                        style={{
                          marginTop: 6,
                        }}
                        src={Assets.redddot}
                        resizeMode={"center"}
                        size={13}
                      />
                      <View
                        style={{
                          width: "70%",
                          marginLeft: 10,
                        }}
                      >
                        <CustomText value={item?.SaveAs} bold />
                        <CustomText
                          value={
                            item?.houseOrFlatNo +
                            "," +
                            item?.buildingName +
                            item?.FullAddress
                          }
                          regular
                        />
                      </View>
                    </CustomRow>
                    <CustomRow
                      ratios={[1, 1]}
                      spacing={20}
                      v_center
                      style={{
                        marginHorizontal: 10,
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setEdit(item);
                          setLongitude(item?.location?.longitude);
                          setLatitude(item?.location?.latitude);
                          handleMapShowModal();

                          console.log("pressed");
                        }}
                        style={{
                          backgroundColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 10,
                          borderRadius: 15,
                          borderColor: "grey",
                          borderWidth: 1,
                        }}
                      >
                        <CustomText color={"black"} bold value={"Edit"} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDeleteAdr(item?._id);
                        }}
                        style={{
                          backgroundColor: Theme.PrimaryColor,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 10,
                          borderRadius: 15,
                        }}
                      >
                        <CustomText bold color={"white"} value={"Remove"} />
                      </TouchableOpacity>
                    </CustomRow>
                  </CustomCard>
                );
              })
            ) : (
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 40,
                  backgroundColor: "white",
                  flex: 1,
                }}
              >
                <CustomImage src={Assets.nodata} size={300} />
              </View>
            )}
          </View>
        </ScrollView>

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
                  <GoogleMapsView region={region} />
                </View>

                <View
                  style={{
                    marginVertical: 20,
                  }}
                >
                  <CustomRow
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 10,
                    }}
                    v_center
                    ratios={[3, 0.7]}
                  >
                    <TouchableOpacity
                      style={{
                        width: "90%",
                      }}
                    >
                      <CustomText
                        value={edit ? edit.FullAddress : currentAddress}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        handleAdressSuggestionShowModal();
                        handleMapHideModal();
                      }}
                      style={{
                        borderWidth: 1,
                        borderColor: "grey",
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        // marginTop: 10,
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
                          value={edit ? edit?.houseOrFlatNo : house}
                          onChangeText={(e) => {
                            setHouse(e);
                          }}
                          containerStyle={{
                            width: "90%",
                          }}
                          placeholder={"House/flat No.*"}
                        />
                        <CustomInput
                          value={edit ? edit?.buildingName : apartment}
                          onChangeText={(e) => {
                            setApartment(e);
                          }}
                          containerStyle={{
                            width: "90%",
                          }}
                          placeholder={"Appartment/Society/Building Name"}
                        />
                        <CustomInput
                          value={edit ? edit?.landmark : landmark}
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

                      <TouchableOpacity
                        onPress={() => {
                          // handleMapHideModal();
                          fetchData();
                          // console.log('fkds');
                        }}
                      >
                        <CustomButton
                          width={"90%"}
                          title={"Save Address"}
                          style={{
                            marginTop: 30,
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
                },
                listView: {
                  position: "absolute",
                  top: 90,
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
                setSuggestedAddress(data.description);
                setLatitude(details.geometry.location.lat);
                setLongitude(details.geometry.location.lng);
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

            <TouchableOpacity
              onPress={() => {
                handleAdressSuggestionHideModal();
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
        <TouchableOpacity
          onPress={() => {
            handleMapShowModal();
            console.log("predd");
          }}
          style={{
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            width: "100%",
            zIndex: 2,
            backgroundColor: Theme.PrimaryColor,
            borderRadius: 8,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            padding: 5,
            flexDirection: "row",
            paddingVertical: 10,
            width: 90 + "%",
            marginVertical: 10,
          }}
        >
          <CustomText
            bold
            color={"white"}
            value={"+ " + " " + "Add a new address"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
