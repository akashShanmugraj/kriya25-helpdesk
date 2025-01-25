const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  // Add other configurations if needed
};