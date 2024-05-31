import React from "react";
import { useWindowDimensions } from "react-native";


export default function(){
    let {
        width,
        height,
        scale,
        fontScale
    } = useWindowDimensions();

    let widthP = (percentage)=>{
        return width*(percentage/100);
    }
    let heightP = (percentage)=>{
        return height*(percentage/100);
    }
    return {
        widthP,
        heightP,
        height,
        width,
        fontScale,
        scale
    }
    
}