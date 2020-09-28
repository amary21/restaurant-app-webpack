const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const Dotenv = require('dotenv-webpack');
const { SourceMapDevToolPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
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
            outputPath: 'images/heros',
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      favicon: path.join('src/public/images/favicon.png'),
      theme_color: '#005792',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist'),
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
        {
          urlPattern: new RegExp('https://dicoding-restaurant-api.el.r.appspot.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restohunt-api',
          },
        },
      ],
    }),
    new WebpackPwaManifest({
      name: 'Restaurant Hunter',
      short_name: 'RestoHunt',
      description: 'Restaurant Hunter',
      theme_color: '#005792',
      background_color: '#005792',
      display: 'standalone',
      fingerprints: false,
      start_url: '/index.html',
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/favicon.png'),
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join('images/icons'),
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/images/favicon.png'),
          sizes: '1024x1024',
          destination: path.join('images/icons'),
          ios: true,
          purpose: 'maskable',
        },
      ],
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
};
