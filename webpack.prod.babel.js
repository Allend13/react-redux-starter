/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack'
import Config from 'webpack-config'
import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import Autoprefixer from 'autoprefixer'

const appPath = resolve(__dirname, 'src')

export default new Config().extend('webpack.base.babel.js').merge({

  entry: appPath,

  output: {
    filename: 'js/app.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        include: appPath,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[folder]_[local]-[hash:base64:5]',
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
                paths: [resolve(__dirname, 'src/less')],
              },
            },
          ],
          publicPath: '/build',
        }),
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new ExtractTextPlugin({
      filename: 'css/app.css',
    }),

    new CleanWebpackPlugin(['build'], {
      root: resolve(__dirname),
      verbose: true,
      dry: false,
    }),
  ],
})
