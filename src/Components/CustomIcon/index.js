import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import OctIcons from 'react-native-vector-icons/Octicons';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import FoundationIcons from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
// import theme from '../configs/theme';
const theme = {
  color: 'black',
};
let iconTypes = [
  {
    name: AntDesign,
    code: 'AN',
  },
  {
    name: MCIcons,
    code: 'MC',
  },
  {
    name: MIcons,
    code: 'M',
  },
  {
    name: FAIcons,
    code: 'FA',
  },
  {
    name: FA5Icons,
    code: 'FA5',
  },
  {
    name: OctIcons,
    code: 'OCT',
  },
  {
    name: IonIcons,
    code: 'ION',
  },
  {
    name: FeatherIcons,
    code: 'FE',
  },
  {
    name: EntypoIcons,
    code: 'ENT',
  },
  {
    name: FoundationIcons,
    code: 'FO',
  },
  {
    name: Fontisto,
    code: 'FT',
  },
  {
    name: FontAwesome5Icon,
    code: 'FA5',
  },
  {
    name: FontAwesome6Icon,
    code: 'FA6',
  },
];

class CustomIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      type,
      name,
      color,
      size,
      onPress,
      accessibilityLabel,
      accessibilityRole,
      accessibilityHint,
    } = this.props;
    if (type) {
      let ob = iconTypes.filter(
        obj => obj.code.toLocaleLowerCase() == type.toLocaleLowerCase(),
      );
      if (ob.length > 0) {
        let Ic = ob[0].name;
        let Parent = onPress ? TouchableOpacity : View;
        let pro = Parent == TouchableOpacity ? {onPress: onPress} : null;
        return (
          <Parent
            {...pro}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityRole={accessibilityRole || 'button'}
            style={[
              this.props.round
                ? {
                    width: size ? size * 1.5 : 30,
                    height: size ? size * 1.5 : 30,
                    borderRadius: size ? size * 1.5 : 30,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    elevation: 5,
                  }
                : {
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
              this.props.style,
            ]}>
            <Ic
              name={name ? name : ''}
              color={color ? color : theme.color}
              size={size ? size : 20}
            />
          </Parent>
        );
      }
      return null;
    } else {
      return null;
    }
  }
}
export default CustomIcon;
