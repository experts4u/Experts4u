module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.ts', '.jsx', '.js', '.json'],
        alias: {
          '@Screens': './src/Screens',
          '@Navigation': './src/RootNavigation',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
