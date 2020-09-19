const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/heros',
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
    new workboxPlugin.GenerateSW({
      cacheId: 'restohunt',
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:css|js|html|ttf|eot|woff|woff2|png|json|png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'restohunt-assets',
          },
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/public/images/icons/food.png'),
      publicPath: '/favicons',
      outputPath: '/assets/favicons',
      cache: true,
      inject: true,
      favicons: {
        appName: 'Restaurant Hunter',
        appShortName: 'RestoHunt',
        appDescription: 'Restaurant Hunter',
        theme_color: '#005792',
        background: '#005792',
        display: 'standalone',
        developerName: 'amary',
        start_url: '/index.html',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new CleanWebpackPlugin(),
  ],
};
