import { CommonActions, StackActions } from '@react-navigation/native';
import React from 'react';

export const Navigation_ref = React.createRef();

export const Navigate = (route,params)=> Navigation_ref.current?.navigate(route,params);
export const GoBack = ()=> Navigation_ref.current?.goBack();
export const Replace = (route,params)=> Navigation_ref.current?.dispatch?.(StackActions.replace(route, params)); 
export const ReplaceStack=(route)=> Navigation_ref.current?.dispatch?.(CommonActions.reset({
    routes : [{
        name : route
    }],
    index : 0
}))