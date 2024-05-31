import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function Loader({
  center,
  padding,
  margin,
  containerStyle,
  size,
  fullscreen,
  left,
  color,
}) {
  let style = StyleSheet.flatten([
    left && {alignSelf: 'flex-start'},
    center && {justifyContent: 'center', alignItems: 'center'},
    padding && {padding},
    margin && {margin},
    fullscreen && {flex: 1, alignItems: 'center', justifyContent: 'center'},
    containerStyle && containerStyle,
  ]);
  return (
    <View style={style}>
      <ActivityIndicator color={color || 'black'} size={size || 30} />
    </View>
  );
}
