const path = require ('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],

  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/, loader: "ts-loader"
      }
    ],
  },
};
