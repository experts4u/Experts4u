import {useNavigation} from '@react-navigation/native';
import Assets from 'Assets';
import Fonts from 'Configs/Fonts';
import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import Styles from './Styles';
import CustomImage from 'Components/CustomImage';
import CustomIcon from 'Components/CustomIcon';
import Theme from 'Configs/Theme';

export default function CustomHeader({
  l_type,
  leftComponent,
  title,
  rightComponent,
  centerComponent,
  style,
}) {
  const renderLeftComponent = () => {
    if (l_type == 'back_arrow') {
      return <BackArrow />;
    }
    if (leftComponent) {
      return leftComponent;
    }
    return <View style={Styles.leftContainer}></View>;
  };
  const renderCenterComponent = () => {
    if (centerComponent) {
      return centerComponent;
    }
    return (
      <View style={Styles.centerContainer}>
        {title ? <Text style={Styles.title}>{title}</Text> : null}
      </View>
    );
  };
  const renderRightComponent = () => {
    if (rightComponent) {
      return rightComponent;
    }
    return <View style={Styles.rightContainer}></View>;
  };
  return (
    <View style={[Styles.headerContainer, style]}>
      {renderLeftComponent()}
      {renderCenterComponent()}
      {renderRightComponent()}
    </View>
  );
}
function BackArrow({}) {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      // style={{flex: 0.2}}
      onPress={() => {
        Navigation.goBack();
      }}>
      <CustomIcon
        type={'AN'}
        size={25}
        color={Theme.PrimaryColor}
        name={'arrowleft'}
      />
    </TouchableOpacity>
  );
}

CustomHeader.IconButton = ({imageIcon, containerStyle, onPress, iconSize}) => {
  let icon_style = iconSize ? {width: iconSize, height: iconSize} : {};
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image
        style={[Styles.arrw, icon_style]}
        source={imageIcon ? imageIcon : Assets.arrowblack}
      />
    </TouchableOpacity>
  );
};

CustomHeader.Button = ({style, title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text
        style={{
          fontFamily: Fonts.PoppinsExtraBold,
          color: 'white',
        }}>
        {title}
      </Text>
    </Pressable>
  );
};
