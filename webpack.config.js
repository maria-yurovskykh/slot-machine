const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devConfig = {
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  devServer: {
    host: 'localhost',
    hot: true,
    inline: false,
    disableHostCheck: false
  },
};

const prodConfig = {
  mode: 'production',
  target: 'web',
  devtool: 'none',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
      ],
    }),
  ]
};

module.exports = (env) => {
  switch (env) {
    case 'production':
      return prodConfig;
    default:
      return devConfig;
  }
};