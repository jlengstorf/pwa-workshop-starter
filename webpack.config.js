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
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'pwa-workshop-starter-v1',
        filepath: './dist/service-worker.js',
        runtimeCaching: [{
          urlPattern: /[.]jpg$/,
          handler: 'cacheFirst'
        }],
        staticFileGlobs: [
          'dist/assets/js/main.js',
          'dist/assets/css/main.css',
          'dist/*.html',
          'dist/*.png',
          'dist/*.xml',
          'dist/*.ico',
          'dist/*.svg',
        ],
        stripPrefix: 'dist/',
      }
    ),
  ],
};