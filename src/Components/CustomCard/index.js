import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
export default function ({children, style, Clickable, onPress}) {
  return Clickable ? (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.card, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10, // You can adjust the border radius as needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    marginVertical: 5,
    // paddingVertical: 10,
    marginHorizontal: 7,
    // borderBottomColor: '#e2e2e2',
    borderBottomColor: '#F5F6FB',
    borderBottomWidth: 1,
    paddingBottom: 22,
    marginBottom: 10,
    paddingTop: 10,
  },
});
