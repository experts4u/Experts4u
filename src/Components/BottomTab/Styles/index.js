import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {
    // backgroundColor: Theme.PrimaryColor,
    width: '101%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -12},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // elevation: 12,
    backgroundColor: 'white',
    // borderTopColor: 'grey',
    // borderTopWidth: 0.5,
  },
  title: {
    fontFamily: Fonts.Regular,
    fontSize: 13,
  },
  containerr: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 10,
    // marginTop: 14,
    marginBottom: 10,
    marginHorizontal: 4,
  },

  Container: {
    alignItems: 'center',
    justifyContent: 'center',

    // marginTop: 5,
    backgroundColor: 'transparent',
  },
});
