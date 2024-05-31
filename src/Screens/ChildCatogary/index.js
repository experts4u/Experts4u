import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Assets from 'Assets';
import Container from 'Components/Container';
import CustomCarasoul from 'Components/CustomCarasoul';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomHeading from 'Components/CustomHeading';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import ElevatedCard from 'Components/ElevatedCard';
import Endpoints from 'Configs/API/Endpoints';
import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import useFetch from 'Hooks/useFetch';
import Routes from 'RootNavigation/Routes';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

export default function () {
  const {params} = useRoute();
  const focused = useIsFocused();
  const Navigation = useNavigation();
  const [focusedItem, setFocusedItem] = React.useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [headerText, setHeaderText] = useState('');
  const [catogoryData, setCatogoryData] = useState([]);
  const [brandUse, setBrandUse] = useState([]);
  const [TopBanners, setTopBanners] = useState([]);
  const [Faqs, setFaqs] = useState([]);
  const [testi, setTesti] = useState([]);
  const [userData, setUserData] = useState();
  const [imageHeights, setImageHeights] = useState([]);

  const user_info = useSelector(v => v.user.userInfo);

  const User_data = useFetch({
    endpoint: Endpoints.getUserDetails + user_info?.user?._id,
  });
  const getDetails = async () => {
    try {
      let details = await User_data.fetchPromise();
      setUserData(details.data);
    } catch (e) {
      console.log('err', e);
    }
  };

  let PCid = params.PCid;
  let PCGroup = params?.PCGroup;

  const TopBanner = useFetch({
    endpoint: Endpoints.getChildCTopBanner + PCid,
  });
  const GetTopBannerImages = async () => {
    try {
      let tBannerImg = await TopBanner.fetchPromise();
      // setHeroData(HeroSliderData.Data);
      // console.log('hhhh', HeroSliderData);

      let data = tBannerImg.data;
      // let tBannerImgs = data?.map(item => item.SliderImage);
      setTopBanners(data);
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50 || offsetY > 210) {
      setHeaderText(params ? params.pcname : 'saloon');
    } else {
      setHeaderText('');
    }
  };

  const ExpandableComponent = ({title, content, onPress, expanded}) => {
    return (
      <View
        style={{
          marginVertical: 10,
          borderWidth: 1,
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}>
        <TouchableOpacity onPress={onPress}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                fontFamily: Fonts.PoppinsBold,
                color: 'black',
              }}>
              {title}
            </Text>
            <CustomImage
              style={{
                alignSelf: 'center',
              }}
              size={14}
              resizeMode={'center'}
              src={expanded ? Assets.minus : Assets.plus}
            />
          </View>
        </TouchableOpacity>
        {expanded && (
          <CustomText regular style={{marginTop: 5}} value={content} />
        )}
      </View>
    );
  };

  const handlePress = index => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const renderItem = ({item, index, focusedIndex}) => {
    return (
      <View style={[styles.item, styles.focusedItem]}>
        {/* <Text style={styles.title}>{item.rev}</Text> */}
        <CustomText
          style={{
            marginTop: 20,
          }}
          value={item.content}
          size={12}
        />
        <CustomImage
          round
          size={50}
          src={{uri: Endpoints.baseUrl + item.Image}}
          style={{
            position: 'absolute',
            top: -25,
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (focused) {
      getDetails();
    }
  }, [focused]);

  const renderList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Navigation.navigate(Routes.ServiceDetailsScreen, {
            itemId: item._id,
            index: index,
            PCGroup: PCGroup,
            pcId: item.PCName[0],
            PCName: params ? params.pcname : 'saloon',
          })
        }
        style={{
          flex: 1,
          margin: 5,
          width: 100,

          alignItems: 'center',
        }}
        key={index}>
        <View
          style={{
            marginTop: 5,
          }}>
          <FastImage
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
            }}
            source={{uri: Endpoints.baseUrl + item.CCimage}}
          />
          {item?.CCNotice && (
            <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0.5)']}
              style={{
                height: 20,
                // width: ,
                position: 'absolute',
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                // borderRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              start={{x: 0, y: 0}} // gradient start position
              end={{x: 1, y: 1}} // gradient end position
            >
              <View
                style={
                  {
                    // backgroundColor:"linear-gradient(174deg, transparent, rgba(0, 0, 0, .9))"
                  }
                }>
                <CustomText
                  size={11}
                  medium
                  color={'white'}
                  value={item?.CCNotice}
                />
              </View>
            </LinearGradient>
          )}
        </View>

        <View style={{}}>
          <CustomText
            align={'center'}
            regular
            size={12}
            style={{
              marginTop: 5,
              paddingHorizontal: 7,
            }}
            value={item.CCName}
          />
        </View>
        {/* </ElevatedCard> */}
      </TouchableOpacity>
    );
  };

  let e4u = [
    {
      img: Assets.ontime,
      title: 'On time & Trained Expert',
      brief:
        'Our Experts are well trained & will reach on time on your service. (On time, every time).',
    },
    {
      img: Assets.singlekit,
      title: 'Single Kit & Branded Products',
      brief:
        'All our experts use only Branded & single time use Sachet Packets.',
    },
    {
      img: Assets.safety,
      title: 'Single Kit & Branded Products',
      brief:
        'Your Safety is utmost important for us. Expert will sanitized tools & equipments before and after Service.',
    },
    {
      img: Assets.hygene,
      title: 'Hygiene & mess dree service',
      brief: 'Your House will be left with no mess at all after services.',
    },
    {
      img: Assets.transperent,
      title: 'Transparent Pricing',
      brief:
        'Our Experts are well trained & will reach on time on your service. (On time, every time).',
    },
    {
      img: Assets.packaged,
      title: 'Package Customizations',
      brief: 'Freedom to customize your own Package.',
    },
  ];

  const Child_category = useFetch({
    endpoint: Endpoints.getChildCategory + PCid,
    Token: false,
  });
  const Brandweuse = useFetch({
    endpoint: Endpoints.getBrandweuse + PCid,
    Token: false,
  });
  const Testinomial = useFetch({
    endpoint: Endpoints.getTestinomial + PCid,
    Token: false,
  });
  const GetFaq = useFetch({
    endpoint: Endpoints.getFaqs + PCid,
    Token: false,
  });

  const GetFaqData = async () => {
    try {
      let Faqs = await GetFaq.fetchPromise();
      setFaqs(Faqs.data[0].Faqs);
    } catch (e) {
      console.log('err', e);
    }
  };
  const GetbrandWeUse = async () => {
    try {
      let Brands = await Brandweuse.fetchPromise();
      setBrandUse(Brands.data[0].BrandLogo);
    } catch (e) {
      console.log('err', e);
    }
  };
  const GetTestinomial = async () => {
    try {
      let Testi = await Testinomial.fetchPromise();

      setTesti(Testi.data);
    } catch (e) {
      console.log('err', e);
    }
  };

  const getChildCategory = async () => {
    try {
      let Ccategory = await Child_category.fetchPromise();
      setCatogoryData(Ccategory.data);
    } catch (e) {
      console.log('err', e);
    }
  };

  useEffect(() => {
    getChildCategory();
  }, []);
  useEffect(() => {
    GetbrandWeUse();
  }, []);
  useEffect(() => {
    GetFaqData();
  }, []);
  useEffect(() => {
    GetTestinomial();
    GetTopBannerImages();
  }, []);

  let EditPackageName = catogoryData?.find(
    item => item.CCName === 'Make Your Package',
  );

  let CustomizePackage = catogoryData?.find(item =>
    /^Book any/i.test(item.CCName),
  );

  let EditPackageIndex = catogoryData?.find(
    item => item.CCName === 'Make Your Package',
  );

  let pcname = params?.pcname;

  // useEffect(() => {
  //   const calculateImageHeights = async () => {
  //     try {
  //       if (brandUse?.length === 0) return; // Prevent unnecessary calculation if lastImage is empty

  //       const heights = await Promise.all(
  //         brandUse?.map(async (image, index) => {
  //           console.log('image andar vali', image);
  //           return new Promise((resolve, reject) => {
  //             Image.getSize(
  //               Endpoints.baseUrl + image,
  //               (width, height) => {
  //                 const calculatedHeight =
  //                   (Dimensions.get('window').width / width) * height;
  //                 resolve({id: index, height: calculatedHeight});
  //               },
  //               reject,
  //             );
  //           });
  //         }),
  //       );
  //       setImageHeights(heights);
  //     } catch (error) {
  //       console.error('Error fetching image sizes:', error);
  //       // Handle the error here (e.g., display an error message to the user)
  //     }
  //   };

  //   calculateImageHeights();
  // }, [brandUse]);

  return (
    <Container>
      <CustomRow
        ratios={[0, 1, 0]}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
          }}
          onPress={() => {
            Navigation.goBack();
          }}>
          <CustomIcon
            type={'AN'}
            size={25}
            color={Theme.PrimaryColor}
            name={'arrowleft'}
          />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: 'flex-start',
          }}>
          <CustomText margin_h={10} medium color={'black'} value={headerText} />
        </View>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Routes.SearchScreen);
          }}>
          <CustomIcon
            type={'AN'}
            size={25}
            color={Theme.PrimaryColor}
            name={'search1'}
          />
        </TouchableOpacity>
      </CustomRow>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 30,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            marginTop: 10,
          }}>
          <CustomCarasoul playable={true} swiperImages={TopBanners} />
        </View>

        <CustomCard>
          <View style={{}}>
            <CustomHeading heading={params ? params.pcname : 'saloon'} />
          </View>

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            <CustomImage
              onPress={() => {
                Navigation.navigate(Routes.ServiceDetailsScreen, {
                  itemId: CustomizePackage._id,
                  PCGroup: PCGroup,
                  pcId: CustomizePackage?.PCName[0],
                  PCName: pcname,
                });
              }}
              resizeMode={'contain'}
              src={Assets.package}
              style={{
                height: 88,
                width: '100%',
                // borderRadius: 20,
              }}
            />
          </View>
        </CustomCard>
        <CustomCard>
          <CustomHeading heading={'Trending Services'} />

          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={catogoryData}
              renderItem={renderList}
              numColumns={3}
            />
          </View>
        </CustomCard>
        {/* <CustomCard> */}
        <View
          style={{
            backgroundColor: Theme.PrimaryColor,
            marginTop: 8,

            borderRadius: 20,
            marginHorizontal: 10,
            width: '90%',
          }}>
          <CustomRow
            style={{
              justifyContent: 'space-between',
              paddingLeft: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                Navigation.navigate(Routes.ServiceDetailsScreen, {
                  itemId: EditPackageName._id,
                  PCGroup: PCGroup,
                  pcId: EditPackageIndex?.PCName[0],
                  PCName: pcname,
                });
              }}
              style={{
                marginTop: 20,
              }}>
              <CustomText
                value={'Let’s make a package just for you,'}
                style={{
                  fontFamily: Fonts.PoppinsMedium,
                }}
                color={'white'}
                size={13}
              />
              <CustomText
                value={userData?.name + ' !'}
                medium
                color={'white'}
                size={13}
              />
              <CustomRow v_center>
                <CustomText
                  value={params ? params.pcname : 'saloon'}
                  bold
                  color={'white'}
                  margin_v={6}
                  size={13}
                  style={{
                    marginRight: 6,
                  }}
                />
                <CustomIcon
                  size={14}
                  name={'arrowright'}
                  type={'AN'}
                  color={'white'}
                />
              </CustomRow>

              {/* <CustomHeading heading={'Saloon for women'} /> */}
            </TouchableOpacity>
            <CustomImage
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
              }}
              src={Assets.cardsecondimg}
              resizeMode={'center'}
            />
          </CustomRow>
        </View>
        {/* </CustomCard> */}

        {brandUse.length > 0 && (
          <CustomCard>
            <CustomHeading heading={'Brands we use'} />
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {brandUse.map((item, index) => {
                return (
                  <CustomImage
                    style={{
                      marginHorizontal: 10,

                      height: 70,
                      width: 70,
                    }}
                    src={{uri: Endpoints.baseUrl + item}}
                    key={index}
                    resizeMode={'cover'}
                  />
                );
              })}
            </ScrollView>
          </CustomCard>
        )}

        <CustomCard>
          <CustomHeading heading={'E4U Promise'} />

          {e4u.length > 0 &&
            e4u.map((item, index) => {
              return (
                <View
                  style={{
                    backgroundColor: '#F5F6FB',
                    marginVertical: 3,
                    borderRadius: 10,
                    paddingVertical: 5,
                    paddingBottom: 10,
                    marginHorizontal: 10,
                  }}>
                  <CustomRow
                    h_center
                    ratios={[0, 1]}
                    spacing={30}
                    style={{
                      marginHorizontal: 10,
                      marginTop: 8,
                      paddingLeft: 10,
                    }}>
                    <View>
                      <CustomImage
                        resizeMode={'center'}
                        size={45}
                        src={item.img}
                        style={{
                          marginTop: 8,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                      }}>
                      <CustomText
                        size={11.65}
                        bold
                        align={'left'}
                        value={item.title}
                        style={{
                          margin: 0,
                        }}
                      />
                      <CustomText size={10} align={'left'} value={item.brief} />
                    </View>
                  </CustomRow>
                </View>
              );
            })}
        </CustomCard>

        {testi.length > 0 && (
          <CustomCard>
            <CustomHeading heading={'Testimonials'} />
            <View
              style={{
                flex: 1,
              }}>
              <FlatList
                horizontal
                data={testi}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </CustomCard>
        )}

        {Faqs.length > 0 && (
          <CustomCard>
            <CustomHeading heading={'FAQs'} />

            {Faqs.map((item, index) => {
              return (
                <ExpandableComponent
                  key={index}
                  title={item.Question}
                  content={item.Ans}
                  onPress={() => handlePress(index)}
                  expanded={index === expandedIndex}
                />
              );
            })}
          </CustomCard>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#F5F6FB',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: 'grey',
    marginTop: 30,
    borderRadius: 20,
  },

  focusedItem: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
  },
});
