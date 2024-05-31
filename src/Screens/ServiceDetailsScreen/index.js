import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Container from 'Components/Container';
import CustomButton from 'Components/CustomButton';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Endpoints from 'Configs/API/Endpoints';
import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import useFetch from 'Hooks/useFetch';
import Routes from 'RootNavigation/Routes';
import React, {useEffect, useRef, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import {
  FlatList,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RenderHTML from 'react-native-render-html';
import AnimatedModal from 'Components/AnimatedModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  clearAllHistory,
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeByType,
  removeFromCart,
  updateItemInCart,
} from 'ReduxState/Slices/UserSlice';
import {Dropdown} from 'react-native-element-dropdown';
import ToastMessage from 'Utils/ToastMessage';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import CustomHeading from 'Components/CustomHeading';
import ElevatedCard from 'Components/ElevatedCard';
import Loader from 'Components/CustomLoader';
import {Image} from 'react-native';
import Assets from 'Assets';
// import DropDown from 'Components/Dropdown';

export default function () {
  const modelRef = useRef(null);
  const flatListRef = useRef(null);
  const itemsRef = useRef(null);
  const ViewDetailsRef = useRef(null);
  const GroupRef = useRef(null);
  const viewDetailsPackage = useRef();
  const focused = useIsFocused();
  const customizePackageRef = useRef(null);
  const selectServiceModal = useRef(null);
  const scrollViewRef = useRef(null);
  const scrollViewchildRef = useRef(null);

  const {params} = useRoute();
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(params?.itemId);
  const [allData, setAllData] = useState([]);
  const [groupName, setGroupName] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [getDatabyId, setGetDatabyId] = useState(params?.itemId);

  const Navigation = useNavigation();
  const [selectedpackagedata, setSelectedpackagedata] = useState();
  const [editableTotalPrice, setEditableTotalPrice] = useState(0);
  const [selectedServiceVariantPrice, setSelectedServiceVariantPrice] =
    useState(0);
  const [editableRegulerPrice, setEditableRegulerPrice] = useState(0);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCustomizeServices, setSelectedcustomizeServices] = useState(
    [],
  );
  const [viewDetails, setViewDetails] = useState();
  const [viewDetailsPackageModal, setviewDetailsPackageModal] = useState();
  const [totalTime, setTotalTime] = useState(0);
  const [totalCustomizeTime, setTotalCustomizeTime] = useState(0);
  const [customizeTotalPrice, setCustomizeTotalPrice] = useState(0);
  const [customizeRegulerPrice, setCustomizeRegulerPrice] = useState(0);
  const [catogoryData, setCatogoryData] = useState([]);
  const [Childloading, setChildLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();
  const [groupCheck, setgroupCheck] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCustomizePackageData, setselectedCustomizePackageData] =
    useState();
  const [selectedServicePrices, setSelectedServicePrices] = useState({});
  const [selectedVariants, setSelectedVariants] = useState();
  const [selectedService, setSelectedService] = useState([]);

  const [selectedItems, setSelectedItems] = useState({
    regularPrice: 0,
    totalPrice: 0,
    totalTime: 0,
  });

  let ServiceId = params?.serviceId;

  useEffect(() => {
    if (focused) {
      dispatch(removeByType('Customize'));
    }
  }, [focused]);

  useEffect(() => {
    if (scrollViewRef.current) {
      const scrollViewWidth = Dimensions.get('window').width;

      scrollViewRef.current.width = scrollViewWidth;
    }
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      const scrollViewWidth = Dimensions.get('window').width;

      flatListRef.current.setNativeProps({
        style: {width: scrollViewWidth},
      });
    }
  }, []);

  const scrollToCenter = index => {
    if (scrollViewRef.current) {
      const scrollViewWidth =
        scrollViewRef.current.width || Dimensions.get('window').width;
      const itemWidth = 100;
      const scrollToX = index * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
      scrollViewRef.current.scrollTo({x: scrollToX, animated: true});
    }
  };
  const scrollToCenterChildcatogory = index => {
    if (flatListRef.current) {
      const itemWidth = 140;
      const screenWidth = Dimensions.get('window').width;
      const centeredOffset = (screenWidth - itemWidth) / 2;

      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const user_info = useSelector(v => v.user);

  const handleSelctserviceModal = () => {
    selectServiceModal.current.showModal();
  };
  const handleSelctservicehideModal = () => {
    selectServiceModal.current.hideModal();
  };

  const Child_categoryy = useFetch({
    endpoint: Endpoints.getChildCategory + params?.pcId,
    Token: false,
  });

  const getChildCategory = async () => {
    try {
      let Ccategory = await Child_categoryy.fetchPromise();
      setCatogoryData(Ccategory.data);
    } catch (e) {
      console.log('err', e);
    } finally {
      setChildLoading(false);
    }
  };

  useEffect(() => {
    if (params?.pcId) {
      getChildCategory();
      setSelectedGroup(0);
    }
  }, [params]);

  const cart = user_info?.cart;
  let totalQuantity = 0;

  if (cart) {
    // Summing up the quantity properties of all items in the cart
    totalQuantity = cart.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0,
    );
  }

  let PCGroup = params.PCGroup;

  // Sum of packageRegulerPrice of all items
  const sumRegulerPrice = user_info?.cart.reduce(
    (total, item) =>
      total + parseInt(item?.packageRegulerPrice * item?.quantity),
    0,
  );

  const sumTotalPrice = user_info?.cart.reduce(
    (total, item) => total + parseInt(item?.packagetotalPrice * item?.quantity),
    0,
  );

  let minCartValue = parseInt(PCGroup?.MinCartValue);
  let diffrence = parseInt(PCGroup?.MinCartValue) - parseInt(sumTotalPrice);

  const TotalSavedItemsCart =
    parseInt(sumRegulerPrice) - parseInt(sumTotalPrice);

  let serviceEndpoint =
    Endpoints.getPackagesOrServices + getDatabyId + '&itemId=' + ServiceId;
  let pckgsEndpoint = Endpoints.getPackagesOrServices + getDatabyId;

  const getPackages = useFetch({
    endpoint: ServiceId?.length > 0 ? serviceEndpoint : pckgsEndpoint,
  });

  const getPackagesData = async () => {
    setLoading(true);
    try {
      let PackagesData = await getPackages.fetchPromise();

      setAllData(PackagesData?.data);

      const extractedGroupNames = PackagesData?.data?.flatMap(item => {
        if (
          item &&
          item.ServiceVarients &&
          item.ServiceVarients[0] &&
          item.ServiceVarients[0].VarientDiscription &&
          item.ServiceVarients[0].VarientDiscription[0] &&
          item.ServiceVarients[0].VarientDiscription[0].ServiceGroups
        ) {
          return item.ServiceVarients[0].VarientDiscription[0].ServiceGroups.map(
            group =>
              group.GroupName ||
              item?.ServiceGroups.map(group => group.GroupName),
          );
        } else if (item?.ServiceGroups) {
          return item.ServiceGroups.map(
            group =>
              group.GroupName ||
              item?.ServiceGroups.map(group => group.GroupName),
          );
        }
      });

      setGroupName(extractedGroupNames);
    } catch (e) {
      console.log('err', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectablePress = (itemId, index) => {
    setExpandedIndex(itemId);
    setGetDatabyId(itemId);
    setSelectedGroup(0);
    console.log('index of child', index);
  };

  useEffect(() => {
    if (getDatabyId !== null) {
      getPackagesData();
      setGroupName('');
    }
  }, [getDatabyId]);

  const Selectable = ({img, txt, onPress, expanded, index, pressforData}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginLeft: 10,
          borderColor: expanded ? 'red' : 'white',
          borderBottomWidth: 4,
          paddingBottom: 10,
          // height: 105,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,

          // backgroundColor: 'red',
        }}>
        <FastImage
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          resizeMode="cover"
          source={{uri: img}}
        />
        {/* </ImageBackground> */}
        <View style={{}}>
          <CustomText
            align={'center'}
            size={9}
            style={{
              fontFamily: expanded ? Fonts.PoppinsBold : Fonts.PoppinsRegular,
              marginTop: 10,
            }}
            value={txt}
          />
        </View>
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  const renderSelectableItem = ({item, index}) => {
    const isExpanded = expandedIndex === item._id;

    return (
      <Selectable
        index={index}
        expanded={isExpanded}
        onPress={() => handleSelectablePress(item._id, index)}
        img={Endpoints.baseUrl + item?.CCimage}
        txt={item.CCName}
      />
    );
  };

  useEffect(() => {
    setgroupCheck(checkPCGroupIds());
  }, [cart]);

  const checkPCGroupIds = () => {
    if (cart.length === 0) {
      return true; // Return true if cart is empty
    }

    // Get the first PCGroup ID
    const firstPCGroupId = cart[0]?.PCGroup?._id;

    // Check if all items have the same PCGroup ID
    for (let i = 1; i < cart.length; i++) {
      if (cart[i]?.PCGroup?._id !== firstPCGroupId) {
        return false; // Return false if any item has a different PCGroup ID
      }
    }

    return true; // Return true if all items have the same PCGroup ID
  };

  const addToCartAction = serviceData => {
    if (
      !groupCheck ||
      (cart.length > 0 && cart[0]?.PCGroup?._id !== serviceData?.PCGroup?._id)
    ) {
      // Show an alert or any other UI indication that the item cannot be added
      Alert.alert(
        'Invalid Addition',
        'You can only add items from the same Category.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'), // You can define a function here to handle cancel action
            style: 'cancel',
          },
          {
            text: 'Clear Cart',
            onPress: () => {
              dispatch(clearCart());
              dispatch(clearAllHistory());
            },
            // onPress: () => dispatch(clearCart(), clearAllHistory()), // Call clearCart function to clear the cart
          },
        ],
        {cancelable: false}, // Set cancelable to false to prevent dismissing the alert by tapping outside of it
      );
      return;
    } else {
      dispatch(addToCart(serviceData));
    }

    // Add item to cart
  };

  let items = [
    ...(selectedpackagedata?.AddonService || []),
    ...(selectedpackagedata?.serviceId || []),
  ];
  let customizedItems = [
    ...(selectedCustomizePackageData?.AddonService || []),
    ...(selectedCustomizePackageData?.serviceId || []),
  ];
  customizedItems.sort((a, b) => {
    const nameA = a.service.ServiceName.toUpperCase();
    const nameB = b.service.ServiceName.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const groupedServices = {};

  items.forEach(servicee => {
    let service = servicee?.service;
    const ccName = service.ChildCatIDs[0].CCName;
    const serviceType = service?.ServiceVarients;
    const serviceIdd = service._id;

    if (!groupedServices[ccName]) {
      groupedServices[ccName] = [];
    }
    groupedServices[ccName].push({
      serviceName: service.ServiceName,
      salePrice: service.ServiceVarients[0]?.VarientDiscription[0]?.salePrice,
      regulerPrice:
        service.ServiceVarients[0]?.VarientDiscription[0]?.regularPrice,
      serviceType: serviceType,
      serviceTime: service?.ServiceTime,
      serviceIdd: serviceIdd,
    });
  });

  const renderedServicesWithCommonTitle = groupedServices
    ? Object.entries(groupedServices)?.map(([ccName, services]) => {
        return {
          commonTitle: ccName,
          services: services,
        };
      })
    : [];

  const handleVariantSelect = (serviceName, selectedPrice, regularPrice) => {
    setSelectedServicePrices(prevPrices => ({
      ...prevPrices,
      [serviceName]: {selectedPrice, regularPrice},
    }));
  };
  const initializeSelectedPrices = () => {
    const initialSelectedPrices = {};

    renderedServicesWithCommonTitle.forEach(service => {
      if (service.services.length > 0) {
        initialSelectedPrices[service.services[0].serviceName] =
          service.services[0].salePrice;
      }
    });

    setSelectedServicePrices(initialSelectedPrices);
  };

  useEffect(() => {
    initializeSelectedPrices();
  }, []);
  const GroupedServicesList = ({groupedServices}) => {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
          }}>
          <CustomText
            margin_h={10}
            style={{
              marginTop: 20,
            }}
            medium
            value={item.commonTitle != 'undefined' ? item.commonTitle : ' '}
          />

          <FlatList
            data={item.services}
            renderItem={({item, index}) => {
              console.log(
                'selectedprice last step',
                item?.serviceType[0]?.ServiceType?.Name,
              );

              return (
                <View
                  style={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginTop: 10,
                  }}>
                  <CustomRow v_center ratios={[0, 1, 0]}>
                    <TouchableOpacity
                      onPress={() => {
                        const isItemSelected = selectedServices.some(
                          service => service.ServiceName === item.serviceName,
                        );
                        if (isItemSelected) {
                          // If the item is already selected, remove it from the state
                          handleRemoveService(item.serviceName);
                        } else {
                          // If the item is not selected, add it to the state
                          handleCheckboxToglee(
                            item.serviceName,
                            parseInt(item.serviceTime),
                            item.salePrice,
                            item.regulerPrice,
                            item?.serviceType[0]?.ServiceType?.Name,
                          );
                        }
                      }}>
                      <CustomIcon
                        type={'MC'}
                        color={Theme.PrimaryColor}
                        size={14}
                        name={
                          selectedServices.some(
                            service => service.ServiceName === item.serviceName,
                          )
                            ? 'checkbox-marked'
                            : 'checkbox-blank-outline'
                        }
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        marginLeft: 10,
                      }}>
                      <CustomText regular value={item.serviceName} />

                      {(selectedService =>
                        selectedService ? (
                          <View>
                            <CustomText
                              regular
                              value={
                                selectedService.ServicePrice !== undefined
                                  ? selectedService.ServicePrice
                                  : item?.salePrice
                              }
                            />
                          </View>
                        ) : (
                          <View>
                            <CustomText regular value={item?.salePrice} />
                          </View>
                        ))(
                        selectedServices.find(
                          service => service.ServiceName === item.serviceName,
                        ),
                      )}
                    </View>

                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderWidth: 1,
                        width: 90,
                        height: 25,
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        setSelectedVariant(item);
                        handleSelctserviceModal();
                      }}>
                      <CustomRow v_center>
                        <CustomText
                          regular
                          value={
                            selectedServices.find(
                              service =>
                                service.ServiceName === item.serviceName,
                            )
                              ? selectedServices.find(
                                  service =>
                                    service.ServiceName === item.serviceName,
                                ).variantId
                              : item?.serviceType[0]?.ServiceType?.Name
                          }
                        />

                        <CustomIcon size={12} name={'down'} type={'AN'} />
                      </CustomRow>
                    </TouchableOpacity>
                  </CustomRow>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    };

    // );

    return (
      <FlatList
        data={groupedServices}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const listsByTitle = {};

  // allData?.forEach(item => {
  //   if (
  //     (!item.ServiceVarients &&
  //       !listsByTitle[item.ServiceGroups[0]?.GroupName || ' ']) ||
  //     !item.ServiceVarients
  //   ) {
  //     // listsByTitle[item.ServiceGroups[0]?.GroupName || ' ']?.push(item);
  //     item.ServiceGroups.forEach(group => {
  //       const groupName = group.GroupName || ' '; // Get the group name
  //       if (!listsByTitle[groupName]) {
  //         listsByTitle[groupName] = []; // Initialize array if not exist
  //       }
  //       listsByTitle[groupName].push(item); // Push item to respective group
  //     });
  //   } else if (item.ServiceVarients && item.ServiceVarients.length > 0) {
  //     item.ServiceVarients.forEach(variant => {
  //       if (
  //         variant.VarientDiscription &&
  //         variant.VarientDiscription.length > 0
  //       ) {
  //         variant.VarientDiscription.forEach(discription => {
  //           if (
  //             discription.ServiceGroups &&
  //             discription.ServiceGroups.length > 0
  //           ) {
  //             discription.ServiceGroups.forEach(group => {
  //               const groupName = group.GroupName || ' '; // Get the group name
  //               if (!listsByTitle[groupName]) {
  //                 listsByTitle[groupName] = []; // Initialize array if not exist
  //               }
  //               listsByTitle[groupName].push(item); // Push item to respective group
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
  // });

  allData?.forEach(item => {
    if (
      (!item.ServiceVarients &&
        !listsByTitle[item.ServiceGroups[0]?.GroupName || ' ']) ||
      !item.ServiceVarients
    ) {
      item.ServiceGroups.forEach(group => {
        const groupName = group.GroupName || ' '; // Get the group name
        if (!listsByTitle[groupName]) {
          listsByTitle[groupName] = []; // Initialize array if not exist
        }
        listsByTitle[groupName].push(item); // Push item to respective group
      });
      if (item.ServiceGroups.length === 0) {
        // If no groups, push to a blank name group
        const groupName = ' ';
        if (!listsByTitle[groupName]) {
          listsByTitle[groupName] = []; // Initialize array if not exist
        }
        listsByTitle[groupName].push(item);
      }
    } else if (item.ServiceVarients && item.ServiceVarients.length > 0) {
      item.ServiceVarients.forEach(variant => {
        if (
          variant.VarientDiscription &&
          variant.VarientDiscription.length > 0
        ) {
          variant.VarientDiscription.forEach(discription => {
            if (
              discription.ServiceGroups &&
              discription.ServiceGroups.length > 0
            ) {
              discription.ServiceGroups.forEach(group => {
                const groupName = group.GroupName || ' '; // Get the group name
                if (!listsByTitle[groupName]) {
                  listsByTitle[groupName] = []; // Initialize array if not exist
                }
                listsByTitle[groupName].push(item); // Push item to respective group
              });
            } else {
              // If no groups, push to a blank name group
              const groupName = ' ';
              if (!listsByTitle[groupName]) {
                listsByTitle[groupName] = []; // Initialize array if not exist
              }
              listsByTitle[groupName].push(item);
            }
          });
        }
      });
    }
  });

  const scrollToGroup = groupName => {
    const index = Object.keys(listsByTitle).findIndex(
      group => group === groupName,
    );

    if (index !== -1) {
      GroupRef.current.scrollToIndex({index, animated: true});
    }
  };

  const RenderServices = React.memo(({item}) => {
    const handleShare = async () => {
      try {
        const result = await Share.share({
          message: 'abcd', // Message to be shared
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared successfully
            console.log('Shared successfully');
          } else {
            // Dismissed the share sheet
            console.log('Dismissed the share sheet');
          }
        } else if (result.action === Share.dismissedAction) {
          // Share was dismissed
          console.log('Share was dismissed');
        }
      } catch (error) {
        // Error while sharing
        console.error('Error while sharing:', error.message);
      }
    };

    const QuantityControl = ({quantity, onIncrease, onDecrease}) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Theme.PrimaryLight,

            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderRadius: 5,
            width: 90,
            height: 27,
            borderColor: Theme.PrimaryColor,
            borderWidth: 1,
            position: 'absolute',
            bottom: -15,
            left: 5,
          }}>
          <TouchableOpacity
            style={{
              width: 30,

              alignItems: 'center',
              paddingVertical: 7,
            }}
            onPress={onDecrease}>
            <CustomIcon
              name={'minus'}
              type={'FA5'}
              color={Theme.PrimaryColor}
              size={11}
            />
          </TouchableOpacity>
          <CustomText
            size={13}
            medium
            // style={{
            //   width: 30,
            // }}
            // margin_h={15}
            value={quantity?.toString()}
          />
          <TouchableOpacity
            style={{
              paddingVertical: 7,
              width: 30,
            }}
            onPress={onIncrease}>
            <CustomIcon
              name={'plus'}
              type={'FA5'}
              color={Theme.PrimaryColor}
              size={11}
              // style={{marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>
      );
    };

    if (item?.ServiceName) {
      const varient = item?.ServiceVarients[0];
      const varientDiscription = varient?.VarientDiscription[0];
      const salePrice = varientDiscription?.salePrice;
      const regularPrice = varientDiscription?.regularPrice;
      const discount = varientDiscription?.serviceDiscount;
      let service = item;
      let pcatId = item?.PCatId;

      const findCCNameById = _id => {
        const item = catogoryData.find(item => item._id === _id);
        return item ? item.CCName : null;
      };

      const CCName = findCCNameById(expandedIndex);

      const foundItem = user_info?.cart.find(
        item => item.id === service?.ServiceVarients[0]?._id,
      );
      console.log('cart', cart);
      console.log('foundItem', foundItem);

      let serviceData = {
        packageTotalTime: varientDiscription?.ServiceTime,
        packagetotalPrice:
          item?.ServiceVarients[0]?.VarientDiscription[0]?.salePrice,
        packageRegulerPrice:
          item?.ServiceVarients[0]?.VarientDiscription[0]?.regularPrice,
        type: 'Service',
        packageTitle:
          item?.ServiceVarients[0]?.ServiceType?.Name != 'NA'
            ? item?.ServiceName +
              '-' +
              item?.ServiceVarients[0]?.ServiceType?.Name
            : item?.ServiceName + '-' + CCName,
        quantity: 1,
        PCGroup: PCGroup,
        id: item?.ServiceVarients[0]?._id,
        pcatId: pcatId,
      };

      return (
        <CustomCard
          style={{
            padding: 5,
          }}>
          <CustomRow ratios={[1, 0]}>
            <TouchableOpacity
              onPress={() => {
                setViewDetails(item);
                handleDetailsShowModal();
              }}>
              {/* <CustomText
                style={{
                  fontWeight: '600',
                  marginBottom: 5,
                }}
                color={Theme.Black}
                value={
                  item?.ServiceVarients[0]?.ServiceType?.Name != 'NA'
                    ? item?.ServiceName +
                      '-' +
                      item?.ServiceVarients[0]?.ServiceType?.Name
                    : item?.ServiceName + '-' + CCName
                }
              /> */}

              {item?.ServiceVarients[0]?.ServiceType?.Name != 'NA' && (
                <>
                  <CustomRow>
                    <CustomText
                      style={{
                        fontWeight: '600',
                        marginBottom: 5,
                      }}
                      color={Theme.Black}
                      value={item?.ServiceName}
                    />
                    <CustomText
                      value={item?.ServiceVarients[0]?.ServiceType?.Name}
                    />
                  </CustomRow>
                </>
              )}
              {item?.ServiceVarients[0]?.ServiceType?.Name == 'NA' && (
                <CustomRow>
                  <CustomText
                    style={{
                      fontWeight: '600',
                      marginBottom: 5,
                    }}
                    color={Theme.Black}
                    value={item?.ServiceName}
                  />
                  <CustomText value={CCName} />
                </CustomRow>
              )}

              <CustomRow
                style={{
                  marginBottom: 5,
                }}
                v_center>
                <CustomText
                  style={{
                    fontWeight: '600',
                  }}
                  color={Theme.Black}
                  size={13}
                  value={'₹ ' + salePrice}
                />
                <CustomText
                  size={12}
                  margin_h={10}
                  style={{
                    textDecorationLine: 'line-through',
                  }}
                  color={'grey'}
                  value={'₹ ' + regularPrice}
                />
                <CustomText
                  medium
                  style={{
                    marginTop: -2,
                  }}
                  value={'|'}
                />
                <CustomText
                  size={12}
                  margin_h={10}
                  color={'green'}
                  value={discount + '%' + ' off'}
                />
              </CustomRow>
              <CustomRow v_center>
                <CustomIcon
                  name={'clock'}
                  type={'FA5'}
                  color={Theme.PrimaryColor}
                  size={12}
                />
                <CustomText
                  size={12}
                  margin_h={5}
                  color={'grey'}
                  value={varientDiscription?.ServiceTime + ' Mins'}
                />
              </CustomRow>

              <View
                style={{
                  backgroundColor: '#F5F6FB',
                  height: 0.5,
                  width: '90%',
                  marginVertical: 10,
                }}
              />
              {varientDiscription?.ShortDiscription ? (
                <View style={{}}>
                  <RenderHTML
                    source={{html: varientDiscription?.ShortDiscription}}
                    contentWidth={100}
                    tagsStyles={{
                      p: {margin: '0px'},
                      h1: {margin: '0px'},
                      h2: {margin: '0px'},
                      h3: {margin: '0px'},
                      li: {
                        margin: '0px',
                        paddingLeft: 0,
                      },
                      ul: {
                        margin: '0px',
                        paddingLeft: 10,
                      },
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <CustomImage
                  onPress={() => {
                    // setViewDetails(item);
                    // handleDetailsShowModal();
                    console.log('pressed', viewDetails);
                  }}
                  style={{
                    borderRadius: 10,
                    // marginRight: -10,
                  }}
                  size={100}
                  src={{
                    uri: Endpoints.baseUrl + varientDiscription?.ServiceImage,
                  }}
                />

                {!foundItem ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      addToCartAction(serviceData);
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderRadius: 5,
                        paddingVertical: 4,
                        width: 90,
                        height: 27,
                        borderColor: Theme.PrimaryColor,
                        borderWidth: 1,
                        position: 'absolute',
                        bottom: -15,
                        left: 5,
                        elevation: 4,
                      }}>
                      <CustomText
                        size={11}
                        value={'Add'}
                        medium
                        color={Theme.PrimaryColor}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View style={{}}>
                    <QuantityControl
                      quantity={foundItem?.quantity}
                      onDecrease={() => {
                        dispatch(
                          decreaseItemQuantity({
                            itemId: item?.ServiceVarients[0]?._id,
                          }),
                        );
                      }}
                      onIncrease={() => {
                        dispatch(
                          increaseItemQuantity({
                            itemId: item?.ServiceVarients[0]?._id,
                          }),
                        );
                      }}
                    />
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setViewDetails(item);
                  handleDetailsShowModal();
                  console.log('pressed', viewDetails);
                }}
                style={{
                  marginTop: 40,
                }}>
                <CustomRow v_center>
                  <CustomText
                    value={'View Details '}
                    size={13}
                    color={Theme.PrimaryColor}
                  />
                  <CustomIcon
                    size={14}
                    color={Theme.PrimaryColor}
                    name={'doubleright'}
                    type={'AN'}
                  />
                </CustomRow>
              </TouchableOpacity>
            </View>
          </CustomRow>
        </CustomCard>
      );
    } else if (item?.packageTitle && item?.packageType === 'Editable') {
      let Package = item;
      let services = item?.serviceId;
      let pcatId = item?.PcatId;
      const foundItem = user_info?.cart.find(item => item.id === Package._id);
      let editableAddedTotalPrice = foundItem?.packagetotalPrice;
      let editableAddedRegulerPricee = foundItem?.packageRegulerPrice;
      let editableTotalTime = foundItem?.packageTotalTime;
      const serviceNames = [];
      let totalSalePrice = 0;
      let totalRegularPrice = 0;
      let totalServiceTime = 0;

      services.forEach(servicee => {
        let service = servicee?.service;
        // Extract service name
        const serviceName = service?.ServiceName;
        serviceNames.push(serviceName);

        if (service?.ServiceVarients && service?.ServiceVarients.length > 0) {
          // Access the first item of ServiceVarients
          const firstVariant = service?.ServiceVarients[0];

          // Check if VarientDiscription array exists and has at least one item
          if (
            firstVariant?.VarientDiscription &&
            firstVariant?.VarientDiscription?.length > 0
          ) {
            // Extract regular price from the first item of VarientDiscription
            const regularPrice = parseInt(
              firstVariant.VarientDiscription[0].regularPrice,
            );
            const salePrice = parseInt(
              firstVariant.VarientDiscription[0].salePrice,
            );

            totalSalePrice += salePrice;

            // Add regular price to the total
            totalRegularPrice += regularPrice;
          }
        }

        const serviceTime = parseInt(
          service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
        );

        totalServiceTime += serviceTime;

        // console.log('totttt', totalRegularPrice, totalSalePrice);

        // Extract total sale price and total regular price
        // service.ServiceVarients.forEach(variant => {
        //   variant.VarientDiscription.forEach(discription => {
        //     totalSalePrice += parseInt(discription?.salePrice);
        //     totalRegularPrice += parseInt(discription?.regularPrice);
        //     totalServiceTime += parseInt(service?.ServiceTime);
        //   });
        // });
      });

      let primaryServices = [];
      item?.serviceId?.forEach(serviceObjectt => {
        let serviceObject = serviceObjectt?.service;
        const serviceNames = serviceObject?.ServiceName;
        if (serviceNames) {
          primaryServices.push(serviceNames);
        }
      });

      const firstTwoServiceNames = [];

      item?.AddonService?.forEach(serviceObject => {
        const serviceName = serviceObject?.ServiceName;
        if (serviceName) {
          firstTwoServiceNames.push(serviceName);
          if (firstTwoServiceNames.length >= 2) {
            // Break the loop once you have collected the first two service names
            return;
          }
        }
      });

      const selectedEditPckageDetails = {
        packageName: primaryServices,
        packageTotalTime: totalTime ? totalTime : totalServiceTime,
        packagetotalPrice: editableTotalPrice
          ? editableTotalPrice
          : totalSalePrice,
        packageRegulerPrice: editableRegulerPrice
          ? editableRegulerPrice
          : totalRegularPrice,
        type: 'Editable',
        packageTitle: selectedpackagedata?.packageTitle
          ? selectedpackagedata?.packageTitle
          : item?.packageTitle,
        quantity: 1,
        id: selectedpackagedata?._id ? selectedpackagedata?._id : item?._id,
        PCGroup: PCGroup,
        pcatId: pcatId,
      };

      return (
        <CustomCard
          style={{
            padding: 10,
          }}>
          <CustomRow ratios={[1, 0]}>
            <TouchableOpacity
              onPress={() => {
                setSelectedpackagedata(item);
                handleShowModal();
              }}
              style={{
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedpackagedata(item);
                  handleShowModal();
                }}>
                <CustomText
                  // medium
                  color={Theme.Black}
                  value={item?.packageTitle}
                  style={{
                    fontWeight: '600',
                    marginBottom: 5,
                  }}
                />
              </TouchableOpacity>
              <CustomRow
                style={{
                  marginBottom: 5,
                }}>
                <CustomText
                  color={Theme.Black}
                  size={13}
                  style={{
                    fontWeight: '600',
                  }}
                  value={
                    editableAddedTotalPrice
                      ? '₹ ' + editableAddedTotalPrice
                      : '₹ ' + item?.SPrice
                  }
                />

                <CustomText
                  size={12}
                  margin_h={10}
                  style={{
                    textDecorationLine: 'line-through',
                    fontWeight: '600',
                  }}
                  // regular
                  color={'grey'}
                  value={
                    editableAddedRegulerPricee
                      ? '₹ ' + editableAddedRegulerPricee
                      : '₹ ' + item?.RPrice
                  }
                />
                <CustomText
                  size={12}
                  margin_h={10}
                  color={'green'}
                  regular
                  value={item?.discount + '%'}
                />
              </CustomRow>

              <CustomRow v_center>
                <CustomIcon
                  name={'clock'}
                  type={'FA5'}
                  color={Theme.PrimaryColor}
                  size={12}
                />
                <CustomText
                  size={12}
                  margin_h={5}
                  color={'grey'}
                  value={
                    editableTotalTime
                      ? editableTotalTime + ' Mins'
                      : totalServiceTime + ' Mins'
                  }
                />
              </CustomRow>

              <View
                style={{
                  backgroundColor: 'grey',
                  height: 0.5,
                  width: '80%',
                  marginVertical: 10,
                }}
              />

              {foundItem ? (
                foundItem?.packageName?.map((item, index) => {
                  return (
                    <View>
                      <CustomRow v_center>
                        <CustomText value={'\u2022' + ' ' + item} regular />
                      </CustomRow>
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    minHeight: '71%',
                  }}>
                  {item?.serviceId.map((itemm, index) => {
                    let item = itemm?.service;
                    return (
                      <View key={index}>
                        <CustomRow v_center>
                          <CustomText
                            value={'\u2022' + ' ' + item?.ServiceName}
                            regular
                          />
                        </CustomRow>
                      </View>
                    );
                  })}
                </View>
              )}

              {item.ShortDiscription ? (
                <View style={{}}>
                  <RenderHTML
                    source={{html: item.ShortDiscription}}
                    contentWidth={200}
                    tagsStyles={{
                      p: {margin: '0px'},
                      h1: {margin: '0px', marginBottom: '10px'},
                      h2: {margin: '0px', marginBottom: '10px'},
                      h3: {
                        margin: '0px',
                        marginBottom: '10px',
                        paddingBottom: '20px',
                      },
                      li: {
                        margin: '0px',
                        paddingLeft: 0,
                      },
                      ul: {
                        margin: '0px',
                        paddingLeft: 10,
                        paddingVertical: 10,
                      },
                    }}
                  />
                </View>
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  setSelectedpackagedata(item);
                  handleShowModal();
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  position: 'absolute',
                  bottom: 0,
                }}>
                <CustomRow
                  v_center
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <CustomText
                    value={'Edit Package'}
                    color={'white'}
                    size={12}
                    medium
                  />
                  <CustomIcon
                    name={'doubleright'}
                    color={'white'}
                    type={'AN'}
                    size={12}
                  />
                </CustomRow>
              </TouchableOpacity>
            </TouchableOpacity>
            <View>
              <View>
                <CustomImage
                  onPress={() => {
                    setSelectedpackagedata(item);
                    handleShowModal();
                  }}
                  style={{
                    borderRadius: 10,
                    marginRight: -10,
                  }}
                  size={100}
                  src={{uri: Endpoints.baseUrl + item.packageImage}}
                />

                {!foundItem ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      dispatch(addToCart(selectedEditPckageDetails));
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderRadius: 5,
                        paddingVertical: 4,
                        width: 90,
                        height: 27,
                        borderColor: Theme.PrimaryColor,
                        borderWidth: 1,
                        position: 'absolute',
                        bottom: -15,
                        left: 5,
                        elevation: 4,
                      }}>
                      <CustomText
                        size={11}
                        value={'Add'}
                        medium
                        color={Theme.PrimaryColor}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View style={{}}>
                    <QuantityControl
                      quantity={foundItem?.quantity}
                      onDecrease={() => {
                        dispatch(decreaseItemQuantity({itemId: item?._id}));
                      }}
                      onIncrease={() => {
                        dispatch(increaseItemQuantity({itemId: item?._id}));
                      }}
                    />
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setviewDetailsPackageModal(item);
                  handleDetailsPackageShowModal();
                }}
                style={{
                  marginTop: 60,
                }}>
                <CustomRow v_center>
                  <CustomText
                    value={'View Details '}
                    size={13}
                    color={Theme.PrimaryColor}
                  />
                  <CustomIcon
                    size={14}
                    color={Theme.PrimaryColor}
                    name={'doubleright'}
                    type={'AN'}
                  />
                </CustomRow>
              </TouchableOpacity>
            </View>
          </CustomRow>
        </CustomCard>
      );
    } else if (item?.packageTitle && item?.packageType === 'Customize') {
      let Package = item;
      let services = item?.serviceId;
      let pcatId = item?.PcatId;
      const foundItem = user_info?.cart.find(item => item.id === Package._id);

      console.log('services in customize', services);

      let customizeAddedTotalPrice = foundItem?.packagetotalPrice;
      let customizeRegulerPricee = foundItem?.packageRegulerPrice;
      let customizeTotalTime = foundItem?.packageTotalTime;
      const serviceNames = [];
      let totalSalePrice = 0;
      let totalRegularPrice = 0;
      let totalServiceTime = 0;

      services?.forEach(servicee => {
        let service = servicee.service;
        console.log('andar service', service);
        const serviceName = service?.ServiceName;
        serviceNames.push(serviceName);

        service?.ServiceVarients?.forEach(variant => {
          totalServiceTime += parseInt(
            variant.VarientDiscription[0]?.ServiceTime,
          );
        });
      });

      const selectedCustomizePckageDetails = {
        packageName:
          selectedCustomizeServices.length > 0
            ? selectedCustomizeServices
            : serviceNames,
        packageTotalTime: totalCustomizeTime
          ? totalCustomizeTime
          : totalServiceTime,
        packagetotalPrice: Package?.payble,
        packageRegulerPrice: Package?.RPrice,
        type: 'Customize',
        packageTitle: selectedCustomizePackageData?.packageTitle
          ? selectedCustomizePackageData?.packageTitle
          : item?.packageTitle,
        quantity: 1,
        id: selectedCustomizePackageData?._id
          ? selectedCustomizePackageData?._id
          : item?._id,
        PCGroup: PCGroup,
        pcatId: pcatId,
      };
      const firstTwoServiceNames = [];

      item?.AddonService?.forEach(serviceObjectt => {
        let serviceObject = serviceObjectt?.service;

        const serviceName = serviceObject?.ServiceName;
        if (serviceName) {
          firstTwoServiceNames.push(serviceName);
          if (firstTwoServiceNames.length >= 2) {
            // Break the loop once you have collected the first two service names
            return;
          }
        }
      });

      let customizedItems = [...item?.serviceId, ...item?.AddonService];

      customizedItems.sort((a, b) => {
        const nameA = a.service.ServiceName.toUpperCase();
        const nameB = b.service.ServiceName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      return (
        <CustomCard
          style={{
            padding: 10,
          }}>
          <CustomRow ratios={[1, 0]}>
            <TouchableOpacity
              onPress={() => {
                setselectedCustomizePackageData(Package);
                handleCustomizeModal();
              }}>
              <TouchableOpacity>
                <CustomText
                  medium
                  color={Theme.Black}
                  value={item?.packageTitle}
                />
              </TouchableOpacity>
              <CustomRow v_center>
                <CustomText
                  color={Theme.Black}
                  size={12}
                  style={{
                    fontWeight: '600',
                  }}
                  value={'₹ ' + item?.payble}
                />

                <CustomText
                  size={12}
                  margin_h={10}
                  style={{
                    textDecorationLine: 'line-through',
                  }}
                  regular
                  color={'grey'}
                  value={'₹ ' + item?.RPrice}
                />
                <CustomText
                  size={12}
                  margin_h={10}
                  color={'green'}
                  regular
                  value={item?.discount + '%'}
                />
              </CustomRow>

              <CustomRow v_center>
                <CustomIcon
                  name={'clock'}
                  type={'FA5'}
                  color={Theme.PrimaryColor}
                  size={12}
                />
                <CustomText
                  size={12}
                  margin_h={5}
                  color={'grey'}
                  value={totalCustomizeTime + ' Mins'}
                />
              </CustomRow>

              <View>
                <View
                  style={{
                    backgroundColor: 'grey',
                    height: 0.5,
                    width: '80%',
                    marginVertical: 10,
                  }}
                />

                {customizedItems &&
                  customizedItems.map((itemm, index) => {
                    let item = itemm.service;

                    console.log(
                      'in customize service',
                      item?.ServiceVarients[0]?.ServiceType?.Name,
                    );

                    return (
                      <View style={{}}>
                        <View>
                          <CustomRow v_center>
                            <TouchableOpacity
                              onPress={() => {
                                setselectedCustomizePackageData(Package);
                                handleCustomizeModal();
                              }}>
                              <CustomIcon
                                type={'MC'}
                                color={Theme.PrimaryColor}
                                size={19}
                                name={
                                  selectedCustomizeServices.includes(
                                    item?.ServiceVarients[0]?.ServiceType
                                      ?.Name == 'NA'
                                      ? item.ServiceName +
                                          '-' +
                                          item?.ChildCatIDs?.CCName
                                      : item.ServiceName +
                                          '-' +
                                          item?.ServiceVarients[0]?.ServiceType
                                            ?.Name,
                                  )
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                              />
                            </TouchableOpacity>

                            <View
                              style={{
                                marginLeft: 10,
                              }}>
                              <CustomText
                                regular
                                value={
                                  item?.ServiceVarients[0]?.ServiceType?.Name ==
                                  'NA'
                                    ? item.ServiceName +
                                      '-' +
                                      item?.ChildCatIDs?.CCName
                                    : item.ServiceName +
                                      '-' +
                                      item?.ServiceVarients[0]?.ServiceType
                                        ?.Name
                                }
                              />
                            </View>
                          </CustomRow>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </TouchableOpacity>

            <View>
              <View>
                <CustomImage
                  onPress={() => {
                    setviewDetailsPackageModal(item);
                    handleDetailsPackageShowModal();
                  }}
                  style={{
                    borderRadius: 10,
                    marginRight: -10,
                  }}
                  size={100}
                  src={{uri: Endpoints.baseUrl + item.packageImage}}
                />

                {!foundItem ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setselectedCustomizePackageData(Package);
                      handleCustomizeModal();
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderRadius: 5,
                        paddingVertical: 4,
                        width: 90,
                        height: 27,
                        borderColor: Theme.PrimaryColor,
                        borderWidth: 1,
                        position: 'absolute',
                        bottom: -15,
                        left: 5,
                        elevation: 4,
                      }}>
                      <CustomText
                        size={11}
                        value={'Add'}
                        medium
                        color={Theme.PrimaryColor}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View>
                    <QuantityControl
                      quantity={foundItem?.quantity}
                      onDecrease={() => {
                        dispatch(decreaseItemQuantity({itemId: item?._id}));
                      }}
                      onIncrease={() => {
                        dispatch(increaseItemQuantity({itemId: item?._id}));
                      }}
                    />
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setviewDetailsPackageModal(item);
                  handleDetailsPackageShowModal();
                }}
                style={{
                  marginTop: 40,
                }}>
                <CustomRow v_center>
                  <CustomText
                    value={'View Details '}
                    size={13}
                    color={Theme.PrimaryColor}
                  />
                  <CustomIcon
                    size={14}
                    color={Theme.PrimaryColor}
                    name={'doubleright'}
                    type={'AN'}
                  />
                </CustomRow>
              </TouchableOpacity>
            </View>
          </CustomRow>
        </CustomCard>
      );
    } else {
      let Package = item;
      let services = item?.serviceId;
      const foundItem = user_info?.cart.find(item => item.id === Package._id);

      const serviceNames = [];
      let totalSalePrice = item?.payble;
      let totalRegularPrice = 0;
      let totalServiceTime = 0;

      services?.forEach(servicee => {
        let service = servicee?.service;
        service?.ServiceVarients?.forEach(variant => {
          variant.VarientDiscription.forEach(discription => {
            // totalSalePrice += parseInt(discription.salePrice);
            totalRegularPrice += parseInt(discription.regularPrice);
            totalServiceTime += parseInt(
              service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
            );
          });
        });
      });

      const selectedNormalPckageDetails = {
        packageName: serviceNames,
        packageTotalTime: totalServiceTime,
        packagetotalPrice: Package?.payble,
        packageRegulerPrice: Package?.RPrice,
        type: 'Normal',
        packageTitle: item?.packageTitle,
        quantity: 1,
        id: item?._id,
        PCGroup: PCGroup,
      };

      return (
        <CustomCard
          style={{
            padding: 10,
          }}>
          <CustomRow ratios={[1, 0]}>
            <TouchableOpacity
              onPress={() => {
                setviewDetailsPackageModal(item);
                handleDetailsPackageShowModal();
                selectedCustomizeServices(foundItem.packageName);
              }}>
              <TouchableOpacity>
                <CustomText
                  medium
                  color={Theme.Black}
                  value={item?.packageTitle}
                />
              </TouchableOpacity>

              <CustomRow>
                <CustomText
                  color={Theme.Black}
                  size={12}
                  style={{
                    fontWeight: '600',
                  }}
                  value={'₹ ' + item?.payble}
                />

                <CustomText
                  size={12}
                  margin_h={10}
                  style={{
                    textDecorationLine: 'line-through',
                  }}
                  // regular
                  color={'grey'}
                  value={'₹ ' + item?.RPrice}
                />
                <CustomText
                  medium
                  style={{
                    marginTop: -2,
                  }}
                  value={'|'}
                />
                <CustomText
                  size={12}
                  margin_h={10}
                  color={'green'}
                  regular
                  value={item?.discount + '% off'}
                />
              </CustomRow>
              <CustomRow v_center>
                <CustomIcon
                  name={'clock'}
                  type={'FA5'}
                  color={Theme.PrimaryColor}
                  size={12}
                />
                <CustomText
                  size={12}
                  margin_h={5}
                  color={'grey'}
                  value={totalServiceTime + ' Mins'}
                />
              </CustomRow>
              <View
                style={{
                  backgroundColor: 'grey',
                  height: 0.5,
                  width: '80%',
                  marginVertical: 10,
                }}
              />

              {item?.serviceId?.map((itemm, index) => {
                let item = itemm?.service;
                return (
                  <View key={index}>
                    {item?.ServiceVarients[0]?.ServiceType?.Name != 'NA' && (
                      <>
                        <CustomRow>
                          <CustomText
                            style={{
                              fontWeight: '600',
                              marginBottom: 5,
                            }}
                            color={Theme.Black}
                            value={item?.ServiceName + ' - '}
                          />
                          <CustomText
                            value={item?.ServiceVarients[0]?.ServiceType?.Name}
                          />
                        </CustomRow>
                      </>
                    )}
                    {item?.ServiceVarients[0]?.ServiceType?.Name == 'NA' && (
                      <CustomRow>
                        <CustomText
                          style={{
                            fontWeight: '600',
                            marginBottom: 5,
                          }}
                          color={Theme.Black}
                          value={item?.ServiceName + ' - '}
                        />
                        <CustomText value={item?.ChildCatIDs?.CCName} />
                      </CustomRow>
                    )}
                    {/* <CustomRow v_center>
                      <CustomText
                        value={'\u2022' + ' ' + item.ServiceName }
                        regular
                      />
                    </CustomRow> */}
                  </View>
                );
              })}
            </TouchableOpacity>
            <View>
              <View>
                <CustomImage
                  onPress={() => {
                    setviewDetailsPackageModal(item);
                    handleDetailsPackageShowModal();
                  }}
                  // resizeMode={'cover'}
                  style={{
                    borderRadius: 10,
                    marginRight: -10,
                  }}
                  size={100}
                  src={{uri: Endpoints.baseUrl + item?.packageImage}}
                />

                {!foundItem ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      dispatch(addToCart(selectedNormalPckageDetails));
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderRadius: 5,
                        paddingVertical: 4,
                        width: 90,
                        height: 27,
                        borderColor: Theme.PrimaryColor,
                        borderWidth: 1,
                        position: 'absolute',
                        bottom: -15,
                        left: 5,
                        elevation: 4,
                      }}>
                      <CustomText
                        size={11}
                        value={'Add'}
                        medium
                        color={Theme.PrimaryColor}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View style={{}}>
                    <QuantityControl
                      quantity={foundItem?.quantity}
                      onDecrease={() => {
                        dispatch(decreaseItemQuantity({itemId: item?._id}));
                      }}
                      onIncrease={() => {
                        dispatch(increaseItemQuantity({itemId: item?._id}));
                      }}
                    />
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setviewDetailsPackageModal(item);
                  handleDetailsPackageShowModal();
                }}
                style={{
                  marginTop: 60,
                }}>
                <CustomRow v_center>
                  <CustomText
                    value={'View Details '}
                    size={13}
                    color={Theme.PrimaryColor}
                  />
                  <CustomIcon
                    size={14}
                    color={Theme.PrimaryColor}
                    name={'doubleright'}
                    type={'AN'}
                  />
                </CustomRow>
              </TouchableOpacity>
            </View>
          </CustomRow>
        </CustomCard>
      );
    }
  });

  const handleCheckboxToglee = (
    ServiceName,
    ServiceTime,
    ServicePrice,
    RegulerPrice,
    variantId,
  ) => {
    console.log(
      ServiceName,
      ServiceTime,
      ServicePrice,
      RegulerPrice,
      variantId,
    );

    setSelectedServices(prevSelectedServices => {
      const index = prevSelectedServices.findIndex(
        service => service.ServiceName === ServiceName,
      );
      const updatedServices = [...prevSelectedServices];
      if (index === -1) {
        updatedServices.push({
          ServiceName,
          ServiceTime,
          ServicePrice: parseInt(ServicePrice),
          RegulerPrice: parseInt(RegulerPrice),
          variantId,
        });
      } else {
        updatedServices[index] = {
          ...updatedServices[index],
          ServiceName,
          ServiceTime,
          ServicePrice: parseInt(ServicePrice),
          RegulerPrice: parseInt(RegulerPrice),
          variantId,
        };
      }

      return updatedServices;
    });
  };

  const handleRemoveService = serviceName => {
    setSelectedServices(prevSelectedServices => {
      const updatedServices = prevSelectedServices.filter(
        service => service.ServiceName !== serviceName,
      );
      return updatedServices;
    });
  };

  const handleCheckboxTogle = (
    ServiceName,
    ServiceTime,
    ServicePrice,
    RegulerPrice,
  ) => {
    // Check if the service is already selected
    const index = selectedCustomizeServices.indexOf(ServiceName);
    const selectedCount = selectedCustomizeServices.length;
    console.log('number', selectedCustomizePackageData?.mandatoryServices);
    const maxMandatoryServices = parseInt(
      selectedCustomizePackageData?.mandatoryServices || null,
    );

    if (selectedCount >= maxMandatoryServices && index === -1) {
      showMessage({
        message:
          'Please select any ' +
          maxMandatoryServices +
          ' services from the list',
        icon: 'danger',
        type: 'danger',
        position: 'top',
      });

      return;
    }

    if (index === -1) {
      setSelectedcustomizeServices([...selectedCustomizeServices, ServiceName]);

      setTotalCustomizeTime(prevTotalTime => prevTotalTime + ServiceTime);
      setCustomizeTotalPrice(
        prevTotalPrice => prevTotalPrice + parseInt(ServicePrice),
      );
      setCustomizeRegulerPrice(
        prevRegulerPrice => prevRegulerPrice + parseInt(RegulerPrice),
      );
    } else if (index !== -1) {
      setSelectedcustomizeServices(
        selectedCustomizeServices.filter(service => service !== ServiceName),
      );

      setTotalCustomizeTime(prevTotalTime => prevTotalTime - ServiceTime);

      setCustomizeTotalPrice(
        prevTotalPrice => prevTotalPrice - parseInt(ServicePrice),
      );
      setCustomizeRegulerPrice(
        prevRegulerPrice => prevRegulerPrice - parseInt(RegulerPrice),
      );
    }
  };

  const handleShowModal = () => {
    modelRef?.current?.showModal();
  };
  const handleCustomizeModal = () => {
    customizePackageRef?.current?.showModal();
  };
  const handleHideModal = () => {
    modelRef?.current?.hideModal();
  };
  const handlecustomizeHideModal = () => {
    customizePackageRef?.current?.hideModal();
  };
  const handleDetailsShowModal = () => {
    ViewDetailsRef?.current?.showModal();
  };
  const handleDetailsPackageShowModal = () => {
    viewDetailsPackage?.current?.showModal();
  };
  const handleDetailsPackageHideModal = () => {
    viewDetailsPackage?.current?.hideModal();
  };
  const handleDetailsHideModal = () => {
    ViewDetailsRef?.current?.hideModal();
  };

  const selectedServiceNames = selectedServices?.map(
    service => service.ServiceName,
  );

  const selectedCustomizePckageDetails = {
    packageName: selectedCustomizeServices,
    packageTotalTime: totalCustomizeTime,
    packagetotalPrice: selectedCustomizePackageData?.payble,
    packageRegulerPrice: selectedCustomizePackageData?.RPrice,
    packageTitle: selectedCustomizePackageData?.packageTitle,
    type: 'Customize',
    quantity: 1,
    id: selectedCustomizePackageData?._id,
    PCGroup: PCGroup,
  };

  const totalRegularPrice = selectedServices.reduce((accumulator, service) => {
    return accumulator + service.RegulerPrice;
  }, 0);

  const totalSalePrice = selectedServices.reduce((accumulator, service) => {
    return accumulator + service.ServicePrice;
  }, 0);
  const totalTimee = selectedServices.reduce(
    (total, service) =>
      total +
      parseInt(service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime),
    0,
  );
  let TotalItems = selectedCustomizeServices.length;
  let TotalEditableItems = selectedServices.length;
  let TotalSaved = customizeRegulerPrice - customizeTotalPrice;
  let totalSavedPrice =
    parseInt(selectedCustomizePackageData?.RPrice) -
    parseInt(selectedCustomizePackageData?.payble);

  const selectedEditPckageDetails = {
    packageName: selectedServiceNames,
    packageTotalTime: selectedServices?.reduce(
      (total, service) =>
        total +
        parseInt(
          service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
        ),
      0,
    ),
    packagetotalPrice: totalSalePrice,
    packageRegulerPrice: totalRegularPrice,
    type: 'Editable',
    packageTitle: selectedpackagedata?.packageTitle,
    quantity: 1,
    id: selectedpackagedata?._id,
    PCGroup: PCGroup,
    pcatId: selectedpackagedata?.PcatId,
  };

  let packageTotalTimeInModal = 0;
  let packageTotalPriceInModal = 0;
  let packageSalePriceInModal = 0;
  viewDetailsPackageModal?.serviceId?.forEach(servicee => {
    let service = servicee.service;
    packageTotalTimeInModal += parseInt(
      service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
    );
    packageTotalPriceInModal += parseInt(
      service?.ServiceVarients[0]?.VarientDiscription[0]?.regularPrice,
    );
    packageSalePriceInModal += parseInt(
      service?.ServiceVarients[0]?.VarientDiscription[0]?.salePrice,
    );
  });

  const handleViewDetailsModal = () => {
    if (viewDetailsPackageModal.packageType == 'Editable') {
      let services = viewDetailsPackageModal?.serviceId;

      const serviceNames = [];
      let totalSalePrice = 0;
      let totalRegularPrice = 0;
      let totalServiceTime = 0;
      // Iterate over each service

      services.forEach(servicee => {
        let service = servicee.service;
        // Extract service name
        const serviceName = service.ServiceName;
        serviceNames.push(serviceName);

        // Extract total sale price and total regular price
        service.ServiceVarients.forEach(variant => {
          variant.VarientDiscription.forEach(discription => {
            totalSalePrice += parseInt(discription.salePrice);
            totalRegularPrice += parseInt(discription.regularPrice);
            totalServiceTime += parseInt(
              service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
            );
          });
        });
      });

      let primaryServices = [];
      viewDetailsPackageModal?.serviceId?.forEach(serviceObjectt => {
        let serviceObject = serviceObjectt?.service;
        const serviceNames = serviceObject?.ServiceName;
        if (serviceNames) {
          primaryServices.push(serviceNames);
        }
      });
      const selectedEditPckageDetails = {
        packageName: primaryServices,
        packageTotalTime: totalServiceTime,
        packagetotalPrice: totalSalePrice,
        packageRegulerPrice: totalRegularPrice,
        type: 'Editable',
        packageTitle: viewDetailsPackageModal?.packageTitle,
        quantity: 1,
        id: viewDetailsPackageModal?._id,
        PCGroup: PCGroup,
        pcatId: viewDetailsPackageModal.PCatId,
      };

      dispatch(addToCart(selectedEditPckageDetails));
      handleDetailsPackageHideModal();

      console.log('Editable Pressed', selectedEditPckageDetails);
    }

    if (viewDetailsPackageModal.packageType == 'Customize') {
      let services = viewDetailsPackageModal?.serviceId;

      console.log('customized', services);

      const serviceNames = [];
      let totalSalePrice = 0;
      let totalRegularPrice = 0;
      let totalServiceTime = 0;
      // Iterate over each service
      services.forEach(servicee => {
        let service = servicee.service;

        // Extract service name
        const serviceName = service.ServiceName;
        serviceNames.push(serviceName);

        // Extract total sale price and total regular price
        service.ServiceVarients.forEach(variant => {
          variant.VarientDiscription.forEach(discription => {
            totalSalePrice += parseInt(discription.salePrice);
            totalRegularPrice += parseInt(discription.regularPrice);
            totalServiceTime += parseInt(
              service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
            );
          });
        });
      });

      let primaryServices = [];
      viewDetailsPackageModal?.serviceId?.forEach(serviceObject => {
        const serviceNames = serviceObject?.ServiceName;
        if (serviceNames) {
          primaryServices.push(serviceNames);
        }
      });
      const selectedCustomizePckageDetails = {
        packageName: primaryServices,
        packageTotalTime: totalServiceTime,
        packagetotalPrice: totalSalePrice,
        packageRegulerPrice: totalRegularPrice,
        type: 'Customize',
        packageTitle: viewDetailsPackageModal?.packageTitle,
        quantity: 1,
        id: viewDetailsPackageModal?._id,
        PCGroup: PCGroup,
        pcatId: viewDetailsPackageModal?.PcatId,
      };

      dispatch(addToCart(selectedCustomizePckageDetails));
      handleDetailsPackageHideModal();

      console.log('Customize Pressed', selectedCustomizePckageDetails);
    } else {
      let services = viewDetailsPackageModal?.serviceId;

      const serviceNames = [];
      let totalSalePrice = 0;
      let totalRegularPrice = 0;
      let totalServiceTime = 0;

      // Iterate over each service
      services.forEach(servicee => {
        let service = servicee.service;
        // Extract service name
        const serviceName = service.ServiceName;
        serviceNames.push(serviceName);

        // Extract total sale price and total regular price
        service.ServiceVarients.forEach(variant => {
          variant.VarientDiscription.forEach(discription => {
            totalSalePrice += parseInt(discription.salePrice);
            totalRegularPrice += parseInt(discription.regularPrice);
            totalServiceTime += parseInt(
              service?.ServiceVarients[0]?.VarientDiscription[0]?.ServiceTime,
            );
          });
        });
      });

      const selectedNormalPckageDetails = {
        packageName: serviceNames,
        packageTotalTime: totalServiceTime,
        packagetotalPrice: totalSalePrice,
        packageRegulerPrice: totalRegularPrice,
        type: 'Normal',
        packageTitle: viewDetailsPackageModal?.packageTitle,
        quantity: 1,
        id: viewDetailsPackageModal?._id,
        PCGroup: PCGroup,
        pcatId: viewDetailsPackageModal?.PcatId,
      };
      dispatch(addToCart(selectedNormalPckageDetails));
      handleDetailsPackageHideModal();

      console.log('Editable Pressed', selectedNormalPckageDetails);
    }
  };

  const renderTitle = title => {
    return (
      <CustomText
        style={{
          marginTop: 10,
        }}
        margin_h={10}
        bold
        value={title}
      />
    );
  };

  const renderListt = (title, listData) => {
    return (
      <>
        <View>
          {renderTitle(title)}

          <FlatList
            ref={flatListRef}
            scrollEnabled={false}
            data={listData}
            renderItem={(item, index) => {
              return (
                <View key={index}>
                  <RenderServices
                    key={index}
                    item={item?.item}
                    index={item?.index}
                    handleCheckboxTogggle={e => {
                      handleCheckboxToggle(e);
                    }}
                    selectedServices={selectedServices}
                    customizeData={selectedCustomizePckageDetails}
                  />
                </View>
              );
            }}
            keyExtractor={item =>
              item?.ServiceName
                ? item?.ServiceVarients?.ServiceType?._id
                : item._id
            }
          />
        </View>
      </>
    );
  };
  let groupNamee = [...new Set(groupName)];

  const renderers = {
    p: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const defaultStyle = {
        margin: 0,
      };

      // Merge default styles with styles from HTML attributes
      const mergedStyles = {...defaultStyle, ...convertedCSSStyles};

      return (
        <Text style={mergedStyles} key={passProps.key}>
          {children}
        </Text>
      );
    },
  };

  return (
    <Container>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <CustomHeader
          l_type={'back_arrow'}
          title={params ? params?.PCName : ''}
        />

        <View
          style={{
            backgroundColor: 'white',
            // marginTop: 10,
          }}>
          <FlatList
            ref={flatListRef}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={catogoryData}
            renderItem={renderSelectableItem}
            keyExtractor={item => item._id}
            nestedScrollEnabled={true}
          />
        </View>
        {groupNamee?.length > 0 && (
          <View
            style={{
              backgroundColor: '#E3E3E3',
            }}>
            <ScrollView
              scrollEnabled={groupNamee.length == 1 ? false : true}
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 10,
                backgroundColor: '#E3E3E3',
                paddingRight: 140,
              }}
              horizontal={true}>
              {groupNamee?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      scrollToGroup(item);
                      setSelectedGroup(index);
                      scrollToCenter(index);
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor:
                        selectedGroup == index ? Theme.PrimaryColor : 'grey',
                      padding: 5,
                      marginHorizontal: 5,
                      borderRadius: 10,
                      paddingHorizontal: 14,
                      marginTop: 10,
                      backgroundColor:
                        selectedGroup == index ? Theme.PrimaryColor : '#CCCCCC',
                    }}>
                    <CustomText
                      color={selectedGroup == index ? 'white' : 'black'}
                      size={12}
                      value={item}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {loading ? (
          <Loader size={40} color={Theme.PrimaryColor} />
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            {allData.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  paddingBottom: 150,
                }}>
                <Image
                  source={Assets.nodata}
                  resizeMode="center"
                  style={{
                    width: 300,
                    height: 300,
                  }}
                />
              </View>
            ) : (
              <FlatList
                ref={GroupRef}
                contentContainerStyle={{
                  paddingBottom: 180,
                }}
                showsVerticalScrollIndicator={false}
                data={Object.entries(listsByTitle)}
                renderItem={({item}) => {
                  const [title, listData] = item;

                  return (
                    <View key={title}>{renderListt(title, listData)}</View>
                  );
                }}
                keyExtractor={item => item[0]}
              />
            )}
          </View>
        )}

        {cart.length > 0 ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: '15%',
            }}>
            <View>
              <View
                style={{
                  paddingBottom: 50,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  position: 'absolute',
                  backgroundColor: 'white',
                  width: '100%',
                }}>
                <View
                  style={{
                    backgroundColor:
                      minCartValue < sumTotalPrice + 1 == false
                        ? 'grey'
                        : Theme.PrimaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 5,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    flexDirection: 'row',
                  }}>
                  {minCartValue < sumTotalPrice + 1 == false ? (
                    <CustomText
                      margin_h={7}
                      color={'white'}
                      value={
                        'Please add' +
                        ' ' +
                        diffrence +
                        ' ' +
                        'Rupees items in your cart'
                      }
                    />
                  ) : (
                    <CustomText
                      margin_h={7}
                      color={'white'}
                      value={
                        'Congratulation you saved ₹ ' + TotalSavedItemsCart
                      }
                    />
                  )}
                </View>
                <CustomRow
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  ratios={[0, 1]}>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <CustomText
                        margin_h={10}
                        align={'left'}
                        value={sumTotalPrice ? sumTotalPrice : '0'}
                        size={15}
                        medium
                      />
                      <CustomText
                        size={11}
                        style={{
                          textDecorationLine: 'line-through',
                        }}
                        value={'₹' + sumRegulerPrice ? sumRegulerPrice : '0'}
                      />
                    </View>
                    <CustomText
                      margin_h={10}
                      value={totalQuantity + ' Items'}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (minCartValue < sumTotalPrice + 1 == false) {
                        showMessage({
                          message:
                            'Please add' +
                            diffrence +
                            'Rupees items in your cart',
                          icon: 'danger',
                          type: 'danger',
                          position: 'top',
                        });
                      } else {
                        Navigation.navigate(Routes.SummaryScreen);
                      }
                    }}>
                    <CustomButton
                      onPress={() => {
                        if (minCartValue < sumTotalPrice + 1 == false) {
                          showMessage({
                            message:
                              'Please add' +
                              ' ' +
                              diffrence +
                              ' ' +
                              'Rupees items in your cart',
                            icon: 'danger',
                            type: 'danger',
                            position: 'top',
                          });
                        } else {
                          Navigation.navigate(Routes.SummaryScreen);
                        }
                      }}
                      style={{
                        width: '50%',
                        position: 'absolute',
                        right: 20,
                        top: 1,
                        backgroundColor:
                          minCartValue < sumTotalPrice + 1 == false
                            ? 'grey'
                            : Theme.PrimaryColor,
                      }}
                      title={'View Cart'}
                    />
                  </TouchableOpacity>
                </CustomRow>
              </View>
            </View>
          </View>
        ) : null}

        <View>
          {selectedpackagedata && (
            <AnimatedModal ref={modelRef}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingVertical: 10,
                  }}>
                  <CustomRow
                    v_center
                    ratios={[1, 0]}
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <CustomText
                      size={15}
                      medium
                      color={'white'}
                      value={selectedpackagedata?.packageTitle}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleHideModal();
                      }}>
                      <CustomIcon
                        size={25}
                        name={'cross'}
                        type={'ENT'}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </CustomRow>

                  <CustomRow
                    v_center
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <CustomIcon
                      color={'white'}
                      size={12}
                      name={'clockcircleo'}
                      type={'AN'}
                    />
                    <CustomText
                      margin_h={5}
                      color={'white'}
                      value={totalTimee ? totalTimee + 'Min' : '0' + 'Min'}
                    />
                  </CustomRow>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}>
                  <View
                    style={{
                      // paddingBottom: '90%',
                      backgroundColor: 'white',
                      flex: 0.83,
                    }}>
                    <GroupedServicesList
                      groupedServices={renderedServicesWithCommonTitle}
                      handleVariantSelect={handleVariantSelect}
                      selectedServicePrices={selectedServicePrices}
                    />
                  </View>
                </ScrollView>
                <View>
                  <View
                    style={{
                      paddingBottom: 20,

                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      position: 'absolute',
                      bottom: 0,

                      backgroundColor: 'white',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        backgroundColor: Theme.PrimaryColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 5,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        flexDirection: 'row',
                      }}>
                      <CustomIcon name={''} />
                      <CustomText
                        margin_h={7}
                        color={'white'}
                        value={
                          'Congratulation you saved ₹ ' + TotalEditableSaved
                        }
                      />
                    </View>
                    <CustomRow
                      style={{
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                      ratios={[0, 1]}>
                      <View
                        style={{
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <CustomText
                            margin_h={10}
                            align={'left'}
                            value={totalSalePrice ? totalSalePrice : '0'}
                            size={15}
                            medium
                          />
                          <CustomText
                            size={11}
                            style={{
                              textDecorationLine: 'line-through',
                            }}
                            value={
                              '₹' + totalRegularPrice ? totalRegularPrice : '0'
                            }
                          />
                        </View>
                        <CustomText
                          margin_h={10}
                          value={
                            selectedServices
                              ? TotalEditableItems + ' Items'
                              : '0 Items'
                          }
                        />
                      </View>

                      <CustomButton
                        style={{
                          width: '50%',
                          position: 'absolute',
                          right: 20,
                          top: 1,
                        }}
                        title={'Done'}
                        onPress={() => {
                          if (selectedServices.length > 0) {
                            dispatch(addToCart(selectedEditPckageDetails));
                          } else {
                            console.log('koi service added nahi hai');
                          }
                          handleHideModal();
                        }}
                      />
                    </CustomRow>
                  </View>
                </View>
              </View>
            </AnimatedModal>
          )}
        </View>
        <View>
          {selectedCustomizePackageData && (
            <AnimatedModal ref={customizePackageRef}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingBottom: 150,
                }}>
                <View
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingVertical: 10,
                  }}>
                  <CustomRow
                    v_center
                    ratios={[1, 0]}
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <CustomText
                      size={15}
                      medium
                      color={'white'}
                      value={
                        selectedCustomizePackageData
                          ? selectedCustomizePackageData?.packageTitle
                          : ''
                      }
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handlecustomizeHideModal();
                      }}>
                      <CustomIcon
                        size={25}
                        name={'cross'}
                        type={'ENT'}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </CustomRow>

                  <CustomRow
                    v_center
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <CustomIcon
                      color={'white'}
                      size={12}
                      name={'clockcircleo'}
                      type={'AN'}
                    />
                    <CustomText
                      margin_h={5}
                      color={'white'}
                      value={
                        totalCustomizeTime
                          ? totalCustomizeTime + 'Min'
                          : '0' + 'Min'
                      }
                    />
                  </CustomRow>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: '80%',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      {customizedItems &&
                        customizedItems.map((itemm, index) => {
                          let item = itemm.service;

                          console.log('totalSavedPrice', totalSavedPrice);
                          return (
                            <View style={{}}>
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  paddingHorizontal: 20,
                                }}>
                                <CustomRow v_center>
                                  <TouchableOpacity
                                    style={{
                                      padding: 5,
                                    }}
                                    onPress={() => {
                                      handleCheckboxTogle(
                                        item?.ServiceVarients[0]?.ServiceType
                                          ?.Name == 'NA'
                                          ? item.ServiceName +
                                              '-' +
                                              item?.ChildCatIDs?.CCName
                                          : item.ServiceName +
                                              '-' +
                                              item?.ServiceVarients[0]
                                                ?.ServiceType?.Name,

                                        parseInt(
                                          item.ServiceVarients[0]
                                            .VarientDiscription[0].ServiceTime,
                                        ),

                                        item.ServiceVarients[0]
                                          .VarientDiscription[0].salePrice,
                                        item.ServiceVarients[0]
                                          .VarientDiscription[0].regularPrice,
                                      );
                                    }}>
                                    <CustomIcon
                                      type={'MC'}
                                      color={Theme.PrimaryColor}
                                      size={19}
                                      name={
                                        selectedCustomizeServices.includes(
                                          //
                                          item?.ServiceVarients[0]?.ServiceType
                                            ?.Name == 'NA'
                                            ? item.ServiceName +
                                                '-' +
                                                item?.ChildCatIDs?.CCName
                                            : item.ServiceName +
                                                '-' +
                                                item?.ServiceVarients[0]
                                                  ?.ServiceType?.Name,
                                        )
                                          ? 'checkbox-marked'
                                          : 'checkbox-blank-outline'
                                      }
                                    />
                                  </TouchableOpacity>

                                  <View
                                    style={{
                                      marginLeft: 10,
                                    }}>
                                    <CustomText
                                      regular
                                      value={
                                        item?.ServiceVarients[0]?.ServiceType
                                          ?.Name == 'NA'
                                          ? item.ServiceName +
                                            '-' +
                                            item?.ChildCatIDs?.CCName
                                          : item.ServiceName +
                                            '-' +
                                            item?.ServiceVarients[0]
                                              ?.ServiceType?.Name
                                      }
                                    />
                                  </View>
                                </CustomRow>
                              </View>
                            </View>
                          );
                        })}
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      backgroundColor: 'white',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        backgroundColor: Theme.PrimaryColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 5,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        flexDirection: 'row',
                      }}>
                      {/* <CustomImage size={12} src={Assets.tag} /> */}
                      <CustomIcon name={''} />
                      <CustomText
                        margin_h={7}
                        color={'white'}
                        value={'Congratulation you saved ₹ ' + totalSavedPrice}
                      />
                    </View>
                    <CustomRow
                      style={{
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                      ratios={[1, 0]}>
                      <View
                        style={{
                          marginTop: 10,
                        }}>
                        <CustomText
                          margin_h={10}
                          value={
                            selectedCustomizeServices
                              ? TotalItems + ' Items'
                              : '0 Items'
                          }
                        />
                      </View>

                      <CustomButton
                        onPress={() => {
                          if (selectedCustomizeServices.length > 0) {
                            let existingItem = cart.find(
                              e => e.id === selectedCustomizePackageData._id,
                            );
                            if (existingItem) {
                              let a = {
                                id: selectedCustomizePackageData._id,
                                updatedDetails: selectedCustomizePckageDetails,
                              };
                              dispatch(updateItemInCart(a));
                            } else {
                              dispatch(
                                addToCart(selectedCustomizePckageDetails),
                              );
                            }
                            handlecustomizeHideModal();
                          }
                        }}
                        style={{
                          width: '75%',

                          backgroundColor:
                            selectedCustomizeServices.length > 0
                              ? Theme.PrimaryColor
                              : 'grey',
                        }}
                        title={'Done'}
                      />
                    </CustomRow>
                  </View>
                </View>
              </View>
            </AnimatedModal>
          )}
        </View>

        <AnimatedModal ref={selectServiceModal}>
          <View
            style={{
              flex: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: '60%',
            }}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: '30%',
                flexGrow: 1,
                backgroundColor: 'white',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor: Theme.PrimaryColor,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingVertical: 10,
                }}>
                <CustomRow
                  v_center
                  ratios={[1, 0]}
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <CustomText
                    size={15}
                    medium
                    color={'white'}
                    value={'Select Service Type'}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      handleSelctservicehideModal();
                    }}>
                    <CustomIcon
                      size={25}
                      name={'cross'}
                      type={'ENT'}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </CustomRow>
              </View>

              <View>
                {selectedVariant != undefined &&
                  selectedVariant?.serviceType?.map((item, index) => {
                    const isSelected = selectedVariants === index;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleCheckboxToglee(
                            selectedVariant.serviceName,
                            parseInt(selectedVariant.serviceTime),
                            item?.VarientDiscription[0]?.salePrice,
                            item?.VarientDiscription[0]?.regularPrice,
                            item?.ServiceType?.Name,
                          );
                          handleSelctservicehideModal();
                          setSelectedVariants(index);
                        }}
                        style={{
                          marginHorizontal: 10,

                          marginTop: 10,
                        }}
                        key={index}>
                        <CustomRow ratios={[0, 0, 1]} v_center>
                          <CustomIcon
                            name={'dot-circle'}
                            type={'FA5'}
                            size={20}
                            color={isSelected ? Theme.PrimaryColor : 'grey'}
                          />
                          <CustomText
                            size={20}
                            regular
                            margin_h={10}
                            value={item?.ServiceType?.Name}
                          />
                          <View
                            style={{
                              alignSelf: 'flex-end',
                            }}>
                            <CustomText
                              regular
                              value={
                                '₹' + item?.VarientDiscription[0]?.salePrice
                              }
                            />
                          </View>
                        </CustomRow>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </AnimatedModal>

        <View>
          <AnimatedModal ref={ViewDetailsRef}>
            {viewDetails && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View>
                  <View
                    style={{
                      backgroundColor: Theme.PrimaryColor,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      paddingVertical: 10,
                    }}>
                    <CustomRow
                      v_center
                      ratios={[1, 0]}
                      style={{
                        paddingHorizontal: 10,
                      }}>
                      <CustomText
                        size={15}
                        medium
                        color={'white'}
                        value={
                          viewDetails.ServiceName
                            ? viewDetails.ServiceName
                            : viewDetails.packageTitle
                        }
                      />
                      <TouchableOpacity
                        onPress={() => {
                          handleDetailsHideModal();
                        }}>
                        <CustomIcon
                          size={25}
                          name={'cross'}
                          type={'ENT'}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </CustomRow>

                    <CustomRow
                      v_center
                      style={{
                        paddingHorizontal: 10,
                      }}>
                      <CustomIcon
                        color={'white'}
                        size={12}
                        name={'clockcircleo'}
                        type={'AN'}
                      />
                      <CustomText
                        margin_h={5}
                        color={'white'}
                        value={
                          viewDetails
                            ? viewDetails?.ServiceVarients[0]
                                ?.VarientDiscription[0]?.ServiceTime + 'Min'
                            : '0' + 'Min'
                        }
                      />
                    </CustomRow>
                  </View>

                  <ScrollView
                    contentContainerStyle={{
                      paddingBottom: '80%',
                      backgroundColor: 'white',
                      flexGrow: 1,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                      }}>
                      <CustomImage
                        style={{
                          width: '90%',
                          height: 200,
                          borderRadius: 10,
                        }}
                        src={{
                          uri: viewDetails?.ServiceVarients[0]
                            ?.VarientDiscription[0]?.ServiceImage
                            ? Endpoints.baseUrl +
                              viewDetails?.ServiceVarients[0]
                                ?.VarientDiscription[0]?.ServiceImage
                            : Endpoints.baseUrl + viewDetails?.packageImage,
                        }}
                      />
                    </View>
                    <CustomRow
                      v_center
                      style={{
                        paddingHorizontal: 10,
                        marginLeft: 10,
                      }}>
                      <CustomIcon
                        color={Theme.PrimaryColor}
                        size={12}
                        name={'clockcircleo'}
                        type={'AN'}
                      />
                      <CustomText
                        margin_h={5}
                        medium
                        color={'black'}
                        value={
                          viewDetails
                            ? viewDetails?.ServiceVarients[0]
                                ?.VarientDiscription[0]?.ServiceTime + 'Min'
                            : '0' + 'Min'
                        }
                      />
                    </CustomRow>

                    {viewDetails.packageTitle &&
                      viewDetails?.serviceId.map((item, index) => {
                        return (
                          <View key={index}>
                            <CustomRow v_center>
                              <CustomText
                                value={'\u2022' + ' ' + item.ServiceName}
                                regular
                              />
                            </CustomRow>
                          </View>
                        );
                      })}

                    <CustomRow
                      style={{
                        marginBottom: 5,
                        marginLeft: 20,
                      }}
                      v_center>
                      <CustomText
                        style={{
                          fontWeight: '600',
                        }}
                        color={Theme.Black}
                        size={13}
                        value={
                          '₹ ' +
                          viewDetails?.ServiceVarients[0]?.VarientDiscription[0]
                            ?.salePrice
                        }
                      />
                      <CustomText
                        size={12}
                        margin_h={10}
                        style={{
                          textDecorationLine: 'line-through',
                        }}
                        color={'grey'}
                        value={
                          '₹ ' +
                          viewDetails?.ServiceVarients[0]?.VarientDiscription[0]
                            ?.regularPrice
                        }
                      />
                      <CustomText
                        medium
                        style={{
                          marginTop: -2,
                        }}
                        value={'|'}
                      />
                      <CustomText
                        size={12}
                        margin_h={10}
                        color={'green'}
                        value={
                          viewDetails?.ServiceVarients[0]?.VarientDiscription[0]
                            ?.serviceDiscount +
                          '%' +
                          ' off'
                        }
                      />
                    </CustomRow>

                    {viewDetails?.ServiceVarients[0]?.VarientDiscription[0]
                      ?.ServiceDiscription ? (
                      <View
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                        }}>
                        <RenderHTML
                          tagsStyles={{
                            p: {margin: '0px'},
                            h1: {margin: '0px', marginBottom: '10px'},
                            h2: {margin: '0px', marginBottom: '10px'},
                            h3: {
                              margin: '0px',
                              // marginBottom: '10px',
                              // paddingBottom: '20px',
                            },
                            li: {
                              margin: '0px',
                              paddingLeft: 0,
                            },
                            ul: {
                              margin: '0px',
                              paddingLeft: 10,
                              paddingVertical: 10,
                              // backgroundColor: 'green',
                            },
                          }}
                          source={{
                            html: viewDetails?.ServiceVarients[0]
                              ?.VarientDiscription[0].ServiceDiscription,
                          }}
                          contentWidth={200}
                        />
                      </View>
                    ) : null}
                  </ScrollView>
                  <View
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      position: 'absolute',
                      bottom: 30,
                      backgroundColor: 'white',
                    }}>
                    <CustomButton
                      width={'90%'}
                      onPress={() => {
                        // let serviceData = {
                        //   packageTotalTime:
                        //     viewDetails?.ServiceVarients[0]
                        //       ?.VarientDiscription[0]?.ServiceTime,
                        //   packagetotalPrice:
                        //     viewDetails?.ServiceVarients[0]
                        //       ?.VarientDiscription[0]?.salePrice,
                        //   packageRegulerPrice:
                        //     viewDetails?.ServiceVarients[0]
                        //       ?.VarientDiscription[0]?.regularPrice,
                        //   type: 'Service',
                        //   packageTitle: viewDetails?.ServiceName,
                        //   quantity: 1,
                        //   PCGroup: viewDetails.PCGroup,
                        //   id: viewDetails?._id,
                        //   pcatId: viewDetails.PCatId,
                        // };
                        let serviceData = {
                          packageTotalTime:
                            viewDetails?.ServiceVarients[0]
                              ?.VarientDiscription[0]?.ServiceTime,
                          packagetotalPrice:
                            viewDetails?.ServiceVarients[0]
                              ?.VarientDiscription[0]?.salePrice,
                          packageRegulerPrice:
                            viewDetails?.ServiceVarients[0]
                              ?.VarientDiscription[0]?.regularPrice,
                          type: 'Service',
                          packageTitle:
                            viewDetails?.ServiceVarients[0]?.ServiceType
                              ?.Name != 'NA'
                              ? viewDetails?.ServiceName +
                                '-' +
                                viewDetails?.ServiceVarients[0]?.ServiceType
                                  ?.Name
                              : viewDetails?.ServiceName +
                                '-' +
                                viewDetails?.ChildCatIDs?.CCName,
                          quantity: 1,
                          PCGroup: PCGroup,
                          id: viewDetails?.ServiceVarients[0]?._id,
                          pcatId: viewDetails?.PCatId,
                        };

                        dispatch(addToCart(serviceData));

                        console.log('serviceData', serviceData);
                        handleDetailsHideModal();
                      }}
                      title={'Add to Cart'}
                    />
                  </View>
                </View>
              </View>
            )}
          </AnimatedModal>
        </View>
        <View>
          <AnimatedModal ref={viewDetailsPackage}>
            {viewDetailsPackageModal && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingVertical: 10,
                  }}>
                  <CustomRow
                    v_center
                    ratios={[1, 0]}
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <CustomText
                      size={15}
                      medium
                      color={'white'}
                      value={viewDetailsPackageModal.packageTitle}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleDetailsPackageHideModal();
                      }}>
                      <CustomIcon
                        size={25}
                        name={'cross'}
                        type={'ENT'}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </CustomRow>

                  <CustomRow
                    v_center
                    style={{
                      paddingHorizontal: 10,
                    }}>
                    <CustomIcon
                      color={'white'}
                      size={12}
                      name={'clockcircleo'}
                      type={'AN'}
                    />
                    <CustomText
                      margin_h={5}
                      color={'white'}
                      value={
                        viewDetailsPackageModal
                          ? packageTotalTimeInModal + 'Min'
                          : '0' + 'Min'
                      }
                    />
                  </CustomRow>
                </View>
                <ScrollView
                  scrollEnabled={true}
                  contentContainerStyle={{
                    paddingBottom: '40%',
                    flexGrow: 1,
                  }}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                      }}>
                      <CustomImage
                        style={{
                          width: '90%',
                          height: 200,
                        }}
                        src={{
                          uri:
                            Endpoints.baseUrl +
                            viewDetailsPackageModal?.packageImage,
                        }}
                      />
                    </View>
                    <CustomRow
                      v_center
                      style={{
                        paddingHorizontal: 10,
                        marginLeft: 10,
                      }}>
                      <CustomIcon
                        color={Theme.PrimaryColor}
                        size={12}
                        name={'clockcircleo'}
                        type={'AN'}
                      />
                      <CustomText
                        margin_h={5}
                        color={'black'}
                        medium
                        value={
                          viewDetailsPackageModal
                            ? packageTotalTimeInModal + 'Min'
                            : '0' + 'Min'
                        }
                      />
                    </CustomRow>

                    <CustomRow
                      style={{
                        marginLeft: 20,
                      }}>
                      <CustomText
                        color={Theme.Black}
                        size={12}
                        regular
                        value={'₹ ' + packageTotalPriceInModal}
                      />

                      <CustomText
                        size={12}
                        margin_h={10}
                        style={{
                          textDecorationLine: 'line-through',
                        }}
                        regular
                        color={'grey'}
                        value={packageSalePriceInModal}
                      />
                    </CustomRow>
                    <View
                      style={{
                        marginLeft: 20,
                      }}>
                      {viewDetailsPackageModal?.discription ? (
                        <View
                          style={{
                            alignSelf: 'flex-start',
                          }}>
                          <RenderHTML
                            tagsStyles={{
                              p: {margin: '0px'},
                              h1: {margin: '0px', marginBottom: '10px'},
                              h2: {margin: '0px', marginBottom: '10px'},
                              h3: {
                                margin: '0px',
                                marginBottom: '10px',
                                paddingBottom: '20px',
                              },
                              li: {
                                margin: '0px',
                                paddingLeft: 0,
                              },
                              ul: {
                                margin: '0px',
                                paddingLeft: 10,
                                paddingVertical: 10,
                                // backgroundColor: 'green',
                              },
                            }}
                            source={{
                              html: viewDetailsPackageModal?.discription,
                            }}
                            contentWidth={200}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    paddingBottom: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleViewDetailsModal();
                    }}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      position: 'absolute',
                      bottom: 0,
                      backgroundColor: 'white',
                      // paddingBottom: 50,
                    }}>
                    <CustomButton width={'90%'} title={'Add to Cart'} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </AnimatedModal>
        </View>

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}>
              <CustomRow>
                <CustomText color={'white'} value={'wil do it next day'} />
              </CustomRow>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Container>
  );
}
