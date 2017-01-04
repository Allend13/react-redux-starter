/* eslint-disable import/no-extraneous-dependencies */
import Config from 'webpack-config'
import Path from 'path'

export default new Config().extend('webpack.config.babel.js').merge({
  devtool: '#cheap-module-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
    },
  },

  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './src/index',
  ],

  output: {
    path: Path.join(__dirname, 'js'),
    publicPath: 'http://localhost:8080/',
    filename: 'js/app.js',
    pathinfo: true,
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        include: Path.join(__dirname, 'src'),
        loaders: ['style', 'css', 'postcss', 'less'],
      },
    ],
  },

});
