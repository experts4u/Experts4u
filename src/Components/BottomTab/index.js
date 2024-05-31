import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Assets from 'Assets';
import Styles from './Styles';
import Routes from 'RootNavigation/Routes';
import {useNavigation, useRoute} from '@react-navigation/native';
import Theme from 'Configs/Theme';
import CustomRow from 'Components/CustomRow';
import CustomImage from 'Components/CustomImage';
import CustomText from 'Components/CustomText';
import Fonts from 'Configs/Fonts';
import CustomIcon from 'Components/CustomIcon';

export default function (props) {
  const Navigation = useNavigation();
  let focused_tab =
    typeof props?.state?.index === 'number' ? props.state.index : -1;
  let tabs = [
    {
      icon: Assets.homeicon,
      focused_ic: Assets.homeicon,
      label: 'Home',
      nav_to: Routes.HomeScreen,
      icon_name: 'home',
      icon_type: 'AN',
    },
    {
      icon: Assets.mybookingsIcon,
      focused_ic: Assets.mybookingsIcon,
      label: 'My Bookings',
      nav_to: Routes.MyBooking,
      icon_name: 'clipboard',
      icon_type: 'FE',
    },
    {
      icon: Assets.mybenifitsicon,
      focused_ic: Assets.mybenifitsicon,
      label: 'My Benifits',
      nav_to: Routes.MyBenifits,
      icon_name: 'file-invoice-dollar',
      icon_type: 'FA5',
    },
    {
      icon: Assets.walleticon,
      focused_ic: Assets.walleticon,
      label: 'Wallet',
      nav_to: Routes.Wallet,
      icon_name: 'wallet',
      icon_type: 'FA5',
    },
    {
      icon: Assets.accounticon,
      focused_ic: Assets.accounticon,
      label: 'Account',
      nav_to: Routes.AccountScreen,
      icon_name: 'person-circle',
      icon_type: 'ION',
    },
  ];
  return (
    <View style={Styles.root}>
      {tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={Styles.Container}
            onPress={() => {
              Navigation.navigate(item.nav_to);
            }}>
            <View style={Styles.containerr}>
              <CustomIcon
                type={item.icon_type}
                color={focused_tab === index ? Theme.PrimaryColor : 'grey'}
                name={item.icon_name}
              />

              <CustomText
                size={10}
                style={{
                  fontFamily:
                    focused_tab == index
                      ? Fonts.PoppinsBold
                      : Fonts.PoppinsRegular,
                  marginTop: 6,
                }}
                value={item.label}
                color={focused_tab == index ? Theme.PrimaryColor : 'black'}
                // margin_h={5}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
