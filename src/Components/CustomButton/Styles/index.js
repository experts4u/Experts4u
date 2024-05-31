import Theme from 'Configs/Theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: Theme.PrimaryColor,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    width: 100 + '%',
    marginVertical: 10,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
});
