import { useIsFocused, useNavigation } from "@react-navigation/native";
import Assets from "Assets";
import CustomImage from "Components/CustomImage";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import Routes from "RootNavigation/Routes";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import Styles from "./Styles";
import ElevatedCard from "Components/ElevatedCard";
import Theme from "Configs/Theme";
import CustomHeading from "Components/CustomHeading";
import CustomCard from "Components/CustomCard";
import CustomIcon from "Components/CustomIcon";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomTypewriter from "Components/CustomTypewriter";
import CustomCarasoul from "Components/CustomCarasoul";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import useFetch from "Hooks/useFetch";
import Endpoints from "Configs/API/Endpoints";
import RenderHTML from "react-native-render-html";
import LinearGradient from "react-native-linear-gradient";

export default function () {
  const Navigation = useNavigation();
  const user_info = useSelector((v) => v.user.userInfo);
  const cart = useSelector((v) => v.user?.cart);
  const dimensions = useWindowDimensions();
  const [textToType, setTextToType] = useState("Search for “avd def eft");
  const [catogoryData, setCatogoryData] = useState([]);
  const [offers4u, setOffers4u] = useState([]);
  const [HeroData, setHeroData] = useState([]);
  const [lastImage, setlastImage] = useState([]);
  const [currentAdress, setcurrentAdress] = useState("");
  const [cCategory, setcCategory] = useState([]);
  const [headings, setheadings] = useState([]);
  const [data, setData] = useState([]);
  const [imageHeight, setImageHeight] = useState(null);
  const state = useSelector((v) => v.user);
  const [userData, setUserData] = useState();
  const [cover, setCover] = useState();
  const [shortcuts, setShortcuts] = useState("");
  const [imageHeights, setImageHeights] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const focused = useIsFocused();

  let counter = cart.length;

  const getDetails = async () => {
    try {
      let details = await User_data.fetchPromise();
      setUserData(details.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  // async function handleEnabledPressed() {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const enableResult = await promptForEnableLocationIfNeeded();
  //       console.log('enableResult', enableResult);
  //       // The user has accepted to enable the location services
  //       // data can be :
  //       //  - "already-enabled" if the location services has been already enabled
  //       //  - "enabled" if user has clicked on OK button in the popup
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error(error.message);
  //         // The user has not accepted to enable the location services or something went wrong during the process
  //         // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
  //         // codes :
  //         //  - ERR00 : The user has clicked on Cancel button in the popup
  //         //  - ERR01 : If the Settings change are unavailable
  //         //  - ERR02 : If the popup has failed to open
  //         //  - ERR03 : Internal error
  //       }
  //     }
  //   }
  // }

  let abc = [" ", " ", " "];

  myApiKey = "AIzaSyCBRJgSZT50bFwgbOQHOWdi0giGUEdG3MY";

  let longitude = state?.currentLocation[0];
  let latitude = state?.currentLocation[1];

  const User_data = useFetch({
    endpoint: Endpoints.getUserDetails + user_info?.user?._id,
  });

  const getAddressFromCoordinates = () => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          latitude +
          "," +
          longitude +
          "&key=" +
          myApiKey
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "OK") {
            resolve(responseJson?.results?.[0]?.formatted_address);
            setcurrentAdress(responseJson?.results?.[0]?.formatted_address);

            // console.log(
            //   responseJson?.results?.[0]?.formatted_address,
            //   'llllllllll',
            // );
          } else {
            reject("not found");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const Parent_category = useFetch({
    endpoint: Endpoints.getParentCatogary,
  });

  const OffersForU = useFetch({
    endpoint: Endpoints.getoffers4u,
  });
  const HeroSlider = useFetch({
    endpoint: Endpoints.getHeroSlider,
  });
  const getChildCategoryName = useFetch({
    endpoint: Endpoints.getChildCategoryNames,
  });

  const GetHomeBottom = useFetch({
    endpoint: Endpoints.getHomeBottom,
  });
  const ServiceShortcut = useFetch({
    endpoint: Endpoints.serviceShortcut,
  });

  const getServiceShortcut = async () => {
    try {
      let shrtct = await ServiceShortcut.fetchPromise();

      setShortcuts(shrtct?.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  const HomeBottom = async () => {
    try {
      let bottomData = await GetHomeBottom.fetchPromise();
      let BotttomImg = bottomData.data;

      let btmimg = BotttomImg?.map((item) => item);

      setlastImage(btmimg);
    } catch (e) {
      console.log("err", e);
    }
  };

  const GetOffersForU = async () => {
    try {
      let Offerdata = await OffersForU.fetchPromise();
      setOffers4u(Offerdata.Data);
    } catch (e) {
      console.log("err", e);
    }
  };
  const getChildCategoryNamee = async () => {
    try {
      let getcName = await getChildCategoryName.fetchPromise();
      let ChildData = getcName.data;

      let newD = ChildData?.map((item) => item?.CCName);
      setcCategory(newD);
    } catch (e) {
      console.log("err", e);
    }
  };

  const GetHeroSlider = async () => {
    try {
      let HeroSliderData = await HeroSlider.fetchPromise();
      setHeroData(HeroSliderData.Data);
    } catch (e) {
      console.log("err", e);
    }
  };

  const getParentCatogary = async () => {
    try {
      let Pcategory = await Parent_category.fetchPromise();
      setCatogoryData(Pcategory.Data);
    } catch (e) {
      console.log("err", e);
    }
  };

  const renderList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Navigation.navigate(Routes.ChildCatogary, {
            PCid: item._id,
            PCGroup: item?.PCGroup,
            pcname: item?.PCName,
          });
        }}
        style={{
          flex: 1,
          margin: 5,
          width: 100,

          alignItems: "center",
        }}
        key={index}
      >
        <View
          style={{
            marginTop: 5,
          }}
        >
          {/* <CustomText style={{
            position:"abs"
          }} value={item?.PCNotice} size={8} color={'black'} /> */}
          <FastImage
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
            source={{ uri: Endpoints.baseUrl + item.PCimage }}
          />
          {item?.PCNotice && (
            <LinearGradient
              colors={["black", "rgba(0, 0, 0, 0.5)"]}
              style={{
                height: 20,

                position: "absolute",
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
                width: 100,

                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: Theme.PrimaryColor,
              }}
              start={{ x: 0, y: 0 }} // gradient start position
              end={{ x: 1, y: 1 }} // gradient end position
            >
              <View>
                <CustomText
                  size={11}
                  medium
                  color={"white"}
                  value={item?.PCNotice}
                />
              </View>
            </LinearGradient>
          )}
        </View>

        <View>
          <CustomText
            align={"center"}
            regular
            size={12}
            style={{
              marginTop: 5,
              paddingHorizontal: 7,
            }}
            value={item.PCName}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const CustomCardd = ({ img, txt, item }) => {
    console.log("txt", item);
    return (
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <ElevatedCard
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: 100,
            paddingBottom: 5,
            borderWidth: 0.5,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Navigation.navigate(Routes.ServiceDetailsScreen, {
                itemId: item?.ChildCatIDs?._id,
                PCGroup: item?.ChildCatIDs?.PCName[0]?.PCGroup,
                pcId: item?.ChildCatIDs?.PCName[0]?._id,
                PCName: item?.ChildCatIDs?.PCName[0]?.PCName,
                serviceId: item?.ServiceVarients[0]?._id,
              });
            }}
          >
            <View>
              <CustomImage
                resizeMode={"cover"}
                style={{
                  height: 100,

                  width: 100,

                  // backgroundColor: "red",
                }}
                src={{ uri: Endpoints.baseUrl + img }}
              />
              <View
                style={{
                  // width: "100%",
                  // height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  // flex: 1,
                }}
              >
                <CustomText
                  numberOfLines={2}
                  // margin_h={5}
                  align={"center"}
                  regular
                  size={12}
                  style={{
                    marginTop: 5,
                    paddingHorizontal: 7,
                  }}
                  value={txt}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ElevatedCard>
      </View>
    );
  };

  useEffect(() => {
    const repeatTyping = () => {
      setTextToType("Search for “avd def eft");
      setTimeout(repeatTyping, 1000); // Adjust the timeout as per your preference
    };

    repeatTyping();

    return () => clearTimeout();
  }, []);

  useEffect(() => {
    StatusBar.setTranslucent(false);
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const getHeading = useFetch({
    endpoint: Endpoints.getHeadings,
  });

  const GetHeadings = async () => {
    try {
      let heaidngData = await getHeading.fetchPromise();
      setheadings(heaidngData.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    if (focused) {
      getChildCategoryNamee();
      GetHeroSlider();
      getDetails();
      getAddressFromCoordinates();
      getParentCatogary();
      getServiceShortcut();
      GetOffersForU();
      HomeBottom();
      GetHeadings();
    }
  }, [focused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getChildCategoryNamee();
      getCoverImage();
      GetHeroSlider();
      getDetails();
      getAddressFromCoordinates();
      getParentCatogary();
      getServiceShortcut();
      GetOffersForU();
      HomeBottom();
      GetHeadings();
      console.log("refresh hua");
    }, 2000);
  }, []);

  useEffect(() => {
    if (headings.length > 0) {
      fetchData();
    }
  }, [headings]);

  const fetchData = async () => {
    try {
      const allData = [];
      for (const heading of headings) {
        const response = await fetch(
          `http://52.87.3.228:5500/api/v1/VideoShortcut/GetDataByHeading/${heading}`
        );
        const json = await response.json();
        allData.push({ heading, data: json.data });
      }
      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderTitle = (title) => {
    return (
      <CustomHeading
        style={{
          marginTop: 10,
          // marginLeft: 10,
        }}
        heading={title}
      />
    );
  };

  const renderItem = ({ item }) => {
    // Log the entire item object

    // Access the data array within the item object
    const data = item.data;

    // Check if data is an array and contains items
    if (Array.isArray(data) && data.length > 0) {
      // Map through all items in the data array
      // return data.map((dataItem, index) => {
      // Access the thumbnail property within each data item
      // const thumbnailUri = dataItem.thumbnail;

      // Render the thumbnail image using thumbnailUri
      return (
        <CustomRow>
          {data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  Navigation.navigate(Routes.VideoScreen, {
                    videoUrl: item?.videoLink,
                  });
                }}
              >
                <View
                  style={{
                    // marginHorizontal: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    // minHeight: 200,
                    overflow: "hidden",
                    marginLeft: 10,
                    // borderRadius: 20,
                    width: 160,
                    height: 280,
                    // backgroundColor: "red",
                    // height: dimensions.width / 2 - 25,
                    // width: dimensions.width,
                  }}
                >
                  <FastImage
                    source={{
                      uri: `${Endpoints.baseUrl}${item.thumbnail}`, // Concatenate base URL with thumbnail URL
                    }}
                    resizeMode="cover"
                    style={{
                      // height: dimensions.width / 2,
                      height: "100%",
                      // width: dimensions.width - 50,
                      width: "100%",
                      borderRadius: 20,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </CustomRow>
      );
      // });
    } else {
      console.log("No data or thumbnails found.");
      // Return null or a placeholder if no data or thumbnails are found
      return null;
    }
  };

  const renderListt = (title, listData) => {
    return (
      <View>
        {renderTitle(title)}
        <FlatList
          contentContainerStyle={{
            paddingRight: 30,
          }}
          scrollEnabled={listData.length > 2 ? true : false}
          showsHorizontalScrollIndicator={false}
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal={true}
        />
      </View>
    );
  };

  const rendershortcuItem = ({ item, index }) => (
    <CustomCardd
      index={index}
      item={item.Service}
      txt={
        item?.Service?.ServiceVarients[0]?.ServiceType?.Name != "NA"
          ? item.Service?.ServiceName +
            " - " +
            item?.Service?.ServiceVarients[0]?.ServiceType?.Name
          : item.Service?.ServiceName +
            " - " +
            item?.Service?.ChildCatIDs?.CCName
      }
      img={
        item.Service?.ServiceVarients[0]?.VarientDiscription?.[0].ServiceImage
      }
    />
  );
  const renderShortcut = (title, listData) => {
    console.log("listData", listData);
    return (
      <View>
        {renderTitle(title)}
        <FlatList
          contentContainerStyle={{
            paddingRight: 30,
          }}
          scrollEnabled={listData.length > 3 ? true : false}
          showsHorizontalScrollIndicator={false}
          data={listData}
          renderItem={rendershortcuItem}
          keyExtractor={(item) => item._id}
          horizontal={true}
        />
      </View>
    );
  };

  const listsByTitle = {};
  data.forEach((item) => {
    if (!listsByTitle[item.heading]) {
      listsByTitle[item.heading] = [];
    }
    listsByTitle[item.heading].push(item);
  });

  const servicecbytitle = {};
  shortcuts &&
    shortcuts?.forEach((item) => {
      if (!servicecbytitle[item.heading]) {
        servicecbytitle[item.heading] = [];
      }

      servicecbytitle[item.heading].push(item);
    });

  const coverImage = useFetch({
    endpoint: Endpoints.getCoverImage,
  });
  const getCoverImage = async () => {
    try {
      let heaidngData = await coverImage.fetchPromise();
      setCover(heaidngData.data[0]);
    } catch (e) {
      console.log("err", e);
    }
  };

  useEffect(() => {
    if (focused) {
      getCoverImage();
    }
  }, [focused]);

  useEffect(() => {
    const calculateImageHeights = async () => {
      try {
        if (lastImage?.length === 0) return; // Prevent unnecessary calculation if lastImage is empty

        const heights = await Promise.all(
          lastImage?.map(async (image) => {
            return new Promise((resolve, reject) => {
              Image.getSize(
                Endpoints.baseUrl + image?.bannerImg,
                (width, height) => {
                  const calculatedHeight =
                    (Dimensions.get("window").width / width) * height;
                  resolve({ id: image._id, height: calculatedHeight });
                },
                reject
              );
            });
          })
        );
        setImageHeights(heights);
      } catch (error) {
        console.error("Error fetching image sizes:", error);
        // Handle the error here (e.g., display an error message to the user)
      }
    };

    calculateImageHeights();
  }, [lastImage]);

  useEffect(() => {
    const calculateImageHeight = async (image) => {
      try {
        const { CoverImage, _id } = image;
        if (!CoverImage) return; // Ensure there is a CoverImage URL

        const { width, height } = await new Promise((resolve, reject) => {
          Image.getSize(
            Endpoints.baseUrl + CoverImage,
            (width, height) => resolve({ width, height }),
            reject
          );
        });

        const calculatedHeight =
          (Dimensions.get("window").width / width) * height;
        setImageHeight({ id: _id, height: calculatedHeight });
      } catch (error) {
        console.error("Error fetching image size:", error);
        // Handle the error here (e.g., display an error message to the user)
      }
    };

    // Assuming "cover" is the variable holding the single image object
    calculateImageHeight(cover);
  }, [cover]);

  const renderlastImageItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(
          "lastImage?.find((image) => image._id === item?.id)?.CCatId?._id",
          lastImage?.find((image) => image._id === item?.id)?.CCatId?._id
        );

        console.log(
          "lastImage?.find((image) => image._id === item?.id)?.serviceID",
          lastImage?.find((image) => image._id === item?.id)?.serviceID
        );
        if (lastImage?.find((image) => image._id === item?.id)?.PCatId) {
          if (lastImage?.find((image) => image._id === item?.id)?.serviceID) {
            Navigation.navigate(Routes.ServiceDetailsScreen, {
              itemId: lastImage?.find((image) => image._id === item?.id)?.CCatId
                ?._id,
              PCGroup: lastImage?.find((image) => image._id === item?.id)
                ?.PCatId?.PCGroup,
              pcId: lastImage?.find((image) => image._id === item?.id)?.PCatId
                ?._id,
              PCName: lastImage?.find((image) => image._id === item?.id)?.PCatId
                ?.PCName,
              serviceId: lastImage?.find((image) => image._id === item?.id)
                ?.serviceID,
            });
          } else {
            if (
              lastImage?.find((image) => image._id === item?.id)?.CCatId?._id
            ) {
              Navigation.navigate(Routes.ServiceDetailsScreen, {
                itemId: lastImage?.find((image) => image._id === item?.id)
                  ?.CCatId?._id,
                PCGroup: lastImage?.find((image) => image._id === item?.id)
                  ?.PCatId?.PCGroup,
                pcId: lastImage?.find((image) => image._id === item?.id)?.PCatId
                  ?._id,
                PCName: lastImage?.find((image) => image._id === item?.id)
                  ?.PCatId?.PCName,
              });
            } else {
              console.log("no items and child cat");
            }
          }
        }
      }}
    >
      <FastImage
        source={{
          uri:
            Endpoints.baseUrl +
            lastImage?.find((image) => image._id === item?.id)?.bannerImg,
        }}
        style={{ width: "100%", height: item.height, marginBottom: 20 }}
        resizeMode="contain"
      />
    </TouchableWithoutFeedback>
  );

  let totalQuantity = 0;

  if (cart) {
    // Summing up the quantity properties of all items in the cart
    totalQuantity = cart.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: 6,
          backgroundColor: "white",
        }}
        stickyHeaderIndices={!cover ? [1] : null}
        showsVerticalScrollIndicator={false}
      >
        {cover ? (
          <View
            style={
              {
                // flex: 1,
              }
            }
          >
            <TouchableWithoutFeedback
              onPress={() => {
                Navigation.navigate(Routes.ServiceDetailsScreen, {
                  itemId: cover?.CCatId?._id,
                  PCGroup: cover?.PcatId?.PCGroup,
                  pcId: cover?.PcatId?._id,
                  PCName: cover?.PcatId?.PCName,
                  serviceId: cover?.serviceID,
                });
              }}
            >
              <View
                style={
                  {
                    // position: "absolute",
                    // bottom: 0,
                  }
                }
              >
                <View>
                  <FastImage
                    resizeMode={"contain"}
                    style={{
                      width: "100%",
                      height: imageHeight?.height,
                      borderBottomLeftRadius: 25,
                      borderBottomRightRadius: 25,
                    }}
                    source={{
                      uri: cover
                        ? Endpoints.baseUrl + cover?.CoverImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThb_fyo_ObDWBcJ0Ljg7Usoj1svJevxbkNw&usqp=CAU",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <CustomRow
                        ratios={[0, 0, 1]}
                        v_center
                        style={{
                          marginTop: 20,
                          paddingHorizontal: 10,
                          marginHorizontal: 10,
                        }}
                      >
                        {userData?.photo != undefined ? (
                          <CustomImage
                            round
                            size={30}
                            src={{ uri: Endpoints.baseUrl + userData?.photo }}
                          />
                        ) : (
                          <CustomIcon
                            name={"feed-person"}
                            type={"OCT"}
                            color={"white"}
                            size={30}
                          />
                        )}

                        <View
                          style={{
                            marginLeft: 10,
                          }}
                        >
                          <CustomText
                            medium
                            color={cover ? "white" : Theme.Black}
                            value={
                              userData
                                ? "Hi," + " " + userData?.name
                                : "Hi," + "user"
                            }
                          />
                          <CustomRow v_center>
                            <CustomText
                              size={12}
                              regular
                              color={cover ? "white" : "grey"}
                              value={currentAdress.substring(0, 30) + "..."}
                            />
                          </CustomRow>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            Navigation.navigate(Routes.SummaryScreen);
                          }}
                          style={{ alignSelf: "flex-end", marginRight: 10 }}
                        >
                          <CustomIcon
                            name={"shopping-cart"}
                            color={"white"}
                            size={20}
                            type={"ENT"}
                          />
                          {totalQuantity > 0 && (
                            <View
                              style={{
                                backgroundColor: "white",
                                borderRadius: 50, // Half of the width and height of the View
                                position: "absolute",
                                padding: 3,
                                right: -8, // Adjust position to align with the shopping cart icon
                                top: -8, // Adjust position to align with the shopping cart icon
                                justifyContent: "center", // Center the content vertically
                                alignItems: "center", // Center the content horizontally
                                width: 16, // Set the width and height to the same value
                                height: 16,
                              }}
                            >
                              <CustomText
                                color={Theme.PrimaryColor}
                                size={8}
                                value={totalQuantity}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                      </CustomRow>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingTop: 20,
                          paddingBottom: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            marginBottom: 5,
                            marginHorizontal: 6,
                            backgroundColor: "white",
                            borderRadius: 10,
                          }}
                          onPress={() => {
                            Navigation.navigate(Routes.SearchScreen);
                          }}
                        >
                          <CustomRow v_center style={Styles.searchBtnContainer}>
                            <CustomImage
                              style={{
                                marginVertical: 7,
                                marginLeft: 5,
                              }}
                              src={Assets.lens}
                              size={15}
                            />

                            <View style={styles.container}>
                              <CustomTypewriter
                                infinite
                                text={cCategory.length > 0 ? cCategory : abc}
                                delay={300}
                              />
                            </View>
                          </CustomRow>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </FastImage>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <>
            <View
              style={{
                backgroundColor: "white",
              }}
            >
              <CustomRow
                ratios={[0, 0, 1]}
                v_center
                style={{
                  marginTop: 20,
                  paddingHorizontal: 10,
                  marginHorizontal: 10,
                }}
              >
                {userData != null ? (
                  <CustomImage
                    round
                    size={30}
                    src={{ uri: Endpoints.baseUrl + userData?.photo }}
                  />
                ) : (
                  <CustomIcon
                    name={"feed-person"}
                    type={"OCT"}
                    color={"white"}
                    size={30}
                  />
                )}

                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <CustomText
                    medium
                    color={cover ? "white" : Theme.Black}
                    value={
                      userData ? "Hi," + " " + userData?.name : "Hi," + "user"
                    }
                  />
                  <CustomRow v_center>
                    <CustomText
                      size={12}
                      regular
                      color={cover ? "white" : "grey"}
                      value={currentAdress.substring(0, 30) + "..."}
                    />
                  </CustomRow>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.navigate(Routes.SummaryScreen);
                  }}
                  style={{ alignSelf: "flex-end", marginRight: 10 }}
                >
                  <CustomIcon
                    name={"shopping-cart"}
                    color={Theme.PrimaryColor}
                    size={20}
                    type={"ENT"}
                  />
                  {counter > 0 && (
                    <View
                      style={{
                        backgroundColor: Theme.PrimaryColor,
                        borderRadius: 50, // Half of the width and height of the View
                        position: "absolute",
                        padding: 3,
                        right: -8, // Adjust position to align with the shopping cart icon
                        top: -8, // Adjust position to align with the shopping cart icon
                        justifyContent: "center", // Center the content vertically
                        alignItems: "center", // Center the content horizontally
                        width: 16, // Set the width and height to the same value
                        height: 16,
                      }}
                    >
                      <CustomText color={"white"} size={7} value={counter} />
                    </View>
                  )}
                </TouchableOpacity>
              </CustomRow>
            </View>
          </>
        )}

        {cover == undefined || null ? (
          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 5,

              backgroundColor: "white",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                marginBottom: 5,
                marginHorizontal: 6,
                backgroundColor: "white",
                borderRadius: 10,
              }}
              onPress={() => {
                Navigation.navigate(Routes.SearchScreen);
              }}
            >
              <CustomRow v_center style={Styles.searchBtnContainer}>
                <CustomImage
                  style={{
                    marginVertical: 7,
                    marginLeft: 5,
                  }}
                  src={Assets.lens}
                  size={15}
                />

                <View style={styles.container}>
                  <CustomTypewriter
                    infinite
                    text={cCategory.length > 0 ? cCategory : abc}
                    delay={300}
                  />
                </View>
              </CustomRow>
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={{
            marginTop: 10,
          }}
        >
          <CustomCarasoul playable={false} swiperImages={HeroData} />
        </View>

        <CustomCard>
          <CustomHeading heading={"Service Category"} />

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={catogoryData}
            renderItem={renderList}
            numColumns={3}
          />
        </CustomCard>
        {offers4u.length > 0 && (
          <CustomCard>
            <CustomHeading heading={"Offers4U"} />

            <ScrollView
              contentContainerStyle={{ marginTop: 4 }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {offers4u?.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (item?.PCatId) {
                        if (item?.serviceID) {
                          Navigation.navigate(Routes.ServiceDetailsScreen, {
                            itemId: item?.CCatId?._id,
                            PCGroup: item?.PCatId?.PCGroup,
                            pcId: item?.PCatId?._id,
                            PCName: item?.PCatId?.PCName,
                            serviceId: item?.serviceID,
                          });
                        } else {
                          Navigation.navigate(Routes.ServiceDetailsScreen, {
                            itemId: item?.CCatId?._id,
                            PCGroup: item?.PCatId?.PCGroup,
                            pcId: item?.PCatId?._id,
                            PCName: item?.PCatId?.PCName,
                          });
                        }
                      }
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        marginHorizontal: 5,
                        padding: 10,
                        backgroundColor: item.OffersBgColor
                          ? item.OffersBgColor
                          : "#FF553433",
                        borderRadius: 14,
                        borderColor: "transparent",
                        paddingLeft: 10,
                        // flex: 1,
                        width: dimensions.width - 50,
                      }}
                    >
                      <CustomRow ratios={[1, 0]}>
                        <View>
                          <CustomText
                            align={"left"}
                            value={item.SubHeading}
                            color={"black"}
                          />

                          <RenderHTML
                            source={{ html: item.MainContent }}
                            contentWidth={100}
                            tagsStyles={{
                              p: { margin: "0px" },
                              h1: { margin: "0px" },
                              h2: { margin: "0px" },
                              h3: { margin: "0px" },
                              li: {
                                margin: "0px",
                                paddingLeft: 0,
                              },
                              ul: {
                                margin: "0px",
                                paddingLeft: 10,
                              },
                            }}
                          />
                          <TouchableOpacity
                            style={{
                              backgroundColor: item.ButtonBgColor
                                ? item.ButtonBgColor
                                : "white",
                              borderRadius: 20,
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                              top: 70,
                              padding: 10,
                              left: 0,
                              width: 120,
                            }}
                          >
                            <CustomText
                              value={item.ButtonText}
                              bold
                              color={
                                item?.ButtonTextColor
                                  ? item?.ButtonTextColor
                                  : "black"
                              }
                              size={10}
                            />
                          </TouchableOpacity>
                        </View>

                        <CustomImage
                          style={{
                            borderRadius: 10,
                          }}
                          src={{ uri: Endpoints.baseUrl + item.OffersImage }}
                          size={100}
                        />
                      </CustomRow>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </ScrollView>
          </CustomCard>
        )}

        <CustomCard>
          {Object.entries(servicecbytitle).map(([title, listData]) => (
            <View key={title}>{renderShortcut(title, listData)}</View>
          ))}
        </CustomCard>

        <CustomCard>
          {Object.entries(listsByTitle)?.map(([title, listData]) => (
            <View key={title}>{renderListt(title, listData)}</View>
          ))}
        </CustomCard>

        <FlatList
          data={imageHeights}
          renderItem={renderlastImageItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    color: "#757575",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
