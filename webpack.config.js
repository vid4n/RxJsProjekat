const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './',
  },
};
