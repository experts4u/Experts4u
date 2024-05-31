import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import React from 'react';
import {Image, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import Styles from './Styles';

export default function ({
  secondary,
  style,
  title,
  image_icon,
  iconStyle,
  icon_size,
  titleStyle,
  font_size,
  onPress,
  lightPrimary,
  width,
  align_left,
}) {
  let btn_styles = StyleSheet.flatten([
    Styles.container,
    width && {width},
    align_left && {alignSelf: 'flex-start'},
    secondary && {backgroundColor: Theme.Black},
    lightPrimary && {backgroundColor: Theme.Grey},
    style,
  ]);

  const icon_style = StyleSheet.flatten([
    Styles.iconStyle,
    icon_size && {height: icon_size, width: icon_size},
    iconStyle,
  ]);

  const titleStyles = StyleSheet.flatten([
    lightPrimary && {color: Theme.Black},
    titleStyle,
  ]);
  return (
    <TouchableOpacity
      android_ripple={{color: 'white'}}
      onPress={onPress}
      style={btn_styles}>
      {image_icon ? (
        <Image resizeMode="contain" source={image_icon} style={icon_style} />
      ) : null}
      <CustomText
        bold
        color={'white'}
        value={title}
        size={font_size}
        style={titleStyles}
      />
    </TouchableOpacity>
  );
}
