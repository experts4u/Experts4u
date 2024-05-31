import Assets from 'Assets';
import Container from 'Components/Container';
import CustomHeader from 'Components/CustomHeader';
import CustomImage from 'Components/CustomImage';
import CustomInput from 'Components/CustomInput';
import CustomRow from 'Components/CustomRow';
import CustomText from 'Components/CustomText';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Styles from './Styles';
import {useEffect, useState} from 'react';
import useFetch from 'Hooks/useFetch';
import Endpoints from 'Configs/API/Endpoints';
import CustomIcon from 'Components/CustomIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Theme from 'Configs/Theme';
import {Keyboard} from 'react-native';
import Routes from 'RootNavigation/Routes';
import Loader from 'Components/CustomLoader';
import {useDispatch, useSelector} from 'react-redux';
import {addSearchTerm} from 'ReduxState/Slices/UserSlice';

export default function () {
  const focused = useIsFocused();
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [trending, setTrending] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const searchHistory = useSelector(state => state?.user?.history);

  console.log('search history locallly', searchHistory);

  // const getPackages = useFetch({
  //   endpoint: Endpoints.getPackagesOrServices + getDatabyId,
  // });

  const getPackagesData = async () => {
    setLoading(true);
    try {
      let PackagesData = await getPackages.fetchPromise();

      setAllData(PackagesData?.data);

      // const extractedGroupNames = PackagesData?.data?.flatMap(item =>
      //   item.ServiceGroups.map(group => group.GroupName),
      // );

      // Setting the extracted group names to state
      // setGroupName(extractedGroupNames);

      // console.log('PackagesData', );
    } catch (e) {
      console.log('err', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keywords.trim() !== '') {
        searches(keywords.trim()); // Trigger search with trimmed keywords
      } else {
        setItems(null);
      }
    }, 500); // Adjust the debounce delay as needed

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [keywords]);

  // useEffect(() => {
  //   if (focused) {
  //     // setFirstId(params.Id);
  //     getPackagesData();
  //   }
  // }, [focused]);
  // const handleInputChange = text => {
  //   setKeywords(text);
  //   // Clear previous timeout
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }
  //   // Set a new timeout
  //   const id = setTimeout(() => {
  //     searches();
  //   }, 2000);
  //   setTimeoutId(id);
  // };

  const SearchData = useFetch({
    endpoint: Endpoints.SearchServices + keywords,
  });

  const searches = async () => {
    try {
      setLoading(true);
      let searchDta = await SearchData.fetchPromise();
      setItems(searchDta.data);
      console.log('searchedData', searchDta);

      setLoading(false);
    } catch (e) {
      console.log('err', e);
    }
  };
  let a = ' &itemId=';

  // useEffect(() => {
  //   if (keywords) {
  //     searches();
  //   } else {
  //     // Clear items when keywords is empty
  //     setItems([]);
  //   }
  // }, [keywords]);

  return (
    <Container>
      <View
        style={{
          marginTop: 10,
        }}>
        <View
          style={{
            marginHorizontal: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            // marginTop: 30,
            borderRadius: 10,
            borderColor: 'grey',
          }}>
          <CustomRow ratios={[0, 1]} v_center>
            <TouchableOpacity
              onPress={() => {
                Navigation.goBack();
              }}>
              <CustomIcon
                type={'AN'}
                size={25}
                color={Theme.PrimaryColor}
                name={'arrowleft'}
              />
            </TouchableOpacity>
            <TextInput
              value={keywords}
              onChangeText={e => {
                setKeywords(e);
              }}
              style={{
                height: 40,
              }}
              placeholder="Search for service"
              placeholderTextColor={'grey'}
            />
          </CustomRow>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        {keywords.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <CustomText size={15} regular value={'Search History'} />
          </View>
        )}
        <View>
          {keywords?.length == 0 &&
            searchHistory?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addSearchTerm(item));

                    Navigation.navigate(Routes.ServiceDetailsScreen, {
                      itemId: item?.ChildCatIDs?._id,
                      index: index,
                      PCGroup: item?.ChildCatIDs?.PCName[0]?.PCGroup,
                      pcId: item?.PCatId,
                      PCName: item?.ChildCatIDs?.PCName[0]?.PCName,
                      serviceId: item?.ServiceVarients[0]?._id,
                    });
                  }}>
                  <CustomRow
                    // ratios={[0, 1]}
                    style={Styles.container}
                    v_center
                    key={index}>
                    <CustomImage
                      key={index}
                      src={Assets.timeIcon}
                      size={20}
                      resizeMode={'center'}
                    />
                    <CustomText
                      regular
                      size={16}
                      style={Styles.txt}
                      value={
                        item?.ServiceName
                          ? item?.ServiceName +
                            ' - ' +
                            item?.ServiceVarients[0]?.ServiceType?.Name
                          : item?.packageTitle
                      }
                    />
                  </CustomRow>
                </TouchableOpacity>
              );
            })}
        </View>
        {loading ? (
          <Loader size={15} />
        ) : (
          <View
            style={{
              marginTop: 20,
            }}>
            {items &&
              items.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addSearchTerm(item));

                      Navigation.navigate(Routes.ServiceDetailsScreen, {
                        itemId: item?.ChildCatIDs?._id,
                        index: index,
                        PCGroup: item?.ChildCatIDs?.PCName[0]?.PCGroup,
                        pcId: item?.PCatId,
                        PCName: item?.ChildCatIDs?.PCName[0]?.PCName,
                        serviceId: item?.ServiceVarients[0]?._id,
                      });
                    }}>
                    <CustomRow
                      ratios={[0, 1]}
                      style={Styles.container}
                      v_center
                      key={index}>
                      <CustomImage
                        key={index}
                        src={Assets.timeIcon}
                        size={20}
                        resizeMode={'center'}
                      />
                      <CustomText
                        regular
                        size={14}
                        style={Styles.txt}
                        value={
                          item.ServiceName
                            ? item.ServiceName +
                              ' - ' +
                              (item.ServiceVarients[0]?.ServiceType?.Name ===
                              'NA'
                                ? item.ChildCatIDs?.CCName
                                : item.ServiceVarients[0]?.ServiceType?.Name)
                            : item.packageTitle
                        }
                        // value={
                        //   item?.ServiceName
                        //     ? item?.ServiceName +
                        //         ' - ' +
                        //         item?.ServiceVarients[0]?.ServiceType?.Name !=
                        //       'NA'
                        //       ? item?.ServiceName +
                        //         ' - ' +
                        //         item?.ServiceVarients[0]?.ServiceType?.Name
                        //       : item?.ServiceName +
                        //         ' - ' +
                        //         item?.ChildCatIDs?.CCName
                        //     : item?.packageTitle
                        // }
                      />
                    </CustomRow>
                  </TouchableOpacity>
                );
              })}
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
