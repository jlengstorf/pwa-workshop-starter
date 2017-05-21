const path = require('path');

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
            presets: ['env'],
          },
        },
      },
    ],
  },
  plugins: [],
};
