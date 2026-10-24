const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Just add web to the resolution order
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'web.js', 'native.js'],
  // Prioritize web.js on web platform
  platformSpecificExtensions: {
    ...config.resolver.platformSpecificExtensions,
    web: ['web.js', 'js', 'json'],
    ios: ['ios.js', 'native.js', 'js', 'json'],
    android: ['android.js', 'native.js', 'js', 'json'],
  },
};

module.exports = config;