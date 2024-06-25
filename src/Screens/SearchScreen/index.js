// import Assets from "Assets";
// import Container from "Components/Container";
// import CustomHeader from "Components/CustomHeader";
// import CustomImage from "Components/CustomImage";
// import CustomInput from "Components/CustomInput";
// import CustomRow from "Components/CustomRow";
// import CustomText from "Components/CustomText";
// import {
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Styles from "./Styles";
// import { useEffect, useState } from "react";
// import useFetch from "Hooks/useFetch";
// import Endpoints from "Configs/API/Endpoints";
// import CustomIcon from "Components/CustomIcon";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import Theme from "Configs/Theme";
// import { Keyboard } from "react-native";
// import Routes from "RootNavigation/Routes";
// import Loader from "Components/CustomLoader";
// import { useDispatch, useSelector } from "react-redux";
// import { addSearchTerm } from "ReduxState/Slices/UserSlice";

// export default function () {
//   const focused = useIsFocused();
//   const [items, setItems] = useState([]);
//   const [keywords, setKeywords] = useState("");
//   const [timeoutId, setTimeoutId] = useState(null);
//   const [trending, setTrending] = useState([]);
//   const [allData, setAllData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const Navigation = useNavigation();
//   const dispatch = useDispatch();
//   const searchHistory = useSelector((state) => state?.user?.history);

//   // const getPackages = useFetch({
//   //   endpoint: Endpoints.getPackagesOrServices + getDatabyId,
//   // });

//   const getPackagesData = async () => {
//     setLoading(true);
//     try {
//       let PackagesData = await getPackages.fetchPromise();

//       setAllData(PackagesData?.data);
//     } catch (e) {
//       console.log("err", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (keywords.trim() !== "") {
//         searches(keywords.trim()); // Trigger search with trimmed keywords
//       } else {
//         setItems(null);
//       }
//     }, 500); // Adjust the debounce delay as needed

//     // Cleanup function to clear the timeout
//     return () => clearTimeout(timeoutId);
//   }, [keywords]);

//   const SearchData = useFetch({
//     endpoint: Endpoints.SearchServices + keywords,
//   });

//   const searches = async () => {
//     try {
//       setLoading(true);
//       let searchDta = await SearchData.fetchPromise();
//       setItems(searchDta.data);

//       setLoading(false);
//     } catch (e) {
//       console.log("err", e);
//     }
//   };
//   let a = " &itemId=";

//   return (
//     <Container>
//       <View
//         style={{
//           marginTop: 10,
//         }}
//       >
//         <View
//           style={{
//             marginHorizontal: 10,
//             borderWidth: 1,
//             paddingHorizontal: 10,
//             // marginTop: 30,
//             borderRadius: 10,
//             borderColor: "grey",
//           }}
//         >
//           <CustomRow ratios={[0, 1]} v_center>
//             <TouchableOpacity
//               onPress={() => {
//                 Navigation.goBack();
//               }}
//             >
//               <CustomIcon
//                 type={"AN"}
//                 size={25}
//                 color={Theme.PrimaryColor}
//                 name={"arrowleft"}
//               />
//             </TouchableOpacity>
//             <TextInput
//               value={keywords}
//               onChangeText={(e) => {
//                 setKeywords(e);
//               }}
//               style={{
//                 height: 40,
//               }}
//               placeholder="Search for service"
//               placeholderTextColor={"grey"}
//             />
//           </CustomRow>
//         </View>
//       </View>
//       <ScrollView
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: 50,
//         }}
//       >
//         {keywords.length == 0 && (
//           <View
//             style={{
//               alignItems: "center",
//               justifyContent: "center",
//               marginTop: 10,
//               marginBottom: 10,
//             }}
//           >
//             <CustomText size={15} regular value={"Search History"} />
//           </View>
//         )}
//         <View>
//           {keywords?.length == 0 &&
//             searchHistory?.map((item, index) => {
//               return (
//                 <TouchableOpacity
//                   onPress={() => {
//                     dispatch(addSearchTerm(item));

//                     Navigation.navigate(Routes.ServiceDetailsScreen, {
//                       itemId: item?.ChildId
//                         ? item?.ChildId[0]?._id
//                         : item?.ChildCatIDs?._id,
//                       index: index,
//                       PCGroup: item?.PCgroup
//                         ? item?.PCgroup
//                         : item?.ChildCatIDs?.PCName[0]?.PCGroup,
//                       pcId: item?.PcatId
//                         ? item?.PcatId?._id
//                         : item?.PCatId?._id,
//                       PCName:
//                         item?.ChildCatIDs?.PCName[0]?.PCName ||
//                         item?.ChildId[0]?.PCName[0]?.PCName,
//                       serviceId: item?.ServiceVarients
//                         ? item?.ServiceVarients[0]?._id
//                         : item?._id,
//                     });
//                   }}
//                 >
//                   <CustomRow
//                     // ratios={[0, 1]}
//                     style={Styles.container}
//                     v_center
//                     key={index}
//                   >
//                     <CustomImage
//                       key={index}
//                       src={Assets.timeIcon}
//                       size={20}
//                       resizeMode={"center"}
//                     />
//                     <CustomText
//                       regular
//                       size={16}
//                       style={Styles.txt}
//                       value={
//                         item.ServiceName
//                           ? item.ServiceName +
//                             " - " +
//                             (item.ServiceVarients[0]?.ServiceType?.Name === "NA"
//                               ? item.ChildCatIDs?.CCName
//                               : item.ServiceVarients[0]?.ServiceType?.Name)
//                           : item.packageTitle
//                       }
//                     />
//                   </CustomRow>
//                 </TouchableOpacity>
//               );
//             })}
//         </View>
//         {loading ? (
//           <Loader size={15} />
//         ) : (
//           <View
//             style={{
//               marginTop: 20,
//             }}
//           >
//             {items &&
//               items.map((item, index) => {
//                 return (
//                   <TouchableOpacity
//                     onPress={() => {
//                       dispatch(addSearchTerm(item));

//                       Navigation.navigate(Routes.ServiceDetailsScreen, {
//                         itemId: item?.ChildId
//                           ? item?.ChildId[0]?._id
//                           : item?.ChildCatIDs?._id,
//                         index: index,
//                         PCGroup: item?.PCgroup
//                           ? item?.PCgroup
//                           : item?.ChildCatIDs?.PCName[0]?.PCGroup,

//                         pcId: item?.PcatId
//                           ? item?.PcatId?._id
//                           : item?.PCatId?._id,
//                         PCName:
//                           item?.ChildCatIDs?.PCName[0]?.PCName ||
//                           item?.ChildId[0]?.PCName[0]?.PCName,
//                         serviceId: item?.ServiceVarients
//                           ? item?.ServiceVarients[0]?._id
//                           : item?._id,
//                       });
//                     }}
//                   >
//                     <CustomRow
//                       ratios={[0, 1]}
//                       style={Styles.container}
//                       v_center
//                       key={index}
//                     >
//                       <CustomImage
//                         key={index}
//                         src={Assets.timeIcon}
//                         size={20}
//                         resizeMode={"center"}
//                       />
//                       <CustomText
//                         regular
//                         size={14}
//                         style={Styles.txt}
//                         value={
//                           item.ServiceName
//                             ? item.ServiceName +
//                               " - " +
//                               (item.ServiceVarients[0]?.ServiceType?.Name ===
//                               "NA"
//                                 ? item.ChildCatIDs?.CCName
//                                 : item.ServiceVarients[0]?.ServiceType?.Name)
//                             : item.packageTitle
//                         }
//                       />
//                     </CustomRow>
//                   </TouchableOpacity>
//                 );
//               })}
//           </View>
//         )}
//       </ScrollView>
//     </Container>
//   );
// }
import Assets from "Assets";
import Container from "Components/Container";
import CustomHeader from "Components/CustomHeader";
import CustomImage from "Components/CustomImage";
import CustomInput from "Components/CustomInput";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "./Styles";
import { useEffect, useState } from "react";
import useFetch from "Hooks/useFetch";
import Endpoints from "Configs/API/Endpoints";
import CustomIcon from "Components/CustomIcon";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Theme from "Configs/Theme";
import { Keyboard } from "react-native";
import Routes from "RootNavigation/Routes";
import Loader from "Components/CustomLoader";
import { useDispatch, useSelector } from "react-redux";
import { addSearchTerm } from "ReduxState/Slices/UserSlice";

export default function () {
  const focused = useIsFocused();
  const [items, setItems] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [trending, setTrending] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state?.user?.history);

  // const getPackages = useFetch({
  //   endpoint: Endpoints.getPackagesOrServices + getDatabyId,
  // });

  const getPackagesData = async () => {
    setLoading(true);
    try {
      let PackagesData = await getPackages.fetchPromise();

      setAllData(PackagesData?.data);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keywords.trim() !== "") {
        searches(keywords.trim()); // Trigger search with trimmed keywords
      } else {
        setItems(null);
      }
    }, 500); // Adjust the debounce delay as needed

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, [keywords]);

  const SearchData = useFetch({
    endpoint: Endpoints.SearchServices + keywords,
  });

  const searches = async () => {
    try {
      setLoading(true);
      let searchDta = await SearchData.fetchPromise();
      setItems(searchDta.data);

      setLoading(false);
    } catch (e) {
      console.log("err", e);
    }
  };

  let a = " &itemId=";

  const renderSearchHistoryItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(addSearchTerm(item));
        Navigation.navigate(Routes.ServiceDetailsScreen, {
          itemId: item?.ChildId
            ? item?.ChildId[0]?._id
            : item?.ChildCatIDs?._id,
          index: index,
          PCGroup: item?.PCgroup
            ? item?.PCgroup
            : item?.ChildCatIDs?.PCName[0]?.PCGroup,
          pcId: item?.PcatId ? item?.PcatId?._id : item?.PCatId?._id,
          PCName:
            item?.ChildCatIDs?.PCName[0]?.PCName ||
            item?.ChildId[0]?.PCName[0]?.PCName,
          serviceId: item?.ServiceVarients
            ? item?.ServiceVarients[0]?._id
            : item?._id,
        });
      }}
    >
      <CustomRow style={Styles.container} v_center key={index}>
        <CustomImage src={Assets.timeIcon} size={20} resizeMode="center" />
        <CustomText
          regular
          size={16}
          style={Styles.txt}
          value={
            item.ServiceName
              ? `${item.ServiceName} - ${
                  item.ServiceVarients[0]?.ServiceType?.Name === "NA"
                    ? item.ChildCatIDs?.CCName
                    : item.ServiceVarients[0]?.ServiceType?.Name
                }`
              : item.packageTitle
          }
        />
      </CustomRow>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(addSearchTerm(item));
        Navigation.navigate(Routes.ServiceDetailsScreen, {
          itemId: item?.ChildId
            ? item?.ChildId[0]?._id
            : item?.ChildCatIDs?._id,
          index: index,
          PCGroup: item?.PCgroup
            ? item?.PCgroup
            : item?.ChildCatIDs?.PCName[0]?.PCGroup,
          pcId: item?.PcatId ? item?.PcatId?._id : item?.PCatId?._id,
          PCName:
            item?.ChildCatIDs?.PCName[0]?.PCName ||
            item?.ChildId[0]?.PCName[0]?.PCName,
          serviceId: item?.ServiceVarients
            ? item?.ServiceVarients[0]?._id
            : item?._id,
        });
      }}
    >
      <CustomRow ratios={[0, 1]} style={Styles.container} v_center key={index}>
        <CustomImage src={Assets.timeIcon} size={20} resizeMode="center" />
        <CustomText
          regular
          size={14}
          style={Styles.txt}
          value={
            item.ServiceName
              ? `${item.ServiceName} - ${
                  item.ServiceVarients[0]?.ServiceType?.Name === "NA"
                    ? item.ChildCatIDs?.CCName
                    : item.ServiceVarients[0]?.ServiceType?.Name
                }`
              : item.packageTitle
          }
        />
      </CustomRow>
    </TouchableOpacity>
  );

  return (
    <Container>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <View
          style={{
            marginHorizontal: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            // marginTop: 30,
            borderRadius: 10,
            borderColor: "grey",
          }}
        >
          <CustomRow ratios={[0, 1]} v_center>
            <TouchableOpacity
              onPress={() => {
                Navigation.goBack();
              }}
            >
              <CustomIcon
                type={"AN"}
                size={25}
                color={Theme.PrimaryColor}
                name={"arrowleft"}
              />
            </TouchableOpacity>
            <TextInput
              value={keywords}
              onChangeText={(e) => {
                setKeywords(e);
              }}
              style={{
                height: 40,
                color: "black",
              }}
              placeholder="Search for service"
              placeholderTextColor={"grey"}
            />
          </CustomRow>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <FlatList
          data={keywords.length == 0 ? searchHistory : items}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <CustomText size={15} regular value="No Results Found" />
            </View>
          )}
          ListFooterComponent={
            loading ? <Loader size={15} /> : <View style={{ marginTop: 20 }} />
          }
          renderItem={
            keywords.length == 0 ? renderSearchHistoryItem : renderItem
          }
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </Container>
  );
}
