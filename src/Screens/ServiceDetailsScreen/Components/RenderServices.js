import CustomCard from 'Components/CustomCard';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Endpoints from 'Configs/API/Endpoints';
import Theme from 'Configs/Theme';
import {
  addToCart,
  decreaseItemQuantity,
  increaseItemQuantity,
} from 'ReduxState/Slices/UserSlice';
import {useState} from 'react';
import {Share, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import {connect, useDispatch} from 'react-redux';

// export default function ({
//   item,
//   index,
//   handleCheckboxToggle,
//   selectedServices,
// }) {
//   const serviceId = item?.ServiceId || index;
//   const isChecked = selectedServices?.includes(serviceId);

//   const handleShare = async () => {
//     try {
//       const result = await Share.share({
//         message: 'abcd', // Message to be shared
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // Shared successfully
//           console.log('Shared successfully');
//         } else {
//           // Dismissed the share sheet
//           console.log('Dismissed the share sheet');
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // Share was dismissed
//         console.log('Share was dismissed');
//       }
//     } catch (error) {
//       // Error while sharing
//       console.error('Error while sharing:', error.message);
//     }
//   };

//   return (
//     <CustomCard
//       style={{
//         padding: 10,
//       }}>
//       <CustomRow
//         style={{
//           marginVertical: 10,
//         }}
//         ratios={[1, 0]}
//         v_center>
//         <CustomText
//           medium
//           color={Theme.Black}
//           value={item?.ServiceName || item?.packageTitle}
//         />
//         <TouchableOpacity onPress={handleShare}>
//           <CustomRow style={{marginRight: 5}} v_center>
//             <CustomText
//               value={'Share Now '}
//               color={Theme.PrimaryColor}
//               size={12}
//             />
//             <CustomIcon
//               name={'share'}
//               type={'FO'}
//               color={Theme.PrimaryColor}
//               size={12}
//             />
//           </CustomRow>
//         </TouchableOpacity>
//       </CustomRow>

//       <CustomRow ratios={[1, 0]}>
//         <View>
//           <CustomRow v_center>
//             <CustomIcon
//               name={'clock'}
//               type={'FA5'}
//               color={Theme.PrimaryColor}
//               size={12}
//             />
//             <CustomText
//               regular
//               margin_h={5}
//               value={item?.ServiceTime ? item.ServiceTime + ' Mins' : ''} // Ensure ServiceTime exists before accessing it
//             />
//           </CustomRow>

//           <CustomRow>
//             <CustomText
//               color={Theme.Black}
//               size={12}
//               regular
//               value={'₹ ' + (item?.SPrice || '')} // Ensure SPrice exists before accessing it
//             />
//             <CustomText
//               size={12}
//               margin_h={10}
//               color={'grey'}
//               regular
//               value={(item?.discount || '') + '%'} // Ensure discount exists before accessing it
//             />

//             <CustomText
//               size={12}
//               margin_h={10}
//               style={{textDecorationLine: 'line-through'}}
//               regular
//               color={'grey'}
//               value={item?.RPrice || ''} // Ensure RPrice exists before accessing it
//             />
//           </CustomRow>

//           <View
//             style={{
//               backgroundColor: 'grey',
//               height: 0.5,
//               width: '80%',
//               marginVertical: 10,
//             }}
//           />

//           {item?.ShortDiscription ? (
//             <View style={{alignSelf: 'flex-start', marginLeft: -20}}>
//               <RenderHTML
//                 source={{html: item.ShortDiscription}}
//                 contentWidth={200}
//               />
//             </View>
//           ) : null}
//         </View>
//         <View>
//           <CustomImage
//             style={{borderRadius: 10, marginRight: -10}}
//             size={80}
//             src={{
//               uri: Endpoints.baseUrl + (item.ServiceImage || item.packageImage),
//             }} // Ensure ServiceImage or packageImage exists before accessing it
//           />

//           <TouchableOpacity
//             style={{marginTop: 60}}
//             onPress={() => handleCheckboxToggle(item?._id)}>
//             <CustomRow v_center>
//               <CustomIcon
//                 color={Theme.PrimaryColor}
//                 name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
//                 size={15}
//                 type={'MC'}
//               />
//               <CustomText value={item?.ServiceName} regular />
//             </CustomRow>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{marginTop: 60}}
//             onPress={() => console.log('View Details Pressed')}>
//             {' '}
//             {/* Add View Details functionality */}
//             <CustomRow v_center>
//               <CustomText
//                 value={'View Details '}
//                 size={13}
//                 color={Theme.PrimaryColor}
//               />
//               <CustomIcon
//                 size={14}
//                 color={Theme.PrimaryColor}
//                 name={'doubleright'}
//                 type={'AN'}
//               />
//             </CustomRow>
//           </TouchableOpacity>
//         </View>
//       </CustomRow>
//     </CustomCard>
//   );
// }
function RenderServices({
  item,
  index,
  handleCheckboxToggle,
  selectedServices,
  oneditpackagepress,
  serviceData,
  customizeData,
}) {
  const [checkedState, setCheckedState] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  // const handleIncrease = () => {
  //   setQuantity(quantity + 1);
  // };

  // const handleDecrease = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const handleIncrease = itemId => {
  //   // Check if item already exists in cart
  //   const existingItem = user_info.cart.find(item => item.id === itemId);
  //   if (existingItem) {
  //     dispatch(increaseItemQuantity({itemId}));
  //   } else {
  //     // If item doesn't exist, add it to cart with quantity 1
  //     dispatch(addToCart({id: itemId, quantity: 1}));
  //   }
  // };

  // const handleAddToCart = ({serviceData}) => {
  //   dispatch(addToCart(serviceData));
  // };
  // const handleDecrease = itemId => {
  //   dispatch(decreaseItemQuantity({itemId}));
  // };
  // S

  //   const handleCheckboxToggle = ({item}) => {
  //     setCheckedState(prevState => !prevState);
  //     onToggleCheckbox(item); // Pass the service name or index here
  //   };

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
          borderWidth: 1,
          borderColor: Theme.PrimaryColor,

          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          style={{
            padding: 4,
          }}
          onPress={onDecrease}>
          <CustomIcon
            name={'minus'}
            type={'FA5'}
            color={Theme.PrimaryColor}
            size={11}
          />
        </TouchableOpacity>
        <CustomText size={13} margin_h={15} value={quantity.toString()} />
        <TouchableOpacity
          style={{
            padding: 4,
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

  // const selectedServiceDetails = ;
  if (item?.ServiceName) {
    const varient = item?.ServiceVarients[0];
    const varientDiscription = varient?.VarientDiscription[0];
    const salePrice = varientDiscription?.salePrice;
    const regularPrice = varientDiscription?.regularPrice;
    const discount = varientDiscription?.serviceDiscount;
    return (
      <CustomCard
        style={{
          padding: 10,
        }}>
        <CustomRow
          style={{
            marginVertical: 10,
            // marginHorizontal: 10,
          }}
          ratios={[1, 0]}
          v_center>
          <CustomText medium color={Theme.Black} value={item?.ServiceName} />
          <TouchableOpacity
            onPress={() => {
              handleShare();
            }}>
            <CustomRow
              style={{
                marginRight: 5,
              }}
              v_center>
              <CustomText
                value={'Share Now '}
                color={Theme.PrimaryColor}
                size={12}
              />
              <CustomIcon
                name={'share'}
                type={'FO'}
                color={Theme.PrimaryColor}
                size={12}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomRow>

        <CustomRow ratios={[1, 0]}>
          <View>
            <CustomRow v_center>
              <CustomIcon
                name={'clock'}
                type={'FA5'}
                color={Theme.PrimaryColor}
                size={12}
              />
              <CustomText
                regular
                margin_h={5}
                value={item?.ServiceTime + ' Mins'}
              />
            </CustomRow>

            <CustomRow>
              <CustomText
                color={Theme.Black}
                size={12}
                regular
                value={'₹ ' + salePrice}
              />
              <CustomText
                size={12}
                margin_h={10}
                color={'grey'}
                regular
                value={discount + '%'}
              />

              <CustomText
                size={12}
                margin_h={10}
                style={{
                  textDecorationLine: 'line-through',
                }}
                regular
                color={'grey'}
                value={regularPrice}
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
            {item.ShortDiscription ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: -20,
                }}>
                <RenderHTML
                  source={{html: item.ShortDiscription}}
                  contentWidth={200}
                />
              </View>
            ) : null}
          </View>
          <View
            style={
              {
                // marginTop: 10,
                // backgroundColor: 'red',
              }
            }>
            <CustomImage
              // resizeMode={'cover'}
              style={{
                borderRadius: 10,
                marginRight: -10,
              }}
              size={80}
              src={{uri: Endpoints.baseUrl + item.ServiceImage}}
            />
            {quantity == 0 ? (
              <TouchableOpacity
                onPress={() => {
                  console.log('service ', serviceData);
                  // handleAddToCart(serviceData);
                }}
                style={{
                  backgroundColor: Theme.PrimaryColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                  paddingVertical: 4,
                }}>
                <CustomText size={11} value={'Add'} regular color={'white'} />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  width: 90,
                }}>
                <QuantityControl
                  quantity={quantity}
                  // onIncrease={handleIncrease}
                  // onDecrease={handleDecrease}
                />
              </View>
            )}

            <TouchableOpacity
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

        {/* <Text>{item.ServiceName}</Text> */}
      </CustomCard>
    );
  } else if (item?.packageTitle && item?.packageType === 'Editable') {
    const serviceId = item?.ServiceId || index;

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
    return (
      <CustomCard
        style={{
          padding: 10,
        }}>
        <CustomRow
          style={{
            marginVertical: 10,
            // marginHorizontal: 10,
          }}
          ratios={[1, 0]}
          v_center>
          <CustomText medium color={Theme.Black} value={item?.packageTitle} />
          <TouchableOpacity
            onPress={() => {
              handleShare();
            }}>
            <CustomRow
              style={{
                marginRight: 5,
              }}
              v_center>
              <CustomText
                value={'Share Now '}
                color={Theme.PrimaryColor}
                size={12}
              />
              <CustomIcon
                name={'share'}
                type={'FO'}
                color={Theme.PrimaryColor}
                size={12}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomRow>

        <CustomRow ratios={[1, 0]}>
          <View
            style={{
              flex: 1,
            }}>
            <CustomRow>
              <CustomText
                color={Theme.Black}
                size={12}
                regular
                value={'₹ ' + item?.SPrice}
              />
              <CustomText
                size={12}
                margin_h={10}
                color={'grey'}
                regular
                value={item?.discount + '%'}
              />

              <CustomText
                size={12}
                margin_h={10}
                style={{
                  textDecorationLine: 'line-through',
                }}
                regular
                color={'grey'}
                value={item?.RPrice}
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
            <View
              style={{
                minHeight: '71%',
              }}>
              {item?.serviceId.map((item, index) => {
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
              {firstTwoServiceNames.map((item, index) => {
                console.log(item, 'llklk');
                return (
                  <View key={index}>
                    <CustomRow v_center>
                      <CustomText value={'\u2022' + ' ' + item} regular />

                      {/* <CustomText value={item} regular /> */}
                    </CustomRow>
                  </View>
                );
              })}
            </View>

            {item.ShortDiscription ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: -20,
                }}>
                <RenderHTML
                  source={{html: item.ShortDiscription}}
                  contentWidth={200}
                />
              </View>
            ) : null}
            <TouchableOpacity
              onPress={oneditpackagepress}
              style={{
                // paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
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
          </View>
          <View
            style={
              {
                // marginTop: 10,
                // backgroundColor: 'red',
              }
            }>
            <CustomImage
              style={{
                borderRadius: 10,
                marginRight: -10,
              }}
              size={80}
              src={{uri: Endpoints.baseUrl + item.packageImage}}
            />

            <TouchableOpacity
              style={{
                backgroundColor: Theme.PrimaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                borderRadius: 10,
                paddingVertical: 4,
              }}>
              <CustomText size={11} value={'Add'} regular color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
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

        {/* <Text>{item.ServiceName}</Text> */}
      </CustomCard>
    );
  } else if (item?.packageTitle && item?.packageType === 'Customize') {
    const serviceId = item?.ServiceId || index;
    const isChecked = selectedServices?.includes(serviceId);

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
    return (
      <CustomCard
        style={{
          padding: 10,
        }}>
        <CustomRow
          style={{
            marginVertical: 10,
          }}
          ratios={[1, 0]}
          v_center>
          <CustomText medium color={Theme.Black} value={item?.packageTitle} />
          <TouchableOpacity
            onPress={() => {
              handleShare();
            }}>
            <CustomRow
              style={{
                marginRight: 5,
              }}
              v_center>
              <CustomText
                value={'Share Now '}
                color={Theme.PrimaryColor}
                size={12}
              />
              <CustomIcon
                name={'share'}
                type={'FO'}
                color={Theme.PrimaryColor}
                size={12}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomRow>

        <CustomRow ratios={[1, 0]}>
          <View>
            <CustomRow>
              <CustomText
                color={Theme.Black}
                size={12}
                regular
                value={'₹ ' + item?.SPrice}
              />
              <CustomText
                size={12}
                margin_h={10}
                color={'grey'}
                regular
                value={item?.discount + '%'}
              />

              <CustomText
                size={12}
                margin_h={10}
                style={{
                  textDecorationLine: 'line-through',
                }}
                regular
                color={'grey'}
                value={item?.RPrice}
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

            {item?.serviceId.map((item, index) => {
              return (
                <View key={index}>
                  <CustomRow v_center>
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                        //   backgroundColor: 'red',
                      }}
                      onPress={() => handleCheckboxToggle(item?._id)}>
                      <CustomIcon
                        color={Theme.PrimaryColor}
                        name={
                          //   isChecked
                          // ?
                          'checkbox-marked'
                          // : 'checkbox-blank-outline'
                        }
                        size={15}
                        type={'MC'}
                      />
                    </TouchableOpacity>

                    <CustomText value={item.ServiceName} regular />
                  </CustomRow>
                </View>
              );
            })}
            {firstTwoServiceNames.map((item, index) => {
              return (
                <View key={index}>
                  <CustomRow v_center>
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                      }}
                      onPress={() => handleCheckboxToggle(item?._id)}>
                      <CustomIcon
                        color={Theme.PrimaryColor}
                        name={
                          //   isChecked
                          // ?
                          //   'checkbox-marked'
                          // :
                          'checkbox-blank-outline'
                        }
                        size={15}
                        type={'MC'}
                      />
                    </TouchableOpacity>

                    <CustomText value={item} regular />
                  </CustomRow>
                </View>
              );
            })}

            {item.ShortDiscription ? (
              <View
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: -20,
                }}>
                <RenderHTML
                  source={{html: item.ShortDiscription}}
                  contentWidth={200}
                />
              </View>
            ) : null}
          </View>
          <View
            style={
              {
                // marginTop: 10,
                // backgroundColor: 'red',
              }
            }>
            <CustomImage
              // resizeMode={'cover'}
              style={{
                borderRadius: 10,
                marginRight: -10,
              }}
              size={80}
              src={{uri: Endpoints.baseUrl + item.packageImage}}
            />

            <TouchableOpacity
              onPress={() => {
                dispatch(addToCart(customizeData));
              }}
              style={{
                backgroundColor: Theme.PrimaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                borderRadius: 10,
                paddingVertical: 4,
              }}>
              <CustomText size={11} value={'Add'} regular color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
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
  } else {
    return (
      <CustomCard
        style={{
          padding: 10,
        }}>
        <CustomRow
          style={{
            marginVertical: 10,
            // marginHorizontal: 10,
          }}
          ratios={[1, 0]}
          v_center>
          <CustomText medium color={Theme.Black} value={item?.packageTitle} />
          <TouchableOpacity
            onPress={() => {
              handleShare();
            }}>
            <CustomRow
              style={{
                marginRight: 5,
              }}
              v_center>
              <CustomText
                value={'Share Now '}
                color={Theme.PrimaryColor}
                size={12}
              />
              <CustomIcon
                name={'share'}
                type={'FO'}
                color={Theme.PrimaryColor}
                size={12}
              />
            </CustomRow>
          </TouchableOpacity>
        </CustomRow>

        <CustomRow ratios={[1, 0]}>
          <View>
            {/* <CustomRow v_center>
                <CustomIcon
                  name={'clock'}
                  type={'FA5'}
                  color={Theme.PrimaryColor}
                  size={12}
                />
                <CustomText
                  regular
                  margin_h={5}
                  value={item?.ServiceTime + ' Mins'}
                />
              </CustomRow> */}

            <CustomRow>
              <CustomText
                color={Theme.Black}
                size={12}
                regular
                value={'₹ ' + item?.SPrice}
              />
              <CustomText
                size={12}
                margin_h={10}
                color={'grey'}
                regular
                value={item?.discount + '%'}
              />

              <CustomText
                size={12}
                margin_h={10}
                style={{
                  textDecorationLine: 'line-through',
                }}
                regular
                color={'grey'}
                value={item?.RPrice}
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

            {item?.serviceId.map((item, index) => {
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
          </View>
          <View
            style={
              {
                // marginTop: 10,
                // backgroundColor: 'red',
              }
            }>
            <CustomImage
              // resizeMode={'cover'}
              style={{
                borderRadius: 10,
                marginRight: -10,
              }}
              size={80}
              src={{uri: Endpoints.baseUrl + item?.packageImage}}
            />

            <TouchableOpacity
              style={{
                backgroundColor: Theme.PrimaryColor,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                borderRadius: 10,
                paddingVertical: 4,
              }}>
              <CustomText size={11} value={'Add'} regular color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
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

        {/* <Text>{item.ServiceName}</Text> */}
      </CustomCard>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(RenderServices);
