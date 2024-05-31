import Assets from 'Assets';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Fonts from 'Configs/Fonts';
import Theme from 'Configs/Theme';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function () {
  const CoupenCard = () => {
    return (
      <CustomCard>
        <View
          style={{
            backgroundColor: Theme.PrimaryColor,
          }}>
          <View
            style={{
              transfor: 'rotate(270deg)',
            }}>
            <CustomText value={'50% OFF'} />
          </View>
        </View>
      </CustomCard>
    );
  };

  return (
    <ScrollView>
      <CustomHeader l_type={'back_arrow'} title={'Coupon & Offers'} />
      <View
        style={{
          backgroundColor: 'white',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          paddingBottom: 10,
        }}>
        <CustomRow
          ratios={[1, 0]}
          style={{
            width: '80%',
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 10,
            paddingHorizontal: 10,
            borderColor: 'grey',
            borderRadius: 13,
          }}
          v_center>
          <TextInput
            style={{
              fontFamily: Fonts.PoppinsRegular,
            }}
            placeholder="Enter Coupon Code"
          />
          <TouchableOpacity>
            <CustomText bold color={Theme.PrimaryColor} value={'Apply'} />
          </TouchableOpacity>
        </CustomRow>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 30,
        }}>
        <CustomText value={'Best Coupen'} bold size={14} />
        <View
          style={{
            marginTop: 30,
          }}>
          <CoupenCard />
        </View>
      </View>
    </ScrollView>
  );
}
