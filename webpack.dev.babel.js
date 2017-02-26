/* eslint-disable import/no-extraneous-dependencies */
import Config from 'webpack-config'
import { HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack'
import Path from 'path'
import Autoprefixer from 'autoprefixer'

const appPath = Path.resolve(__dirname, 'src')

export default new Config().extend('webpack.base.babel.js').merge({

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    appPath,
  ],

  output: {
    filename: 'app.js',
    publicPath: '/',
  },

  devtool: 'cheap-eval-source-map',

  devServer: {
    contentBase: appPath,
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        include: appPath,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [Autoprefixer],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ],

});
