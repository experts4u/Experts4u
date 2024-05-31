// VideoScreen.js

import React from 'react';
import {View} from 'react-native';

const VideoScreen = ({videoId}) => {
  return (
    <View style={{flex: 1}}>
      <YoutubePlayer
        YoutubeMeta={{}}
        videoId={videoId}
        play={true}
        // No fullscreen prop here, it will take the full screen by default
        onReady={() => {
          console.log('Video player is ready');
        }}
      />
    </View>
  );
};

export default VideoScreen;
