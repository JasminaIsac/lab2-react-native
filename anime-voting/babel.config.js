module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          "@components": "./components",
          "@assets": "./assets",
          "@screens": "./app",
          "@contexts": "./contexts",
          "@data": "./data",
          "@utils": "./utils",
        },
      },
    ],
  ],
};
