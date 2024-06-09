import { useIsFocused, useNavigation } from "@react-navigation/native";
import Assets from "Assets";
import CustomCard from "Components/CustomCard";
import CustomHeader from "Components/CustomHeader";
import CustomIcon from "Components/CustomIcon";
import CustomImage from "Components/CustomImage";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import Endpoints from "Configs/API/Endpoints";
import Theme from "Configs/Theme";
import useFetch from "Hooks/useFetch";
import { clearData } from "ReduxState/Slices/UserSlice";
import Routes from "RootNavigation/Routes";
import { useEffect, useState } from "react";
import { Linking, Share, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const Navigation = useNavigation();
  const user_info = useSelector((v) => v.user.userInfo);
  const Dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const focused = useIsFocused();

  const LogOut = () => {
    Dispatch(clearData());
    Navigation.reset({
      routes: [
        {
          name: Routes.AuthStack,
        },
      ],
    });
  };

  let booking = [
    {
      title: "Bookings",
      myboo: "My booking",
      mybooimg: "calendar-check-o",
      myfav: "Favourite booking",
      myfavimg: "favorite",
      myadd: "My Address",
      // myadd:"",
      myaddimg: "location-pin",
      myaddIconType: "ENT",
      bookimg: "question",
      mybook: "Booking help",
      mybookicontype: "AN",
      navtobooking: Routes.MyBooking,
      favIconType: "M",
      mybookingitemtype: "FA",
    },
  ];

  let Payments = [
    {
      title: "Payments",
      myboo: "My Wallet",
      walleticonname: "wallet",
      walleticontype: "ENT",
      mybooimg: Assets.walletred,
      myfav: "My Benefits",
      myfavimg: Assets.dollarred,
      myadd: "Refer and Earn",
      myaddimg: Assets.dollarred,
      bookimg: Assets.paymentmethd,
      mybook: "My Payment Methods",
    },
  ];
  let More = [
    {
      title: "More",
      aboutus: "About Us",
      aboutimg: Assets.aboutus,
      myboo: "Privacy Policy",
      mybooimg: Assets.privacypolicy,
      myfav: "Terms & Condition",
      myfavimg: Assets.privacypolicy,
      myadd: "Support",
      myaddimg: Assets.support,
      // bookimg: Assets.feedback,
      // mybook: "Give us a Feadback",
      myrat: "My Rating",
      myratimg: Assets.myratimg,
      share: "Share E4U",
      shareimg: Assets.shareimg,
    },
  ];

  const ItemCard = ({
    title,
    mybooimg,
    myboo,
    myfavimg,
    myfav,
    myaddimg,
    myadd,
    bookimg,
    mybook,
    walleticonname,
    walleticontype,
  }) => {
    return (
      <CustomCard
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      >
        <CustomRow v_center>
          <View
            style={{
              backgroundColor: Theme.PrimaryColor,
              width: 5,
              height: 20,
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
            }}
          />
          <CustomText size={14} margin_h={10} bold value={title} />
        </CustomRow>
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Routes.Wallet);
          }}
        >
          <CustomRow
            v_center
            ratios={[0, 1, 0]}
            style={{
              marginVertical: 10,
              marginTop: 20,
              marginLeft: 30,
            }}
          >
            <CustomIcon
              type={walleticontype}
              size={15}
              color={Theme.PrimaryColor}
              name={walleticonname}
            />

            <CustomText
              // margin_h={10}
              value={myboo}
              medium
              color={Theme.Black}
              style={{
                marginLeft: 20,
              }}
            />
            <CustomIcon
              name={"right"}
              type={"AN"}
              color={Theme.PrimaryColor}
              size={17}
            />
          </CustomRow>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Routes.MyBenifits);
          }}
        >
          <CustomRow
            v_center
            ratios={[0, 1, 0]}
            style={{
              marginVertical: 10,
              marginTop: 20,
              marginLeft: 30,
            }}
          >
            {/* <CustomImage src={myfavimg} resizeMode={'center'} size={15} /> */}
            <CustomIcon
              name={"dollar-sign"}
              size={15}
              color={Theme.PrimaryColor}
              type={"FE"}
            />
            <CustomText
              // margin_h={10}
              value={myfav}
              medium
              color={Theme.Black}
              style={{
                marginLeft: 20,
              }}
            />
            <CustomIcon
              name={"right"}
              type={"AN"}
              color={Theme.PrimaryColor}
              size={17}
            />
          </CustomRow>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Routes.ReferEarnScreen);
          }}
        >
          <CustomRow
            v_center
            ratios={[0, 1, 0]}
            style={{
              marginVertical: 10,
              marginTop: 20,
              marginLeft: 30,
            }}
          >
            {/* <CustomImage src={myaddimg} resizeMode={'center'} size={15} /> */}
            <CustomIcon
              name={"money"}
              color={Theme.PrimaryColor}
              size={15}
              type={"FA"}
            />
            <CustomText
              // margin_h={10}
              value={myadd}
              medium
              color={Theme.Black}
              style={{
                marginLeft: 20,
              }}
            />
            <CustomIcon
              name={"right"}
              type={"AN"}
              color={Theme.PrimaryColor}
              size={17}
            />
          </CustomRow>
        </TouchableOpacity>

        <CustomRow
          v_center
          ratios={[0, 1, 0]}
          style={{
            marginVertical: 10,
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          {/* <CustomImage src={bookimg} resizeMode={'center'} size={15} /> */}
          <CustomIcon
            name={"payment"}
            type={"M"}
            color={Theme.PrimaryColor}
            size={15}
          />
          <CustomText
            value={mybook}
            medium
            color={Theme.Black}
            style={{
              marginLeft: 20,
            }}
          />
          <CustomIcon
            name={"right"}
            type={"AN"}
            color={Theme.PrimaryColor}
            size={17}
          />
        </CustomRow>
      </CustomCard>
    );
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "https://experts4u.in/", // Message to be shared
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared successfully
          console.log("Shared successfully");
        } else {
          // Dismissed the share sheet
          console.log("Dismissed the share sheet");
        }
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed
        console.log("Share was dismissed");
      }
    } catch (error) {
      // Error while sharing
      console.error("Error while sharing:", error.message);
    }
  };

  const User_data = useFetch({
    endpoint: user_info?.user
      ? Endpoints.getUserDetails + user_info?.user?._id
      : Endpoints.getUserDetails + user_info?._id,
  });

  const getDetails = async () => {
    try {
      let details = await User_data.fetchPromise();
      setUserData(details.data);
    } catch (e) {
      console.log("err", e);
    }
  };

  // useEffect(() => {
  //   if (focused) {
  //     getDetails();
  //   }
  // }, [focused]);

  useEffect(() => {
    if (user_info?._id || (user_info?.user?._id && focused)) {
      getDetails();
    }
  }, [focused]);

  return (
    <View>
      <CustomHeader l_type={"back_arrow"} title={"Profile"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        <CustomCard
          style={{
            paddingBottom: 10,
            marginTop: 10,
          }}
        >
          <CustomRow
            ratios={[1, 0]}
            style={{
              marginHorizontal: 10,
            }}
          >
            <View>
              <CustomText
                value={userData ? userData?.name : "User"}
                bold
                size={15}
                color={Theme.Black}
              />

              <CustomText
                value={userData ? userData?.email : "emailid@gmail.com"}
                regular
                size={11}
              />
              <CustomText
                value={userData ? userData?.mobileNo : "+91 1234567890"}
                regular
                size={11}
              />

              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.EditProfileScreen);
                }}
              >
                <CustomRow
                  style={{
                    marginTop: 10,
                  }}
                  v_center
                >
                  <CustomText
                    color={Theme.PrimaryColor}
                    medium
                    value={"Edit Profile "}
                  />
                  <CustomIcon
                    name={"arrowright"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={16}
                  />
                </CustomRow>
              </TouchableOpacity>
            </View>

            <CustomImage
              src={{
                uri: userData?.photo
                  ? Endpoints.baseUrl + userData?.photo
                  : "https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-600x629.jpg",
              }}
              size={60}
              resizeMode={"cover"}
              round
            />
          </CustomRow>
        </CustomCard>

        {booking.map((item, index) => {
          return (
            <CustomCard
              style={{
                paddingBottom: 10,
                paddingHorizontal: 10,
                paddingTop: 20,
              }}
            >
              <CustomRow v_center>
                <View
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    width: 5,
                    height: 20,
                    borderTopRightRadius: 3,
                    borderBottomRightRadius: 3,
                  }}
                />
                {/* <CustomImage
                    resizeMode={"center"}
                    size={20}
                    src={Assets.rectangle}
                  /> */}
                <CustomText size={14} margin_h={10} bold value={item.title} />
              </CustomRow>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(item.navtobooking);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    type={item.mybookingitemtype}
                    size={15}
                    color={Theme.PrimaryColor}
                    name={item.mybooimg}
                  />
                  {/* <CustomImage
                      src={item.mybooimg}
                      resizeMode={'center'}
                      size={15}
                    /> */}
                  <CustomText
                    // margin_h={10}
                    value={item.myboo}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.FavouriteBookingScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={item.myfavimg}
                    type={item.favIconType}
                    size={15}
                    color={Theme.PrimaryColor}
                  />

                  <CustomText
                    // margin_h={10}
                    value={item.myfav}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.MyAddressScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={item.myaddimg}
                    type={item.myaddIconType}
                    color={Theme.PrimaryColor}
                    size={15}
                  />

                  <CustomText
                    // margin_h={10}
                    value={item.myadd}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.BookingHelpScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={item.bookimg}
                    type={item.mybookicontype}
                    size={15}
                    color={Theme.PrimaryColor}
                  />

                  <CustomText
                    value={item.mybook}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
            </CustomCard>
          );
        })}

        {Payments.map((item, index) => {
          return (
            <ItemCard
              walleticonname={item.walleticonname}
              walleticontype={item.walleticontype}
              key={index}
              title={item.title}
              myadd={item.myadd}
              myboo={item.myboo}
              bookimg={item.bookimg}
              myaddimg={item.myaddimg}
              mybooimg={item.mybooimg}
              mybook={item.mybook}
              myfav={item.myfav}
              myfavimg={item.myfavimg}
            />
          );
        })}

        {More.map((item, index) => {
          return (
            <CustomCard
              style={{
                paddingBottom: 10,
                paddingHorizontal: 10,
                paddingTop: 20,
              }}
            >
              <CustomRow v_center>
                <View
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    width: 5,
                    height: 20,
                    borderTopRightRadius: 3,
                    borderBottomRightRadius: 3,
                  }}
                />
                <CustomText size={14} margin_h={10} bold value={item.title} />
              </CustomRow>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.AboutUsScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={"info"}
                    size={15}
                    color={Theme.PrimaryColor}
                    type={"FE"}
                  />
                  {/* <CustomImage
                      src={item.aboutimg}
                      resizeMode={'center'}
                      size={15}
                    /> */}
                  <CustomText
                    // margin_h={10}
                    value={item.aboutus}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://experts4u.in/privacy-policy");
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  {/* <CustomImage
                      src={item.mybooimg}
                      resizeMode={'center'}
                      size={15}
                    /> */}

                  <CustomIcon
                    name={"privacy-tip"}
                    color={Theme.PrimaryColor}
                    size={15}
                    type={"M"}
                  />
                  <CustomText
                    // margin_h={10}
                    value={item.myboo}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://experts4u.in/terms");
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={"private-connectivity"}
                    color={Theme.PrimaryColor}
                    size={15}
                    type={"M"}
                  />
                  <CustomText
                    // margin_h={10}
                    value={item.myfav}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.SupportScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={"support-agent"}
                    type={"M"}
                    size={15}
                    color={Theme.PrimaryColor}
                  />
                  <CustomText
                    value={item.myadd}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.WriteReviewScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={"feedback"}
                    size={15}
                    type={"M"}
                    color={Theme.PrimaryColor}
                  />
                  <CustomText
                    value={item.mybook}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => {
                  Navigation.navigate(Routes.MyRatingScreen);
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={"star-outlined"}
                    size={15}
                    color={Theme.PrimaryColor}
                    type={"ENT"}
                  />
                  <CustomText
                    value={item.myrat}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  handleShare();
                }}
              >
                <CustomRow
                  v_center
                  ratios={[0, 1, 0]}
                  style={{
                    marginVertical: 10,
                    marginTop: 20,
                    marginLeft: 30,
                  }}
                >
                  <CustomIcon
                    name={"share"}
                    size={15}
                    color={Theme.PrimaryColor}
                    type={"FA"}
                  />
                  <CustomText
                    value={item.share}
                    medium
                    color={Theme.Black}
                    style={{
                      marginLeft: 20,
                    }}
                  />
                  <CustomIcon
                    name={"right"}
                    type={"AN"}
                    color={Theme.PrimaryColor}
                    size={17}
                  />
                </CustomRow>
              </TouchableOpacity>
            </CustomCard>
          );
        })}

        <CustomCard
          style={{
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              LogOut();
            }}
          >
            <CustomRow
              style={{
                marginHorizontal: 10,
                marginVertical: 20,
              }}
              ratios={[0, 1, 0]}
              v_center
            >
              <CustomIcon
                name={"logout"}
                color={Theme.PrimaryColor}
                size={17}
                type={"MC"}
              />
              <CustomText margin_h={20} value={"Logout"} medium />
              <CustomIcon
                name={"right"}
                type={"AN"}
                color={Theme.PrimaryColor}
                size={17}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomCard>
      </ScrollView>
    </View>
  );
}
