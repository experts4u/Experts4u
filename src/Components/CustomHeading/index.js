import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import {StyleSheet, View} from 'react-native';

export default function ({heading, style}) {
  return (
    <View style={[Styles.servicecatogrytxt, style]}>
      <CustomText value={heading} medium size={18} color={Theme.Black} />
    </View>
  );
}
const Styles = StyleSheet.create({
  servicecatogrytxt: {
    alignItems: 'flex-start',
    // borderBottomColor: '#E3E3E3',
    // borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingBottom: 10,
    marginHorizontal: 5,
    // marginBottom: 8,
    // backgroundColor: 'red',
  },
});
