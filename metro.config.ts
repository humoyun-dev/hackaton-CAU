const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Extend Metro's configuration to handle Node.js module polyfills
config.resolver.extraNodeModules = {
  crypto: require.resolve("react-native-crypto"),
  stream: require.resolve("stream-browserify"),
  util: require.resolve("util"),
  path: require.resolve("path-browserify"),
};

config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs"];

module.exports = withNativeWind(config, { input: "./global.css" });
