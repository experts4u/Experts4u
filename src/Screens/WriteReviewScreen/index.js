import Assets from 'Assets';
import CustomButton from 'Components/CustomButton';
import CustomHeader from 'Components/CustomHeader';
import CustomImage from 'Components/CustomImage';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import Theme from 'Configs/Theme';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Styles from './Styles';

export default function () {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = item => {
    const updatedSelection = selectedItems.includes(item)
      ? selectedItems.filter(selected => selected !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedSelection);
  };

  const RatingItem = ({label, isSelected, onPress, style}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[Styles.item, isSelected && Styles.selectedItem, style]}>
        <CustomText
          size={15}
          value={label}
          bold
          color={isSelected ? 'white' : Theme.Black}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <CustomHeader l_type={'back_arrow'} title={'Write a Review'} />
      <ScrollView
        contentContainerStyle={{
          // alignItems: 'center',
          // justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <CustomImage
            style={{
              height: 25,
              width: 150,
              marginTop: 50,
            }}
            src={Assets.fivestar}
            resizeMode={'center'}
          />
          <CustomText
            margin_v={20}
            size={15}
            regular
            color={'#444444'}
            value={'You are rating this service 5 star'}
          />
          <CustomText size={20} value={'Excellent'} color={Theme.Black} bold />

          <CustomText
            style={{
              marginTop: 20,
            }}
            size={15}
            value={'WOW , Thank you what did you like the most?'}
            medium
          />
        </View>
        <View
          style={{
            // alignSelf: 'center',
            alignItems: 'center',
          }}>
          <CustomRow
            style={{
              marginTop: 20,
            }}>
            <RatingItem
              style={{
                marginRight: 20,
              }}
              label="Service"
              isSelected={selectedItems.includes('Service Quality')}
              onPress={() => toggleSelection('Service Quality')}
            />
            <RatingItem
              label="Products"
              isSelected={selectedItems.includes('Products')}
              onPress={() => toggleSelection('Products')}
            />
          </CustomRow>
          <CustomRow
            style={{
              marginTop: 20,
              width: '90%',
            }}>
            <RatingItem
              style={{
                marginRight: 20,
              }}
              label="Customer Care"
              isSelected={selectedItems.includes('Customer Care')}
              onPress={() => toggleSelection('Customer Care')}
            />
            <RatingItem
              label="Hygiene"
              isSelected={selectedItems.includes('Hygiene')}
              onPress={() => toggleSelection('Hygiene')}
            />
          </CustomRow>
          <CustomRow
            style={{
              marginTop: 20,
              width: '90%',
            }}>
            <RatingItem
              style={{
                marginRight: 20,
              }}
              label="Punctual"
              isSelected={selectedItems.includes('Punctual')}
              onPress={() => toggleSelection('Punctual')}
            />
            <RatingItem
              label="Beautician"
              isSelected={selectedItems.includes('Beautician')}
              onPress={() => toggleSelection('Beautician')}
            />
          </CustomRow>
        </View>

        <View
          style={{
            marginTop: 30,
            alignSelf: 'center',
          }}>
          <CustomText
            size={15}
            style={{
              lineHeight: 22.5,
            }}
            bold
            color={Theme.Black}
            value={'Write Your Review'}
          />
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
          }}>
          <CustomInput
            placeholder={'Type here...'}
            containerStyle={{
              height: 120,
            }}
            inputStyle={{
              height: 120,
            }}
            textAlignVertical={'top'}
            multiline={true}
          />
        </View>
        <CustomButton
          style={{
            marginTop: 30,
            width: '70%',
          }}
          title={'Submit'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
