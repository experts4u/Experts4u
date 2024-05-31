import React from 'react';
import {View} from 'react-native';
import HTML from 'react-native-render-html';

const HTMLComponent = ({htmlContent}) => {
  // Define custom renderer to handle styles with !important
  const renderers = {
    p: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const defaultStyle = {
        fontSize: 18,
      };

      // Merge default styles with styles from HTML attributes
      const mergedStyles = {...defaultStyle, ...convertedCSSStyles};

      return (
        <Text style={mergedStyles} key={passProps.key}>
          {children}
        </Text>
      );
    },
  };

  return (
    <View>
      <HTML source={{html: htmlContent}} renderers={renderers} />
    </View>
  );
};
