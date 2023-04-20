module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    //! a ajouter avec dotenv plugins:
    plugins: [
      ["module:react-native-dotenv" , {
      moduleName: "@env",
      path: ".env",
    }]],
  };
};

