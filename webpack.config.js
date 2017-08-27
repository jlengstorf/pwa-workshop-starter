const path = require('path');
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
  plugins: [
    new SWPrecacheWebpackPlugin({
      filepath: './dist/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /[.]jpg$/,
          handler: 'cacheFirst',
        },
      ],
      staticFileGlobs: [
        'dist/assets/{css,js}/main.{css,js}',
        'dist/*.{html,png,xml,ico,svg}',
      ],
      stripPrefix: 'dist/',
    }),
  ],
};
