const path = require("path");

module.exports = {
  dependencies: {
    "@builder.io/react-native-render-html": {
      platforms: {
        ios: {
          podspecPath: path.join(
            __dirname,
            "node_modules",
            "@builder.io",
            "react-native-render-html",
            "react-native-render-html.podspec"
          ),
        },
      },
    },
  },
};
