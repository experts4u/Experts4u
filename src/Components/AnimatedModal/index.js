import ElevatedCard from 'Components/ElevatedCard';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

function AnimatedModal({children, parentStyle, backdropFunction}, ref) {
  const [visible, setVisible] = useState(false);
  let {top} = useSafeAreaInsets();

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal: () => {
          setVisible(true);
        },
        hideModal: () => {
          setVisible(false);
        },
      };
    },
    [],
  );
  const CloseButton = () => {
    return (
      <Pressable
        style={styles.closeButton}
        onPress={() => {
          setVisible(false);
        }}>
        <ElevatedCard>
          <MCIcons name="close" color={'black'} size={25} />
        </ElevatedCard>
      </Pressable>
    );
  };
  return (
    // <Modal
    //   hasBackdrop={true}
    //   coverScreen={true}
    //   animationType="slide"
    //   transparent
    //   visible={visible}
    //   statusBarTranslucent={true}
    //   onRequestClose={() => setVisible(false)}>
    //   {/* <TouchableWithoutFeedback onPress={() => setVisible(false)}> */}
    //   <View style={[styles.modal, {marginTop: top}]}>
    //     {/* <ScrollView> */}
    //     <View
    //       style={{
    //         flex: 1,
    //       }}>
    //       {/* <TouchableWithoutFeedback> */}
    //       <View
    //         style={{
    //           flex: 1,

    //           // marginTop: '40%',
    //         }}>
    //         {children}
    //       </View>
    //       {/* </TouchableWithoutFeedback> */}
    //     </View>
    //     {/* </ScrollView> */}
    //   </View>
    //   {/* </TouchableWithoutFeedback> */}
    // </Modal>
    <Modal
      // deviceHeight={Dimensions.get('screen').height}
      // coverScreen={true}

      onBackButtonPress={() => setVisible(false)}
      animationType="slide"
      backdropOpacity={0.9}
      onBackdropPress={() => setVisible(false)}
      hasBackdrop={true}
      backdropColor="rgba(0, 0, 0, 0.8)"
      style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: Dimensions.get('screen').height,
      }}
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
      statusBarTranslucent={true}>
      <View style={[styles.modal, {marginTop: top}]}>
        <View
          style={{
            flex: 1,
            marginTop: parentStyle ? parentStyle : '40%',
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // backgroundColor: 'green',
  },
  closeButton: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    right: 10,
    top: 10,
    position: 'absolute',
  },
});

export default forwardRef(AnimatedModal);
