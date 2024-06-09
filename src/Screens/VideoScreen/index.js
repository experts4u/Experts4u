import { View, Text, TouchableOpacity, Touchable, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import Orientation from "react-native-orientation-locker";
import CustomIcon from "Components/CustomIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import Endpoints from "Configs/API/Endpoints";
import Loader from "Components/CustomLoader";
import { StyleSheet } from "react-native";
export default (source) => {
  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fullScreen, setFullScreen] = useState(true);
  const [loading, setLoading] = useState(true);
  // const [isBuffering, setIsBuffering] = useState(true);
  const Navigation = useNavigation();

  const Route = useRoute();
  const ref = useRef();

  let data = Route.params;

  const format = (seconds) => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, "0");
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts
  }, []);

  //  const onBuffer = ({ isBuffering }) => {
  //    setIsBuffering(isBuffering);
  //    if (!isBuffering) {
  //      videoRef.current.playAsync();
  //    }
  //  };
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <TouchableOpacity
        style={{ width: "100%", height: fullScreen ? "100%" : 200 }}
        onPress={() => {
          setClicked(true);
        }}
      >
        <Video
          paused={puased}
          source={{ uri: Endpoints.baseUrl + data.videoUrl }}
          ref={ref}
          onLoad={() => setLoading(false)}
          // onBuffer={onBuffer}
          onProgress={(x) => {
            setProgress(x);
          }}
          style={{ width: "100%", height: fullScreen ? "100%" : 200 }}
          resizeMode="contain"
        />

        {loading && ( // Conditionally render loader when loading is true
          <View
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader center color={"white"} size={30} />
          </View>
        )}
        {clicked && (
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  // ref.current.seek(parseInt(progress.currentTime) - 10);
                }}
              >
                {/* <Image
                  source={{
                    uri: 'https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg',
                  }}
                  style={{width: 30, height: 30, tintColor: 'white'}}
                /> */}
                {/* <CustomIcon
                  name={'backward'}
                  color={'white'}
                  type={'FT'}
                  size={20}
                /> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!puased);
                }}
              >
                <CustomIcon
                  name={puased ? "playcircleo" : "pause"}
                  type={"AN"}
                  color={"white"}
                  size={50}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) + 10);
                }}
              ></TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{ width: "80%", height: 40 }}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"
                onValueChange={(x) => {
                  ref.current.seek(x);
                }}
                value={progress?.currentTime}
              />
              <Text style={{ color: "white" }}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: 10,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Navigation.goBack();
                }}
              >
                {fullScreen ? (
                  <CustomIcon
                    name={"close"}
                    color={"white"}
                    size={25}
                    type={"AN"}
                  />
                ) : (
                  <CustomIcon
                    name={"close"}
                    color={"white"}
                    size={25}
                    type={"AN"}
                  />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};
