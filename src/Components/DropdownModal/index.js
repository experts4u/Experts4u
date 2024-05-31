import CustomButton from 'Components/CustomButton';
import CustomText from 'Components/CustomText';
import Line from 'Components/Line';
import useDimensions from 'Hooks/useDimensions';
// import useDimensions from "Hooks/useDimensions";
import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  SlideInDown,
  SlideOutDown,
  ZoomIn,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ({isVisible, onConfirm, onCancel, data}) {
  let {width, height, heightP} = useDimensions();
  let {top, bottom} = useSafeAreaInsets();

  const [selectedValue, setSelectedValue] = useState('');
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);
  return (
    <Modal statusBarTranslucent={true} visible={visible} transparent>
      <Pressable
        onPress={() => {
          onCancel?.();
        }}
        style={{
          flex: 1,
          backgroundColor: 'rgba(10,10,10,0.1)',
          justifyContent: 'flex-end',
        }}>
        <Animated.View
          entering={SlideInDown.duration(1000)}
          // exiting={SlideOutDown.duration(4000)}

          style={{
            maxHeight: heightP(50),
            backgroundColor: 'white',
            paddingBottom: bottom,
            paddingTop: 15,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <CustomText value={'SELECT OPTION'} bold size={18} align="center" />
          <Line margin_v={5} />
          <ScrollView>
            {data &&
              data.length &&
              data.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedValue == item) {
                        setSelectedValue(null);
                      } else {
                        setSelectedValue(item);
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                      paddingHorizontal: 15,
                    }}
                    key={index}>
                    <CustomText value={item.label} regular />
                    {selectedValue == item ? (
                      <View
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: 'green',
                          borderRadius: 60,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <MCIcons name="check" color={'white'} size={15} />
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          {selectedValue ? (
            <Animated.View
              entering={FadeInDown.duration(300)}
              style={{marginHorizontal: 15}}>
              <CustomButton
                title={'Confirm'}
                onPress={() => {
                  onConfirm?.(selectedValue);
                }}
              />
            </Animated.View>
          ) : null}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
