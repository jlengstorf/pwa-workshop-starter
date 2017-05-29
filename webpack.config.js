const path = require('path');

// We’ll use this later.
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'assets/js/main.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015'],
          },
        },
      },
    ],
  },
  plugins: [],
};
