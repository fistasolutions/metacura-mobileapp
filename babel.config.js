module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Reanimated 4 uses the worklets plugin; it must be listed LAST.
  plugins: ['react-native-worklets/plugin'],
};
