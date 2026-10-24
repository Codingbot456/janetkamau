module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }],
      // 👇 Add this line
      process.env.NODE_ENV === 'production' && 'transform-remove-console'
    ].filter(Boolean),
  };
};