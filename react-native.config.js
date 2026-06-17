/**
 * react-native CLI config.
 * Bundled fonts: drop the Inter / Outfit / Syne .ttf files into
 * src/assets/fonts, then run `npx react-native-asset` to copy them into the
 * iOS / Android projects. Family names in src/theme/typography.ts must match the
 * PostScript names of those files (e.g. Inter-Regular, Outfit-Bold, Syne-Bold).
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
};
