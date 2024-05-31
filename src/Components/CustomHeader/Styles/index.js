import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    // borderBottomColor: "#EEEEEE",
    // borderBottomWidth: 1,
  },
  leftContainer: {
    flex: 0.2,
  },
  rightContainer: {
    // flex: 0.2,
    alignSelf: 'flex-end',
  },
  centerContainer: {
    flex: 0.6,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  arrw: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    color: Theme.Black,
    fontFamily: Fonts.PoppinsMedium,
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: -4,
  },
});
