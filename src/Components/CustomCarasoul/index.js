// import React, {useRef, useState, useEffect} from 'react';
// import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import Routes from 'RootNavigation/Routes';
// import Endpoints from 'Configs/API/Endpoints';

// const {width: screenWidth} = Dimensions.get('window');
// const itemWidth = screenWidth * 0.8;
// const itemHeight = screenWidth * 0.6;
// const borderRadius = 20;

// export default function ({swiperImages, navigation, playable}) {
//   // Adjust this as needed
//   const carouselRef = useRef(null);
//   const Navigation = useNavigation();

//   const handleImagePress = videoUrl => {
//     Navigation.navigate(Routes.VideoScreen, {videoUrl});
//   };

//   const RenderItem = ({item, index}, parallaxProps) => {
//     return (
//       <>
//         {playable == true ? (
//           <TouchableOpacity
//             onPress={() => handleImagePress(item.videoUrl)}
//             style={styles.item}>
//             <ParallaxImage
//               source={{uri: Endpoints.baseUrl + item.SliderImage}}
//               containerStyle={styles.imageContainer}
//               style={styles.image}
//               parallaxFactor={0}
//               {...parallaxProps}
//             />
//           </TouchableOpacity>
//         ) : (
//           <View
//             // onPress={() => handleImagePress(item.videoUrl)}
//             style={styles.item}>
//             <ParallaxImage
//               source={{uri: Endpoints.baseUrl + item.SliderImage}}
//               containerStyle={styles.imageContainer}
//               style={styles.image}
//               parallaxFactor={0}
//               {...parallaxProps}
//             />
//           </View>
//         )}

//         {/* <TouchableOpacity
//         onPress={() => handleImagePress(item.videoUrl)}
//         style={styles.item}>
//         <ParallaxImage
//           source={item.img}
//           containerStyle={styles.imageContainer}
//           style={styles.image}
//           parallaxFactor={0}
//           {...parallaxProps}
//         />
//       </TouchableOpacity> */}
//       </>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Carousel
//         autoplay={true}
//         autoplayDelay={3000}
//         lockScrollWhileSnapping={true}
//         ref={carouselRef}
//         sliderWidth={screenWidth}
//         // sliderHeight={screenWidth}
//         // itemWidth={screenWidth * 0.8}
//         sliderHeight={itemHeight} // Adjusted height
//         itemWidth={itemWidth}
//         data={swiperImages}
//         renderItem={RenderItem}
//         loop={true}
//         inactiveSlideScale={1}
//         hasParallaxImages={true}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   item: {
//     borderWidth: 4,
//     borderColor: 'white',
//     borderRadius: 20,
//     // width: Dimensions.get('screen').width - 20,
//     // width: itemWidth,
//     // height: itemHeight, // Adjusted height
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // borderWidth: 4,
//     // borderColor: 'white',
//     // borderRadius: borderRadius,
//     // overflow: 'hidden',
//   },
//   imageContainer: {
//     marginBottom: Platform.select({ios: 0, android: 1}),
//     height: 140,
//   },
//   image: {
//     height: 150,
//     resizeMode: 'contain',
//     borderRadius: 20,
//   },
// });
import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Routes from 'RootNavigation/Routes';
import Endpoints from 'Configs/API/Endpoints';

const {width: screenWidth, height} = Dimensions.get('screen');
const itemWidth = screenWidth * 0.95;
// const itemHeight = height * 0.2;
const itemHeight = itemWidth / 2;
const borderRadius = 10;

export default function CarouselComponent({
  swiperImages,
  navigation,
  playable = false,
}) {
  const carouselRef = useRef(null);
  const Navigation = useNavigation();

  const handleImagePress = videoUrl => {
    Navigation.navigate(Routes.VideoScreen, {videoUrl});
  };

  const RenderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => handleImagePress(item.videoUrl)}
        style={styles.item}>
        <Image
          source={{uri: Endpoints.baseUrl + item.SliderImage}}
          // containerStyle={styles.imageContainer}
          style={styles.image}
          // parallaxFactor={0}
          // {...parallaxProps}
        />
      </TouchableOpacity>
    );
  };

  const renderNonPlayableItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (item?.PCatId) {
            if (item?.serviceID) {
              Navigation.navigate(Routes.ServiceDetailsScreen, {
                itemId: item?.CCatId?._id,
                PCGroup: item?.PCatId?.PCGroup,
                pcId: item?.PCatId?._id,
                PCName: item?.PCatId?.PCName,
                serviceId: item?.serviceID,
              });
            } else {
              Navigation.navigate(Routes.ServiceDetailsScreen, {
                itemId: item?.CCatId?._id,
                PCGroup: item?.PCatId?.PCGroup,
                pcId: item?.PCatId?._id,
                PCName: item?.PCatId?.PCName,
              });
            }
          }
        }}
        style={styles.item}>
        <Image
          source={{uri: Endpoints.baseUrl + item.SliderImage}}
          // containerStyle={styles.imageContainer}
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        autoplay={true}
        autoplayDelay={3000}
        lockScrollWhileSnapping={true}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth / 2}
        itemWidth={itemWidth}
        data={swiperImages}
        renderItem={playable == true ? RenderItem : renderNonPlayableItem}
        loop={true}
        inactiveSlideScale={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: itemWidth - 20,
    height: itemWidth / 2,

    // borderRadius: borderRadius,

    // overflow: 'hidden',

    padding: 0,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: itemWidth - 20,
    height: itemHeight,
    resizeMode: 'cover',
    borderRadius: borderRadius,
    // backgroundColor: 'red',
    // marginRight: 10,
    // padding: 0,

    // marginLeft: 5,
  },
});
