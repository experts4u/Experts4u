import CheckBox from '@react-native-community/checkbox';
import Assets from 'Assets';
import CustomButton from 'Components/CustomButton';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomIcon from 'Components/CustomIcon';
import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import {useState} from 'react';
import {
  ImageBackground,
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function () {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSecondVisible, setSecondModalVisible] = useState(false);

  const [itemAdd, setItemAdd] = useState(0);

  let groupItems = [
    [
      {
        title: 'Top Selling',
      },
      {
        items: [
          {
            ofrtxt: 'Flat 25% off on Face Bleach',
            ofrimg: Assets.bleach,
            groupName: 'Most Demanded',
            time: '2 hrs 35 min',
            price: '₹899',
            discount: '10% off',
            totalprice: '₹999',
            servicelist: [
              'Express Manicure(20 mins)',
              'Face Neck Detan',
              'Face Neck Bleach',
              'Hot Oil Head Massage',
              'Hot Oil Head Massage',
            ],
            editable: true,
          },
          {
            ofrtxt: 'Flat 25% off on Face Bleach',
            ofrimg: Assets.bleach,
            groupName: 'Most Demanded',
            time: '2 hrs 35 min',
            price: '₹899',
            discount: '10% off',
            totalprice: '₹999',
            servicelist: [
              'Express Manicure(20 mins)',
              'Face Neck Detan',
              'Face Neck Bleach',
              'Hot Oil Head Massage',
              'Hot Oil Head Massage',
            ],
          },
          {
            ofrtxt: 'Flat 25% off on Face Bleach',
            ofrimg: Assets.bleach,
            groupName: 'Most Demanded',
            time: '2 hrs 35 min',
            price: '₹899',
            discount: '10% off',
            totalprice: '₹999',
            servicelist: [
              'Express Manicure(20 mins)',
              'Face Neck Detan',
              'Face Neck Bleach',
              'Hot Oil Head Massage',
              'Hot Oil Head Massage',
            ],
            editable: true,
          },
          {
            ofrtxt: 'Flat 25% off on Face Bleach',
            ofrimg: Assets.bleach,
            groupName: 'Most Demanded',
            time: '2 hrs 35 min',
            price: '₹899',
            discount: '10% off',
            totalprice: '₹999',
            servicelist: [
              'Express Manicure(20 mins)',
              'Face Neck Detan',
              'Face Neck Bleach',
              'Hot Oil Head Massage',
              'Hot Oil Head Massage',
            ],
          },
          {
            ofrtxt: 'Flat 25% off on Face Bleach',
            ofrimg: Assets.bleach,
            groupName: 'Most Demanded',
            time: '2 hrs 35 min',
            price: '₹899',
            discount: '10% off',
            card: true,
            totalprice: '₹999',
            servicelist: [
              'Express Manicure(20 mins)',
              'Face Neck Detan',
              'Face Neck Bleach',
              'Hot Oil Head Massage',
              'Hot Oil Head Massage',
            ],
          },
        ],
      },
    ],
  ];
  const RenderItem = ({
    title,

    card,
    items,
  }) => {
    let editable = items.editable;
    return (
      <>
        {title ? (
          <View
            style={{
              marginBottom: -5,
              marginHorizontal: 10,
              width: '100%',
            }}>
            <CustomText
              style={{
                marginVertical: 5,
              }}
              color={'black'}
              bold
              size={18}
              value={title}
            />
          </View>
        ) : (
          items?.map((item, index) => {
            return (
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                {card == true ? (
                  <CustomRow
                    style={{
                      backgroundColor: '#FF55344D',
                      // paddingHorizontal: 10,
                      paddingLeft: 7,
                      paddingRight: 2,
                      borderRadius: 10,
                    }}
                    h_center
                    v_center
                    ratios={[1, 0]}>
                    <CustomText
                      style={{
                        width: '60%',
                        marginVertical: 8,
                      }}
                      color={'black'}
                      size={14}
                      bold
                      value={item.ofrtxt}
                      align={'left'}
                    />
                    <CustomImage
                      style={{
                        width: 50,
                      }}
                      resizeMode={'center'}
                      size={50}
                      src={item.ofrimg}
                    />
                  </CustomRow>
                ) : null}

                <CustomCard
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <CustomRow ratios={[1, 0]}>
                    <View>
                      <CustomText
                        value={item.groupName}
                        bold
                        color={'black'}
                        size={15}
                      />

                      <CustomRow
                        style={{
                          marginVertical: 7,
                        }}
                        v_center>
                        {/* <CustomImage src={Assets.time} size={12} /> */}
                        <CustomIcon
                          name={'clockcircleo'}
                          type={'AN'}
                          size={12}
                          color={Theme.PrimaryColor}
                        />
                        <CustomText
                          margin_h={6}
                          color={'black'}
                          size={11}
                          value={item.time}
                        />
                      </CustomRow>

                      <CustomRow spacing={10} v_center>
                        <CustomText
                          color={'black'}
                          value={item.price}
                          bold
                          size={15}
                        />
                        <CustomText value={item.discount} size={12} />
                        <CustomText
                          color={'grey'}
                          style={{
                            textDecorationLine: 'line-through',
                          }}
                          value={item.totalprice}
                          size={12}
                        />
                      </CustomRow>

                      <View
                        style={{
                          borderWidth: 0.5,
                          borderStyle: 'dashed',
                          borderColor: Theme.PrimaryColor,
                          width: '70%',
                          marginVertical: 10,
                        }}
                      />

                      {item?.servicelist?.map((item, index) => {
                        return (
                          <View
                            style={{
                              marginVertical: 5,
                              marginLeft: -5,
                            }}>
                            <CustomRow v_center>
                              {editable == true ? (
                                <CustomText value={'\u2B24'} size={20} />
                              ) : (
                                <View
                                  style={{
                                    height: 10,
                                    width: 10,
                                  }}>
                                  <CheckBox
                                    boxType="circle"
                                    tintColors={{true: Theme.PrimaryColor}}
                                    value={toggleCheckBox}
                                    onValueChange={newValue =>
                                      setToggleCheckBox(true)
                                    }
                                    style={{
                                      height: 14,
                                      width: 14,
                                    }}
                                  />
                                </View>
                              )}
                              <CustomText
                                regular
                                size={12}
                                value={item}
                                style={{
                                  marginLeft: 20,
                                }}
                              />
                            </CustomRow>
                          </View>
                        );
                      })}

                      <View>
                        {item.editable == true ? (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                setSecondModalVisible(true);
                              }}>
                              <CustomText
                                color={Theme.PrimaryColor}
                                medium
                                align={'left'}
                                style={{
                                  marginLeft: 30,
                                }}
                                value={'9' + ' ' + 'More +'}
                              />
                            </TouchableOpacity>

                            <View>
                              <Modal
                                animationType="none"
                                transparent={true}
                                visible={modalSecondVisible}
                                onRequestClose={() => {
                                  setSecondModalVisible(!modalSecondVisible);
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                  }}>
                                  <View
                                    style={{
                                      marginTop: '45%',
                                      backgroundColor: 'white',
                                      flex: 1,
                                      borderTopRightRadius: 20,
                                      borderTopLeftRadius: 20,
                                    }}>
                                    <CustomRow
                                      style={{
                                        backgroundColor: '#FF55344D',
                                        height: 80,
                                        borderTopRightRadius: 20,
                                        borderTopLeftRadius: 20,
                                        paddingHorizontal: 10,
                                        paddingTop: 10,
                                        justifyContent: 'space-between',
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          marginLeft: 10,
                                        }}>
                                        <CustomText
                                          style={{
                                            width: 190,
                                          }}
                                          align={'left'}
                                          bold
                                          color={Theme.Black}
                                          size={14}
                                          value={
                                            'Just Relax (Facial + Bleach + Eyebrows)'
                                          }
                                        />

                                        <CustomRow v_center>
                                          <CustomIcon
                                            name={'clockcircleo'}
                                            type={'AN'}
                                            size={12}
                                            color={Theme.PrimaryColor}
                                          />
                                          <CustomText
                                            margin_h={6}
                                            color={'black'}
                                            regular
                                            size={14}
                                            value={item.time}
                                          />
                                        </CustomRow>
                                      </View>
                                      <CustomImage
                                        onPress={() => {
                                          setSecondModalVisible(false);
                                        }}
                                        style={{
                                          position: 'absolute',
                                          right: -40,
                                          top: 10,
                                        }}
                                        src={Assets.cross}
                                        size={15}
                                      />
                                    </CustomRow>
                                    <ScrollView
                                      contentContainerStyle={{
                                        marginHorizontal: 10,
                                        paddingBottom: 50,
                                      }}>
                                      <View>
                                        <View
                                          style={{
                                            marginTop: 10,
                                          }}>
                                          {data.map((item, index) => {
                                            return (
                                              <View
                                                style={{
                                                  marginTop: 10,
                                                }}>
                                                <CustomRow v_center>
                                                  <View>
                                                    <CheckBox
                                                      boxType="circle"
                                                      tintColors={{
                                                        true: Theme.PrimaryColor,
                                                      }}
                                                      value={toggleCheckBox}
                                                      onValueChange={newValue =>
                                                        setToggleCheckBox(true)
                                                      }
                                                      style={{
                                                        height: 14,
                                                        width: 14,
                                                      }}
                                                    />
                                                  </View>

                                                  <CustomText
                                                    medium
                                                    size={14}
                                                    value={item}
                                                    style={{
                                                      marginLeft: 20,
                                                    }}
                                                  />
                                                </CustomRow>
                                              </View>
                                            );
                                          })}
                                        </View>
                                      </View>
                                    </ScrollView>
                                    <View
                                      style={{
                                        paddingBottom: 20,
                                        // backgroundColor: 'red',
                                        // elevation: 3,
                                        // borderWidth: 1,
                                        // borderColor: 'white',
                                        // paddingTop: 10,
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                      }}>
                                      <View
                                        style={{
                                          backgroundColor: '#FF553433',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          paddingVertical: 5,
                                          borderTopRightRadius: 10,
                                          borderTopLeftRadius: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <CustomImage
                                          size={12}
                                          src={Assets.thumb}
                                        />
                                        <CustomText
                                          margin_h={7}
                                          color={Theme.PrimaryColor}
                                          value={
                                            'Congratulation you saved ₹ 300'
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
                                              value={'₹ 400'}
                                              size={15}
                                              medium
                                            />
                                            <CustomText
                                              size={11}
                                              style={{
                                                textDecorationLine:
                                                  'line-through',
                                              }}
                                              value={'₹ 450'}
                                            />
                                          </View>
                                          <CustomText
                                            margin_h={10}
                                            value={'2 Items'}
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
                                        />
                                      </CustomRow>
                                    </View>
                                  </View>
                                </View>
                              </Modal>
                            </View>
                          </>
                        ) : null}
                      </View>
                    </View>

                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          handleShare();
                        }}>
                        <CustomRow
                          style={{
                            marginBottom: 10,
                          }}
                          spacing={5}
                          h_center
                          v_center>
                          <CustomText
                            value={'Share Now'}
                            color={Theme.PrimaryColor}
                            regular
                            size={12}
                          />
                          <CustomIcon
                            name={'share'}
                            type={'FO'}
                            color={Theme.PrimaryColor}
                            size={15}
                          />
                          {/* <CustomImage src={Assets.share} size={12} /> */}
                        </CustomRow>
                      </TouchableOpacity>

                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <ImageBackground
                          // resizeMode={'cover'}

                          source={Assets.bleach}
                          style={{
                            height: 93,
                            width: 93,
                          }}>
                          <View
                            style={{
                              backgroundColor: Theme.PrimaryColor,
                              width: '100%',
                              position: 'absolute',
                              bottom: 0,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <CustomText
                              size={11}
                              value={'Best Seller'}
                              color={'white'}
                            />
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  </CustomRow>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <CustomRow
                      style={{
                        marginTop: 30,
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                      }}
                      v_center>
                      <CustomText
                        value={'View Details'}
                        regular
                        color={Theme.PrimaryColor}
                        size={15}
                      />
                      <CustomIcon
                        name={'doubleright'}
                        type={'AN'}
                        color={Theme.PrimaryColor}
                        size={15}
                      />
                    </CustomRow>
                  </TouchableOpacity>

                  <View
                    style={
                      {
                        // backgroundColor: 'rgb(0, 0, 0, 0.5)',
                      }
                    }>
                    <Modal
                      animationType="none"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                        }}>
                        <View
                          style={{
                            marginTop: '25%',
                            backgroundColor: 'white',
                            flex: 1,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                          }}>
                          <CustomRow
                            style={{
                              backgroundColor: '#FF55344D',
                              height: 80,
                              borderTopRightRadius: 20,
                              borderTopLeftRadius: 20,
                              paddingHorizontal: 10,
                              paddingTop: 10,
                              justifyContent: 'space-between',
                              width: '100%',
                            }}>
                            <View
                              style={{
                                marginLeft: 10,
                              }}>
                              <CustomText
                                style={{
                                  width: 190,
                                }}
                                align={'left'}
                                bold
                                value={
                                  'Just Relax (Facial + Bleach + Eyebrows)'
                                }
                                size={16}
                                color={Theme.Black}
                              />

                              <CustomRow
                                style={
                                  {
                                    // marginVertical: 7,
                                  }
                                }
                                v_center>
                                <CustomImage src={Assets.time} size={12} />
                                <CustomText
                                  margin_h={6}
                                  color={'black'}
                                  regular
                                  size={14}
                                  value={item.time}
                                />
                              </CustomRow>
                            </View>
                            <CustomImage
                              onPress={() => {
                                setModalVisible(false);
                              }}
                              style={{
                                position: 'absolute',
                                right: -40,
                                top: 10,
                              }}
                              src={Assets.cross}
                              resizeMode={'center'}
                              size={15}
                            />
                          </CustomRow>
                          <ScrollView
                            contentContainerStyle={{
                              marginHorizontal: 10,
                              paddingBottom: 50,
                            }}>
                            <View
                              style={{
                                // alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <CustomImage
                                resizeMode={'contain'}
                                src={Assets.waximage}
                                style={{
                                  height: 170,
                                  width: '80%',
                                  marginTop: 10,
                                }}
                              />
                            </View>
                            <CustomRow
                              style={{
                                marginTop: 10,
                              }}
                              h_center
                              ratios={[1.2, 0.8]}>
                              <View>
                                <CustomText
                                  value={'Most Demanded'}
                                  medium
                                  size={16}
                                  color={Theme.Black}
                                />
                                <CustomRow
                                  style={{
                                    marginVertical: 7,
                                  }}
                                  v_center>
                                  <CustomImage src={Assets.time} size={12} />
                                  <CustomText
                                    margin_h={6}
                                    color={'black'}
                                    size={11}
                                    value={item.time}
                                  />
                                </CustomRow>
                                <CustomRow spacing={10} v_center>
                                  <CustomText
                                    color={'black'}
                                    value={item.price}
                                    bold
                                    size={15}
                                  />
                                  <CustomText value={item.discount} size={12} />
                                  <CustomText
                                    color={'grey'}
                                    style={{
                                      textDecorationLine: 'line-through',
                                    }}
                                    value={item.totalprice}
                                    size={12}
                                  />
                                </CustomRow>
                              </View>
                              {/* <View
                              style={{
                                backgroundColor: Theme.PrimaryColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                marginTop: 20,
                                paddingVertical: 5,
                              }}>
                              <CustomText
                                color={'white'}
                                size={12}
                                value={'Top Selling'}
                                medium
                              />
                            </View> */}
                              <CustomButton
                                style={{
                                  padding: 0,
                                }}
                                title={'Top Selling'}
                                titleStyle={{
                                  fontFamily: Fonts.PoppinsMedium,
                                }}
                              />
                            </CustomRow>

                            <View>
                              <CustomText
                                value={'E4U SAFETY'}
                                color={Theme.Black}
                                size={15}
                                bold
                                margin_v={5}
                                style={{
                                  marginTop: 15,
                                }}
                              />

                              <CustomRow
                                style={{
                                  marginHorizontal: 5,
                                }}>
                                <Text>{'\u2B24'}</Text>
                                <CustomText
                                  margin_h={10}
                                  align={'left'}
                                  value={
                                    'Professionals equipped with fresh masks, gloves, head cover, shoe cover, apron and sanitisation kits.PPE Kit worn throughout the servicesTools, equipment& surfaces sanitised in front of you'
                                  }
                                />
                              </CustomRow>
                              <CustomRow
                                style={{
                                  marginHorizontal: 5,
                                }}>
                                <Text>{'\u2B24'}</Text>
                                <CustomText
                                  margin_h={10}
                                  regular
                                  align={'left'}
                                  value={
                                    'ervicesTools, equipment& surfaces sanitised in front of you'
                                  }
                                />
                              </CustomRow>
                            </View>
                            <View>
                              <CustomText
                                value={'THINGS TO KNOW'}
                                size={16}
                                bold
                              />
                              <CustomRow
                                style={{
                                  marginHorizontal: 5,
                                }}>
                                <Text>{'\u2B24'}</Text>
                                <CustomText
                                  margin_h={10}
                                  regular
                                  align={'left'}
                                  value={
                                    'ervicesTools, equipment& surfaces sanitised in front of you'
                                  }
                                />
                              </CustomRow>
                            </View>
                          </ScrollView>
                          <View
                            style={{
                              backgroundColor: 'white',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <CustomButton
                              style={{
                                width: '80%',
                              }}
                              title={'Add to Cart'}
                            />
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </CustomCard>
                <TouchableOpacity
                  style={{
                    backgroundColor: Theme.PrimaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    paddingVertical: 6,
                    marginTop: -10,
                    marginBottom: 5,
                  }}>
                  <CustomText
                    color={'white'}
                    bold
                    size={17}
                    value={'ADD TO CART'}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </>
    );
  };
  let data = [
    'Full Legs Normal Waxing',
    'Full Arms Normal Waxing',
    'VLCC Fruit Facial',
    'Foot Massage',
    'Hot Oil Head Massage',
    'Face Neck Bleach',
    'Face Neck Detan',
  ];

  return (
    <View>
      <CustomHeader l_type={'back_arrow'} title={'Favourite booking'} />

      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 220,
          }}
          data={groupItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => (
            <RenderItem
              key={index}
              title={item?.item.title}
              items={item?.item[1].items}
            />
          )}
        />
      </View>
    </View>
  );
}
