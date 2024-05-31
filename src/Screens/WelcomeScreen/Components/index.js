import CustomImage from 'Components/CustomImage';
import Theme from 'Configs/Theme';
import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {
  SwiperFlatList,
  SwiperFlatListWithGestureHandler,
} from 'react-native-swiper-flatlist/WithGestureHandler';
const {width, height} = Dimensions.get('window');
const CustomImageSwiper = ({
  images,
  autoplay,
  autoplayDelay,
  autoplayLoop,
  autoplayLoopKeepAnimation,
}) => {
  const SwiperRef = useRef(null);

  return (
    <SwiperFlatListWithGestureHandler
      paginationDefaultColor={'white'}
      paginationActiveColor={Theme.PrimaryColor}
      paginationStyleItem={styles.dot}
      ref={SwiperRef}
      activeDot
      style={styles.wrapper}
      showsButtons={false}
      autoplay={autoplay}
      autoplayDelay={autoplayDelay}
      autoplayLoopKeepAnimation={autoplayLoopKeepAnimation}
      showPagination
      autoplayLoop={autoplayLoop}>
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <CustomImage key={index} src={image} style={styles.image} />
        </View>
      ))}
    </SwiperFlatListWithGestureHandler>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // height: 170,
    // overflow: 'hidden',
    // marginHorizontal: 10,
    height: height * 0.2,
  },
  slide: {
    // flex: 0.8,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // marginHorizontal: 10,
    // width: width - 40,
  },
  image: {
    // flex: 1,
    width: width - 20,
    resizeMode: 'center',
    // height: 180,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  pagination: {
    // bottom: 10,
    bottom: 0,
  },
  dot: {
    // backgroundColor: 'rgba(255,255,255,.3)',
    backgroundColor: 'blue',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    // backgroundColor: '#fff',
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },

  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default CustomImageSwiper;
