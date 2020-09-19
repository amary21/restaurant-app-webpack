const WebpackPwaManifest = require('webpack-pwa-manifest');
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
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
      icons: [{
        src: path.resolve(__dirname, 'src/public/images/icons/food.png'),
        sizes: [72, 96, 128, 144, 152, 192, 384, 512],
      }],
    }),
  ],
});
