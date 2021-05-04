const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './sauce/App.js',
  output: {
    filename: 'App.bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
};
