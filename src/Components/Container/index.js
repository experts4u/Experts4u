import React from 'react';
import {KeyboardAvoidingView, SafeAreaView, View} from 'react-native';

export default function Container({children}) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? null : 'padding'}
        // keyboardVerticalOffset={Platform.OS=="android" ? 0 : -96}
        // keyboardVerticalOffset={-100}
        style={{flex: 1}}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
