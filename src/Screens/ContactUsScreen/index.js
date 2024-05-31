import Assets from 'Assets';
import CustomCard from 'Components/CustomCard';
import CustomHeader from 'Components/CustomHeader';
import CustomHeading from 'Components/CustomHeading';
import CustomImage from 'Components/CustomImage';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import {ScrollView, View} from 'react-native';

export default () => {
  return (
    <View>
      <CustomHeader l_type={'back_arrow'} title={'Contact Us'} />
      <ScrollView>
        <CustomCard
          style={{
            marginTop: 10,
            paddingVertical: 10,
          }}>
          <CustomHeading heading={'Phone call'} />
          <CustomRow
            ratios={[0, 1, 0]}
            v_center
            style={{
              marginTop: 10,
              marginHorizontal: 10,
            }}>
            <CustomImage src={Assets.phone} resizeMode={'center'} size={20} />
            <View
              style={{
                marginLeft: 10,
              }}>
              <CustomText bold size={13} value={'+919456415214'} />
              <CustomText
                regular
                value={'Call us 24 x 7, we will answer you!'}
              />
            </View>
            <CustomImage
              src={Assets.arrowrightred}
              resizeMode={'center'}
              size={10}
            />
          </CustomRow>
        </CustomCard>
        <CustomCard
          style={{
            marginTop: 10,
            paddingVertical: 10,
          }}>
          <CustomHeading heading={'Email'} />
          <CustomRow
            ratios={[0, 1, 0]}
            v_center
            style={{
              marginTop: 10,
              marginHorizontal: 10,
            }}>
            <CustomImage src={Assets.email} resizeMode={'center'} size={20} />
            <View
              style={{
                marginLeft: 10,
              }}>
              <CustomText bold size={13} value={'support@name.in'} />
              <CustomText
                regular
                value={'Get solutions beamed to your inbox'}
              />
            </View>
            <CustomImage
              src={Assets.arrowrightred}
              resizeMode={'center'}
              size={10}
            />
          </CustomRow>
        </CustomCard>
        <CustomCard
          style={{
            marginTop: 10,
            paddingVertical: 10,
          }}>
          <CustomHeading heading={'Whatsapp chat'} />
          <CustomRow
            ratios={[0, 1, 0]}
            v_center
            style={{
              marginTop: 10,
              marginHorizontal: 10,
            }}>
            <CustomImage
              src={Assets.whatsapp}
              resizeMode={'center'}
              size={20}
            />
            <View
              style={{
                marginLeft: 10,
              }}>
              <CustomText bold size={13} value={'+91 9551541562'} />
              <CustomText
                regular
                value={'Get solutions beamed to your inbox'}
              />
            </View>
            <CustomImage
              src={Assets.arrowrightred}
              resizeMode={'center'}
              size={10}
            />
          </CustomRow>
        </CustomCard>
      </ScrollView>
    </View>
  );
};
