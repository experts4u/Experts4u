import React from "react";
import { StyleSheet, View } from "react-native";



export default function({height,width,margin_v}){
    let style = StyleSheet.flatten([
        {height : StyleSheet.hairlineWidth, width : 100+'%'},
        {backgroundColor : 'gray'},
        height && height,
        width && width,
        margin_v && {marginVertical : margin_v}
    ])
    return(
        <View
        style={style}
        />
    )
}