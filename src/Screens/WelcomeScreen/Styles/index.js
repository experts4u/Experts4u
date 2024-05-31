import {StyleSheet} from 'react-native';
import Theme from '../../../Configs/Theme';
import fonts from '../../../../assets/fonts';

export default StyleSheet.create({
  root: {
    backgroundColor: Theme.PrimaryColor,
    flex: 1,
  },
  imgContainer: {
    alignItems: 'flex-start',
    marginLeft: 14,
  },
  img: {
    height: '80%',
    resizeMode: 'cover',
    width: 100 + '%',
  },
  bottomContainer: {
    backgroundColor: 'white',
    height: 200,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    // padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  wlcmtxt: {
    fontSize: 17,
    fontFamily: fonts.PoppinsBold,
    fontWeight: '900',
    color: Theme.Black,
    textAlign: 'left',
  },
  logotxt: {
    fontSize: 25,
    fontFamily: fonts.PoppinsExtraBold,
    fontWeight: '900',
    color: Theme.Black,
    // marginLeft: 10,
  },
  slide: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // flex: 1,
    width: '100%',
    resizeMode: 'center',
  },
  pagination: {
    // bottom: 10,
    bottom: '14%',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  wrapper: {
    padding: 0,
  },
});
