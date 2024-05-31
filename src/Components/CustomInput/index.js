import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import Styles from './Styles';

const LeftIcon = ({leftIcon, leftIconStyle, leftOnpress}) => {
  return (
    <CustomImage
      onPress={leftOnpress}
      resizeMode={Platform.OS ? 'contain' : 'center'}
      style={leftIconStyle}
      src={leftIcon}
      size={22}
    />
  );
};
const CenterView = ({
  placeholder,
  style,
  placeholderColor,
  multiline,
  onSubmitEditing,
  onChangeText,
  defaultValue,
  secureTextEntry,
  value,
  onFocus,
  onBlur,
  keyboardType,
  editable,
  textAlignVertical,
}) => {
  return (
    <TextInput
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      placeholder={placeholder}
      onFocus={onFocus}
      value={value}
      keyboardType={keyboardType}
      onBlur={onBlur}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      textAlignVertical={textAlignVertical}
      editable={editable}
      // pointerEvents="none"
      placeholderTextColor={placeholderColor ? placeholderColor : 'grey'}
      style={
        style
          ? style
          : {
              backgroundColor: 'transparent',
              padding: 4,
              // fontFamily: Fonts.GothamBook,
              color: 'grey',
            }
      }
    />
  );
};

const RightIcon = ({rightIcon, RightText, rightonpress}) => {
  if (RightText) {
    return <CustomText value={RightText} />;
  } else {
    return (
      <CustomImage
        onPress={rightonpress}
        resizeMode={'center'}
        size={21}
        src={rightIcon}
      />
    );
  }
};

export default function ({
  Left,
  leftIcon,
  placeholder,
  rightIcon,
  RightText,
  Right,
  inputStyle,
  placeholderColor,
  borderRed,
  borderBlue,
  containerStyle,
  multiline,
  onSubmitEditing,
  onChangeText,
  defaultValue,
  leftIconStyle,

  secureTextEntry,
  value,

  onFocus,
  rightonpress,
  leftOnpress,
  onbBlur,
  keyboardType,
  editable = true,
  textAlignVertical,
}) {
  let styles = StyleSheet.flatten([
    Styles.input,
    borderRed && {borderColor: 'grey'},
    borderBlue && {borderColor: Theme.SecondaryColor},
    containerStyle,
  ]);
  return (
    <View
      style={{
        width: 99 + '%',
        marginTop: 10,
      }}>
      <CustomRow ratios={[0, 1, 0]} h_center v_center style={styles}>
        {Left ? (
          <LeftIcon
            leftOnpress={leftOnpress}
            leftIconStyle={leftIconStyle}
            leftIcon={leftIcon}
          />
        ) : null}

        {
          <CenterView
            onBlur={onbBlur}
            style={inputStyle}
            placeholderColor={placeholderColor}
            placeholder={placeholder}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            defaultValue={defaultValue}
            secureTextEntry={secureTextEntry}
            value={value}
            onFocus={onFocus}
            keyboardType={keyboardType}
            editable={editable}
            textAlignVertical={textAlignVertical}
          />
        }
        {Right ? (
          <RightIcon
            rightonpress={rightonpress}
            rightIcon={rightIcon}
            RightText={RightText}
          />
        ) : null}
      </CustomRow>
    </View>
  );
}
