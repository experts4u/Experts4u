import CustomImage from 'Components/CustomImage';
import CustomText from 'Components/CustomText';
import {Modal, ScrollView, View} from 'react-native';

export default function ({}) {
  return (
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
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
        <View
          style={{
            marginTop: '85%',
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
                medium
                value={'Just Relax (Facial + Bleach + Eyebrows)'}
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
                setSecondModalVisible(false);
              }}
              style={{
                position: 'absolute',
                right: -50,
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
                            onValueChange={newValue => setToggleCheckBox(true)}
                            style={{
                              height: 14,
                              width: 14,
                            }}
                          />
                        </View>

                        <CustomText
                          medium
                          size={15}
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
              <CustomImage size={12} src={Assets.thumb} />
              <CustomText
                margin_h={7}
                color={Theme.PrimaryColor}
                value={'Congratulation you saved ₹ 300'}
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
                      textDecorationLine: 'line-through',
                    }}
                    value={'₹ 450'}
                  />
                </View>
                <CustomText margin_h={10} value={'2 Items'} />
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
  );
}
