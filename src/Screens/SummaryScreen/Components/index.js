import Assets from "Assets";
import CustomImage from "Components/CustomImage";
import Theme from "Configs/Theme";
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";

const CIRCLE_RADIUS = 50;

class GoogleMapsView extends Component {
  animateToRegion = (region, duration = 300) => {
    if (this.mapViewRef && this.mapViewRef.animateToRegion)
      this.mapViewRef.animateToRegion(region, duration);
  };

  render() {
    console.log("##### GoogleMapsView render");

    return (
      <View
        style={{
          // flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <MapView
          ref={(ref) => {
            this.mapViewRef = ref;
          }}
          style={{
            height: "100%",
            backgroundColor: "white",
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.props.region}
          showsUserLocation={true}
          showsBuildings={true}
          showsPointsOfInterest={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          showsTraffic={false}
          mapType="standard"
          showsIndoors={false}
          loadingEnabled={false}
          onMapReady={this.props.handleMapReady}
          onPress={this.props.handleMapPress}
          onPoiClick={this.props.handleMapPoiPress}
          onRegionChange={(coordinates) => {
            if (this.centerMarkerRef)
              this.centerMarkerRef.setCenter(coordinates);
            if (this.props.handleMapRegionChange)
              this.props.handleMapRegionChange();
          }}
          onRegionChangeComplete={this.props.hanldeMapRegionChangeComplete}
          onPanDrag={this.props.hanldeMapPanDragByUser}
          onDoublePress={this.props.handleMapDoubleTap}
        >
          <RegionCircle
            regionCircleVisible={this.props.regionCircleVisible}
            center={this.props.region}
          />
          <CenterMarker center={this.props.region} />
        </MapView>

        {/* Fake marker. This is not accurate, if you zoom out too much, it will give on wrong coordinates. For accuracy use actual maker, which lags but is accurate */}
        {/* <View style={Styles.pin2} /> */}
        {/* <CustomImage src={Assets.mapimage} size={10} /> */}
      </View>
    );
  }
}

// Actual center marker. This is accurate marker but it lags because it uses setState to update. if you want no lag you can use fake marker.
class CenterMarker extends Component {
  state = { center: this.props.center };
  setCenter = (center) => {
    this.setState({ center: center });
  };
  render() {
    return (
      <Marker coordinate={this.state.center} anchor={{ x: 0.5, y: 0.5 }}>
        <CustomImage src={Assets.mapimage} size={40} />
      </Marker>
    );
  }
}

const RegionCircle = (props) => {
  if (!props.regionCircleVisible) return null;
  return (
    <Circle
      center={{
        latitude: props.center.latitude,
        longitude: props.center.longitude,
      }}
      radius={CIRCLE_RADIUS}
      strokeWidth={2}
      strokeColor="rgba(0, 0, 255, 0.3)"
      fillColor="rgba(0, 185, 255, 0.3)"
    />
  );
};

const Styles = StyleSheet.create({
  pin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "#172a50",
    borderWidth: 4,
  },
  pin2: {
    position: "absolute",
    alignSelf: "center",
    elevation: 2,
    zIndex: 100,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    borderRightWidth: 5,
    borderRightColor: "transparent",
    borderTopWidth: 10,
    // borderTopColor: Theme.PrimaryColor,
    borderTopColor: "green",
  },
});
export default GoogleMapsView;

// import Theme from "Configs/Theme";
// import React, { Component } from "react";
// import { View, StyleSheet, PermissionsAndroid, Platform } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Circle, Marker } from "react-native-maps";

// const CIRCLE_RADIUS = 50;

// class GoogleMapsView extends Component {
//   mapViewRef = null;

//   async componentDidMount() {
//     if (Platform.OS === "android") {
//       await this.requestLocationPermission();
//     }
//   }

//   requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Location Permission",
//           message:
//             "This app needs access to your location to show you on the map.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("Location permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   animateToRegion = (region, duration = 300) => {
//     if (this.mapViewRef && this.mapViewRef.animateToRegion)
//       this.mapViewRef.animateToRegion(region, duration);
//   };

//   render() {
//     const {
//       region,
//       regionCircleVisible,
//       handleMapReady,
//       handleMapPress,
//       handleMapPoiPress,
//       handleMapRegionChange,
//       hanldeMapRegionChangeComplete,
//       hanldeMapPanDragByUser,
//       handleMapDoubleTap,
//     } = this.props;

//     return (
//       <View style={styles.container}>
//         <MapView
//           ref={(ref) => {
//             this.mapViewRef = ref;
//           }}
//           style={styles.map}
//           provider={PROVIDER_GOOGLE}
//           initialRegion={region}
//           showsUserLocation={true}
//           showsBuildings={true}
//           showsPointsOfInterest={true}
//           showsTraffic={false}
//           showsIndoors={false}
//           loadingEnabled={true}
//           onMapReady={handleMapReady}
//           onPress={handleMapPress}
//           onPoiClick={handleMapPoiPress}
//           onRegionChange={(coordinates) => {
//             if (this.centerMarkerRef)
//               this.centerMarkerRef.setCenter(coordinates);
//             if (handleMapRegionChange) handleMapRegionChange();
//           }}
//           onRegionChangeComplete={hanldeMapRegionChangeComplete}
//           onPanDrag={hanldeMapPanDragByUser}
//           onDoublePress={handleMapDoubleTap}
//         >
//           <RegionCircle
//             regionCircleVisible={regionCircleVisible}
//             center={region}
//           />
//         </MapView>

//         <View style={styles.pin2} />
//       </View>
//     );
//   }
// }

// class CenterMarker extends Component {
//   state = { center: this.props.center };

//   setCenter = (center) => {
//     this.setState({ center });
//   };

//   render() {
//     return (
//       <Marker coordinate={this.state.center} anchor={{ x: 0.5, y: 0.5 }}>
//         <View style={styles.pin} />
//       </Marker>
//     );
//   }
// }

// const RegionCircle = ({ regionCircleVisible, center }) => {
//   if (!regionCircleVisible) return null;
//   return (
//     <Circle
//       center={{
//         latitude: center.latitude,
//         longitude: center.longitude,
//       }}
//       radius={CIRCLE_RADIUS}
//       strokeWidth={2}
//       strokeColor="rgba(0, 0, 255, 0.3)"
//       fillColor="rgba(0, 185, 255, 0.3)"
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   pin: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     borderColor: "#172a50",
//     borderWidth: 4,
//   },
//   pin2: {
//     position: "absolute",
//     alignSelf: "center",
//     elevation: 2,
//     zIndex: 100,
//     width: 0,
//     height: 0,
//     borderLeftWidth: 5,
//     borderLeftColor: "transparent",
//     borderRightWidth: 5,
//     borderRightColor: "transparent",
//     borderTopWidth: 10,
//     borderTopColor: Theme.PrimaryColor,
//   },
// });

// export default GoogleMapsView;
