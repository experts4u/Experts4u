import {useIsFocused, useNavigation} from '@react-navigation/native';
import Assets from 'Assets';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomHeading from 'Components/CustomHeading';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import {useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import Routes from 'RootNavigation/Routes';
import * as React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Fonts from 'Configs/Fonts';
import Endpoints from 'Configs/API/Endpoints';
import {useEffect} from 'react';
import useFetch from 'Hooks/useFetch';
import {useSelector} from 'react-redux';

export default function () {
  const focused = useIsFocused();
  const user = useSelector(v => v?.user?.userInfo?.user);
  const Navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetBookings = useFetch({
    endpoint: Endpoints.MyBokings + '/' + user?._id,
    Token: false,
  });

  const mbokings = async () => {
    setLoading(true);
    try {
      let Charges = await GetBookings.fetchPromise();
      setBookingData(Charges.data?.jobs);

      setLoading(false);
    } catch (e) {
      console.log('err', e);
    }
  };
  useEffect(() => {
    if (focused) {
      mbokings();
    }
  }, [focused]);

  function filterTodayBookings(bookingData) {
    const today = new Date();
    const todayFormatted = today?.toISOString().split('T')[0];

    return (
      bookingData &&
      bookingData?.filter(booking => {
        return booking?.slotDate?.split('T')[0] === todayFormatted;
      })
    );
  }

  const todayBookings = filterTodayBookings(bookingData);

  const FirstRoute = () => (
    <ScrollView>
      {todayBookings.length > 0 &&
        todayBookings?.map((item, index) => (
          <CustomCard
            key={index}
            Clickable
            onPress={() => {
              Navigation.navigate(Routes.BookingOrderDetailScreen, {item});
            }}
            style={{
              marginTop: 5,
            }}>
            <CustomHeading heading={'Order Id -' + item?.jobId} />
            <CustomRow
              ratios={[1, 0]}
              style={{
                marginHorizontal: 10,
              }}>
              <View>
                <CustomText regular value={item?.cart[0]?.PCGroup?.PCGName} />
                <CustomText regular value={item?.slotDate.slice(0, 10)} />
                <CustomText regular value={item?.slotTime} />
              </View>
              {/*  */}
              <View>
                {item?.jobStatus == 0 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#346cb0',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Shedule'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 1 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#346cb0',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Open'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 2 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#f7c46c',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'black'}
                      regular
                      value={'Start Journey'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 3 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#f7c46c',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'black'}
                      regular
                      value={'Stop Journey'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 4 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e0751a',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Progress'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 5 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#346cb0',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Pause'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 6 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e0751a',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Progress'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 7 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#65bd14',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Closed'}
                      size={10}
                    />
                  </View>
                )}

                {item?.jobStatus == 9 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Canceled'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 10 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Cancel IR'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 11 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Cancel CR'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 12 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Cancel NR'}
                      size={10}
                    />
                  </View>
                )}
                {/* {item?.jobStatus == 0 ||
                item?.jobStatus == 7 ||
                item?.jobStatus == 9 ||
                item?.jobStatus == 10 ||
                item?.jobStatus == 11 ||
                item?.jobStatus == 12 ? null : (
                  <CustomText regular value={'SP Assigned' + item?.jobStatus} />
                )} */}
                {item?.jobStatus != 0 &&
                item?.jobStatus != 7 &&
                item?.jobStatus != 9 &&
                item?.jobStatus != 10 &&
                item?.jobStatus != 11 &&
                item?.jobStatus != 12 ? (
                  <CustomText
                    regular
                    size={12}
                    margin_v={10}
                    value={'SP Assigned'}
                  />
                ) : null}
              </View>
            </CustomRow>

            {/* <CustomRow
              style={{
                marginTop: 10,
              }}
              v_center>
              <CustomIcon
                type={'ENT'}
                size={20}
                color={Theme.PrimaryColor}
                name={'location-pin'}
              />
              <CustomText
                margin_h={3}
                style={{
                  textDecorationLine: 'underline',
                }}
                value={'Track Partner location'}
              />
            </CustomRow> */}

            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#E3E3E3FF',

                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginHorizontal: 10,
                borderStyle: 'dashed',
              }}>
              <CustomText
                margin_v={10}
                bold
                color={Theme.Black}
                value={'View details'}
              />
            </View>
          </CustomCard>
        ))}
    </ScrollView>
  );

  const CancelledAppointments = bookingData.filter(
    appointment => appointment.slotDate === 'Cancel',
  );

  const ThirdRoute = () => (
    <ScrollView>
      {CancelledAppointments &&
        CancelledAppointments?.map((item, index) => (
          <CustomCard
            key={index}
            Clickable
            onPress={() => {
              Navigation.navigate(Routes.BookingOrderDetailScreen, {item});
            }}
            style={{
              marginTop: 5,
            }}>
            <CustomHeading heading={'Order Id' + item?.jobId} />
            <CustomRow
              ratios={[1, 0]}
              style={{
                marginHorizontal: 10,
              }}>
              <View>
                <CustomText regular value={item?.cart[0]?.PCGId?.PCGName} />
                <CustomText regular value={'08-May, 2023 Mon,'} />
                <CustomText regular value={item?.TServiceTiming} />
              </View>

              <View>
                <CustomText
                  color={Theme.PrimaryColor}
                  bold
                  value={item?.jobStatus}
                />
                <CustomText regular value={'SP Assigned'} />
              </View>
            </CustomRow>

            {/* <CustomRow
              style={{
                marginTop: 10,
              }}
              v_center>
              <CustomIcon
                type={'ENT'}
                size={20}
                color={Theme.PrimaryColor}
                name={'location-pin'}
              />
              <CustomText
                margin_h={3}
                style={{
                  textDecorationLine: 'underline',
                }}
                value={'Track Partner location'}
              />
            </CustomRow> */}

            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#E3E3E3FF',

                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginHorizontal: 10,
                borderStyle: 'dashed',
              }}>
              <CustomText
                margin_v={10}
                bold
                color={Theme.Black}
                value={'View details'}
              />
            </View>
          </CustomCard>
        ))}
    </ScrollView>
  );

  console.log('todayBookings', todayBookings);

  const SecondRoute = () => (
    <ScrollView>
      {bookingData &&
        bookingData?.map((item, index) => (
          <CustomCard
            key={index}
            Clickable
            onPress={() => {
              Navigation.navigate(Routes.BookingOrderDetailScreen, {item});
            }}
            style={{
              marginTop: 5,
            }}>
            <CustomHeading heading={'Order Id -' + item?.jobId} />
            <CustomRow
              ratios={[1, 0]}
              style={{
                marginHorizontal: 10,
              }}>
              <View>
                <CustomText regular value={item?.cart[0]?.PCGroup?.PCGName} />
                <CustomText regular value={item?.slotDate?.slice(0, 10)} />
                <CustomText regular value={item?.slotTime} />
              </View>
              {/*  */}
              <View>
                {item?.jobStatus == 0 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#346cb0',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Shedule'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 1 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#346cb0',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Open'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 2 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#f7c46c',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'black'}
                      regular
                      value={'Start Journey'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 3 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#f7c46c',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'black'}
                      regular
                      value={'Stop Journey'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 4 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e0751a',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Progress'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 5 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#346cb0',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Pause'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 6 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e0751a',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Progress'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 7 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#65bd14',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Closed'}
                      size={10}
                    />
                  </View>
                )}

                {item?.jobStatus == 9 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Canceled'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 10 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Cancel IR'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 11 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Cancel CR'}
                      size={10}
                    />
                  </View>
                )}
                {item?.jobStatus == 12 && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#e22d2d',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      color={'white'}
                      regular
                      value={'Cancel NR'}
                      size={10}
                    />
                  </View>
                )}
                {/* {item?.jobStatus == 0 ||
                item?.jobStatus == 7 ||
                item?.jobStatus == 9 ||
                item?.jobStatus == 10 ||
                item?.jobStatus == 11 ||
                item?.jobStatus == 12 ? null : (
                  <CustomText regular value={'SP Assigned' + item?.jobStatus} />
                )} */}
                {item?.jobStatus != 0 &&
                item?.jobStatus != 7 &&
                item?.jobStatus != 9 &&
                item?.jobStatus != 10 &&
                item?.jobStatus != 11 &&
                item?.jobStatus != 12 ? (
                  <CustomText
                    regular
                    size={12}
                    margin_v={10}
                    value={'SP Assigned'}
                  />
                ) : null}
              </View>
            </CustomRow>

            {/* <CustomRow
              style={{
                marginTop: 10,
              }}
              v_center>
              <CustomIcon
                type={'ENT'}
                size={20}
                color={Theme.PrimaryColor}
                name={'location-pin'}
              />
              <CustomText
                margin_h={3}
                style={{
                  textDecorationLine: 'underline',
                }}
                value={'Track Partner location'}
              />
            </CustomRow> */}

            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#E3E3E3FF',

                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginHorizontal: 10,
                borderStyle: 'dashed',
              }}>
              <CustomText
                margin_v={10}
                bold
                color={Theme.Black}
                value={'View details'}
              />
            </View>
          </CustomCard>
        ))}
    </ScrollView>
  );

  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'Upcoming'},
      {key: 'second', title: 'Second'},
    ],
  };

  const RenderTabBar = ({navigationState, position}) => {
    const inputRange = navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {navigationState.routes.map((route, i) => {
          const isActive = index === i;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.tabItem,
                {
                  borderBottomColor: isActive ? Theme.PrimaryColor : 'white',
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                  backgroundColor: 'white',
                },
              ]}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{
                  fontSize: 14,
                  color: isActive ? Theme.PrimaryColor : 'grey',
                  fontFamily: Fonts.PoppinsMedium,
                }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <CustomHeader
        leftComponent={
          <CustomIcon
            name={'arrowleft'}
            type={'AN'}
            color={Theme.PrimaryColor}
          />
        }
        l_type={'back_arrow'}
        title={'My Bookings'}
      />
      {bookingData?.length > 0 ? (
        <TabView
          navigationState={{
            index,
            routes: [
              {key: 'first', title: 'Ongoing'},
              {key: 'second', title: 'History/Upcoming'},
            ],
          }}
          renderScene={_renderScene}
          renderTabBar={RenderTabBar}
          onIndexChange={setIndex}
        />
      ) : (
        <CustomText value={'No Bookings yet'} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    // padding: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
