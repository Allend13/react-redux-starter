/* eslint-disable import/no-extraneous-dependencies */
import Config from 'webpack-config'
import { HotModuleReplacementPlugin, NamedModulesPlugin, SourceMapDevToolPlugin } from 'webpack'
import { resolve } from 'path'
import Autoprefixer from 'autoprefixer'

const appPath = resolve(__dirname, 'src')

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
              modules: true,
              camelCase: true,
              localIdentName: '[folder]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [Autoprefixer],
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              paths: [resolve(__dirname, 'src/less')],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new SourceMapDevToolPlugin(),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ],

})
