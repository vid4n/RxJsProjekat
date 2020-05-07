const path = require ('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.ts'],

  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve (__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/typescript'],
          },
        },
      }
    ],
  },
};
