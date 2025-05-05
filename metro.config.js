// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// module.exports = config;

/*************************** */

// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ← Enable support for "exports" in package.json
config.resolver.unstable_enablePackageExports = true; // :contentReference[oaicite:2]{index=2}
// ← Tell Metro which export conditions to assert, in order of preference:
config.resolver.unstable_conditionNames = [
  "react-native", // first match RN-specific entrypoints
  "browser", // then browser bundles (e.g. axios/dist/axios.min.js)
  "require", // finally fallback to CJS require entrypoints
]; // :contentReference[oaicite:3]{index=3}

module.exports = withNativeWind(config, {
  input: "./app/globals.css",
});
