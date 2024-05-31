import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";
import Styles from "./Styles";
//separater
//separater style
//itemStyle
//ratios
//scrollEnabled
//wrap
//v-center
//h-center
// export interface CustomRowProps{
//     children: JSX.Element | JSX.Element[],
//     style?: ViewStyle,
//     ratios?: number[],
//     itemStyle?: ViewStyle,
//     scrollEnabled?: boolean,
//     "v-center"?: boolean,
//     "h-center"?: boolean,
//     wrap?: true,
//     separator?: JSX.Element,
//     separatorStyle?: ViewStyle,
//     spacing?: number,
//     column?: number
// }
export default function({
    v_center,
    h_center,
    wrap,
    style,
    spacing,
    separatorStyle,
    ratios,
    itemStyle,
    separator,
    scrollEnabled,
    children
}){
    const {width, height} = useWindowDimensions();
    let viewStyles = StyleSheet.flatten([
        Styles.container,
        v_center && Styles["v-center"],
        h_center && Styles["h-center"],
        wrap && Styles.wrap,
        style
    ]);

    let ScrollViewStyles = StyleSheet.flatten([
        style
    ])

    let separatorStyles = StyleSheet.flatten([
        {width : spacing || 0},
        separatorStyle && separatorStyle
    ])
    const Props = scrollEnabled ? {
        contentContainerStyle : ScrollViewStyles,
        horizontal : true,
        showsHorizontalScrollIndicator : false
    } : {
        style : viewStyles
    }
    const renderChildren=()=>{
        return(
            React.Children.map(
                children,
                (child, index)=>{
                    let ratios_ = ratios?.length ? ratios[index] : undefined;
                return(
                    <>
                    <View style={[
                        itemStyle, 
                        {flex: ratios_},
                        ]}>
                        {child}
                    </View>
                    {
                        separator
                        ?
                        separator
                        :
                        <View style={separatorStyles}/>
                    }
                    </>
                )
            })
        )
    }
    const Parent = scrollEnabled ? ScrollView : View;
    return(
        <View>
        <Parent {...Props}>
            {
                renderChildren()
            }
        </Parent>
        </View>
    )
}