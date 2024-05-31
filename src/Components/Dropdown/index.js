import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  FlatList,
  Modal,
} from 'react-native';
// import { Layout } from 'Utils';
// import Modal from 'react-native-modal';
// import {CustomText} from 'Components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useDerivedValue,
  runOnJS,
  interpolate,
  withTiming,
  Extrapolate,
  FadeInUp,
  FadeInDown,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import useDimensions from 'Hooks/useDimensions';
import ElevatedCard from 'Components/ElevatedCard';
import CustomText from 'Components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
function DropDown({
  data,
  children,
  position,
  action,
  containerStyle,
  customRenderItem,
  collapsible,
  onViewChange,
}) {
  const {width: DeviceWidth, height: DeviceHeight} = useDimensions();
  const status_bar_height = StatusBar.currentHeight;
  const [isLoaded, setIsLoaded] = useState(false);
  const [layout, setLayout] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef();
  const ListRef = React.useRef();
  const [maxHeight, setMaxHeight] = useState(200);
  const [mainData, setMainData] = useState(data);
  const [dataToRender, setDataToRender] = useState([]);
  const [right_position_to_move, setRightPositionToMove] = useState(0);

  useEffect(() => {
    onViewChange?.(isVisible);
  }, [isVisible]);
  const onPress = () => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      let topValue;
      let bottomValue;

      if (collapsible) {
      }
      if (pageY + maxHeight >= DeviceHeight) {
        bottomValue = DeviceHeight - pageY - height;
      } else {
        topValue = pageY + status_bar_height + height;
      }
      if (collapsible && topValue) {
        topValue -= height;
      }
      if (bottomValue) {
        let bottom = Platform.select({
          ios: bottomValue - 25,
          android: bottomValue,
        });
        setLayout({bottom: bottom});
      } else {
        let top = Platform.select({
          ios: topValue + 25,
          android: topValue,
        });
        setLayout({top: top});
      }
      setIsLoaded(true);
      setIsVisible(true);
      setRightPositionToMove(DeviceWidth - (pageX + width));
      // console.log('right_position_to_move',DeviceWidth-(pageX+width))
      // setTimeout(()=>{

      //     scaleValue.value = 1;
      // leftValue.value = pageX;
      // rightValue.value = DeviceWidth-(pageX+width);
      // },1000);
      scaleValue.value = 1;
      leftValue.value = pageX;
      rightValue.value = DeviceWidth - (pageX + width);
    });
  };
  let scaleValue = useSharedValue(0.8);
  let leftValue = useSharedValue(-50);
  let rightValue = useSharedValue(-200);
  let anim = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scaleValue.value)}],
      left: withSpring(leftValue.value),
      opacity: withTiming(
        interpolate(scaleValue.value, [0, 0.5, 0.9, 1], [0, 0, 0, 1]),
      ),
    };
  });
  let rightAnim = useAnimatedStyle(() => {
    return {
      // right : rightValue.value
      transform: [
        {
          scale: withTiming(
            interpolate(scaleValue.value, [0, 0.6, 1], [0.4, 0.9, 1]),
          ),
        },
      ],
      opacity: withSpring(
        interpolate(rightValue.value, [-50, right_position_to_move], [0, 1]),
      ),
      right: withTiming(rightValue.value),
    };
  });
  let collapsibleAnim = useAnimatedStyle(() => {
    return {};
  });
  const onClose = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };
  useDerivedValue(() => {
    if (scaleValue.value == 0.8) {
      runOnJS(onClose)(scaleValue.value);
    }
  }, [scaleValue.value]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          scaleValue.value = 0.8;
          leftValue.value = -50;
          rightValue.value = -200;
          setTimeout(() => {
            item.action ? item.action() : action?.(item);
          }, 200);
        }}
        key={index}>
        {customRenderItem ? (
          customRenderItem?.(item, index)
        ) : (
          <CustomText
            regular
            style={{
              padding: 10,
              // textAlign : 'left'
            }}
            value={item.label}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      activeOpacity={1}
      style={[{alignSelf: 'center'}, containerStyle]}>
      {children}

      <Modal
        visible={isLoaded && isVisible}
        style={{
          marginHorizontal: 0,
          marginVertical: 0,
        }}
        statusBarTranslucent={true}
        transparent={true}>
        {isLoaded && isVisible ? (
          <TouchableOpacity
            onPress={() => {
              scaleValue.value = 0.8;
              leftValue.value = -50;
              rightValue.value = -200;
              // setIsVisible(false)
            }}
            activeOpacity={1}
            style={{backgroundColor: 'rgba(100,100,100,0)', flex: 1}}>
            <Animated.View
              entering={ZoomIn.duration(300)}
              style={[
                {
                  backgroundColor: 'white',
                  position: 'absolute',
                  maxHeight: maxHeight,
                  // height : maxHeight,
                  minWidth: 100,
                },
                layout,

                collapsible
                  ? {right: right_position_to_move}
                  : position == 'left' || position == undefined
                  ? anim
                  : rightAnim,
              ]}>
              <ElevatedCard
                style={{
                  backgroundColor: 'white',
                  elevation: 5,
                  borderRadius: 5,
                }}>
                {collapsible && layout?.top ? children : null}
                <FlatList
                  ref={ListRef}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </ElevatedCard>
            </Animated.View>
          </TouchableOpacity>
        ) : null}
      </Modal>
    </TouchableOpacity>
  );
}
// DropDown.propTypes = {
//     data : propTypes.arrayOf(propTypes.instanceOf(DropDownDataModel))
// }
export default DropDown;
