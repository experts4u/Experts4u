import Theme from 'Configs/Theme';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: '#4444441A',
    // paddingHorizontal: 30,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 169,
  },
  selectedItem: {
    backgroundColor: Theme.PrimaryColor,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,

    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 169,
  },
});
