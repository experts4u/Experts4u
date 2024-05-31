import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, Pressable, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CustomText from 'Components/CustomText'; // Assuming CustomText is in your Components folder

function PopupModal({children, visible}, ref) {
  const [isVisible, setIsVisible] = useState(visible);
  const sharedValue = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsVisible(true);
    },
    hideModal: () => {
      sharedValue.value = withSpring(0);
    },
  }));

  const animateBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        sharedValue.value,
        [0, 1],
        ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)'],
      ),
    };
  });

  const animation = useAnimatedStyle(() => {
    return {
      transform: [{scale: sharedValue.value}],
      opacity: sharedValue.value,
    };
  });

  useEffect(() => {
    if (isVisible) {
      sharedValue.value = withTiming(1);
    }
  }, [isVisible]);

  const handleVisible = value => {
    if (value === 0) {
      setIsVisible(false);
    }
  };

  useDerivedValue(() => {
    handleVisible(sharedValue.value);
  });

  return (
    <Modal visible={isVisible} transparent={true} statusBarTranslucent={true}>
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: 'rgba(200,200,200,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          },
          animateBackground,
        ]}>
        <Animated.View
          style={[
            {
              minHeight: 150,
              width: '95%',
              backgroundColor: 'white',
              borderRadius: 20,
            },
            animation,
          ]}>
          {children ? (
            children
          ) : (
            <View style={{padding: 10}}>
              <Pressable
                onPress={() => {
                  sharedValue.value = withTiming(0, {duration: 500});
                }}>
                <CustomText value={'Press Me'} color="black" bold />
              </Pressable>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export default forwardRef(PopupModal);
