import CheckBox from "@react-native-community/checkbox";
import Assets from "Assets";
import CustomCard from "Components/CustomCard";
import CustomHeader from "Components/CustomHeader";
import CustomImage from "Components/CustomImage";
import CustomRow from "Components/CustomRow";
import CustomText from "Components/CustomText";
import Theme from "Configs/Theme";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function () {
  const [value, setValue] = useState(1);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  let data = [
    "Full Legs Normal Waxing",
    "Full Arms Normal Waxing",
    "VLCC Fruit Facial",
    "Foot Massage",
    "Hot Oil Head Massage",
    "Face Neck Bleach",
    "Face Neck Detan",
  ];

  return (
    <View>
      <CustomRow
        v_center
        style={{
          paddingVertical: 5,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <CustomImage src={Assets.arrowblack} size={26} />
        <CustomText
          size={15}
          margin_h={20}
          value={"Just Relax (Facial + Bleach + Eyebrows)"}
        />
      </CustomRow>
      <ScrollView>
        <CustomCard>
          <CustomRow>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <CustomText
                style={{
                  width: "70%",
                }}
                value={"Just Relax (Facial + Bleach + Eyebrows)"}
                bold
                color={"black"}
                align={"left"}
              />
              <CustomText
                size={10}
                medium
                style={{
                  position: "absolute",
                  top: 25,
                  left: 100,
                }}
                value={"Any 4 services at ₹999"}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                backgroundColor: "#FF553433",
                borderColor: Theme.PrimaryColor,
                borderRadius: 8,
              }}
            >
              <CustomRow
                style={{
                  //   backgroundColor: '#FF553433',
                  //   paddingVertical: 7,
                  paddingHorizontal: 7,

                  borderColor: "#FF5534",
                  borderWith: 2,
                }}
                v_center
              >
                <TouchableOpacity
                  onPress={() => {
                    decrement();
                  }}
                >
                  <CustomText
                    bold
                    value={"-"}
                    color={Theme.PrimaryColor}
                    size={21}
                  />
                </TouchableOpacity>
                <CustomText
                  margin_h={10}
                  value={value}
                  color={Theme.PrimaryColor}
                  size={14}
                  bold
                />
                <TouchableOpacity
                  onPress={() => {
                    increment();
                  }}
                >
                  <CustomText
                    bold
                    value={"+"}
                    color={Theme.PrimaryColor}
                    size={21}
                  />
                </TouchableOpacity>
              </CustomRow>
            </View>
          </CustomRow>

          <View
            style={{
              marginTop: 10,
            }}
          >
            {data.map((item, index) => {
              return (
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <CustomRow v_center>
                    <View>
                      <CheckBox
                        boxType="circle"
                        tintColors={{ true: Theme.PrimaryColor }}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(true)}
                        style={{
                          height: 14,
                          width: 14,
                        }}
                      />
                    </View>

                    <CustomText
                      medium
                      size={15}
                      value={item}
                      style={{
                        marginLeft: 20,
                      }}
                    />
                  </CustomRow>
                </View>
              );
            })}
          </View>
        </CustomCard>

        <View
          style={{
            borderWidth: 0.6,
            borderColor: "black",
            marginHorizontal: 30,
          }}
        />
        <CustomCard>
          <CustomRow>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <CustomText
                style={{
                  width: "70%",
                }}
                value={"Just Relax (Facial + Bleach + Eyebrows)"}
                bold
                color={"black"}
                align={"left"}
              />
              <CustomText
                size={10}
                medium
                style={{
                  position: "absolute",
                  top: 25,
                  left: 100,
                }}
                value={"Any 4 services at ₹999"}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                backgroundColor: "#FF553433",
                borderColor: Theme.PrimaryColor,
                borderRadius: 8,
              }}
            >
              <CustomRow
                style={{
                  //   backgroundColor: '#FF553433',
                  //   paddingVertical: 7,
                  paddingHorizontal: 7,

                  borderColor: "#FF5534",
                  borderWith: 2,
                }}
                v_center
              >
                <TouchableOpacity
                  onPress={() => {
                    decrement();
                  }}
                >
                  <CustomText
                    bold
                    value={"-"}
                    color={Theme.PrimaryColor}
                    size={21}
                  />
                </TouchableOpacity>
                <CustomText
                  margin_h={10}
                  value={value}
                  color={Theme.PrimaryColor}
                  size={14}
                  bold
                />
                <TouchableOpacity
                  onPress={() => {
                    increment();
                  }}
                >
                  <CustomText
                    bold
                    value={"+"}
                    color={Theme.PrimaryColor}
                    size={21}
                  />
                </TouchableOpacity>
              </CustomRow>
            </View>
          </CustomRow>

          <View
            style={{
              marginTop: 10,
            }}
          >
            {data.map((item, index) => {
              return (
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <CustomRow v_center>
                    <View>
                      <CheckBox
                        boxType="circle"
                        tintColors={{ true: Theme.PrimaryColor }}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(true)}
                        style={{
                          height: 14,
                          width: 14,
                        }}
                      />
                    </View>

                    <CustomText
                      medium
                      size={15}
                      value={item}
                      style={{
                        marginLeft: 20,
                      }}
                    />
                  </CustomRow>
                </View>
              );
            })}
          </View>
        </CustomCard>
      </ScrollView>
    </View>
  );
}
