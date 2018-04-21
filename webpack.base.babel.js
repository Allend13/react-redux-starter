/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import getStyleLoader from './webpack.style-loader.babel'


const appPath = resolve(__dirname, 'src')
const isProd = process.env.NODE_ENV === 'production'
const isInlineStyles = process.env.NODE_ENV === 'inline'


// WEBPACK PLUGINS
const plugins = [
  new ProgressBarPlugin(),

  new HtmlWebpackPlugin({
    title: process.env.APP_TITLE || 'Title',
    template: resolve(__dirname, 'index.ejs'),
    inject: 'body',
    hash: true,
  }),
]

if (isProd || !isInlineStyles) {
  plugins.push(new MiniCssExtractPlugin({
    filename: `css/[name]${isProd ? '.[contenthash:5]' : ''}.css`,
  }))
}
// END WEBPACK PLUGINS


export default {
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: appPath,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        include: appPath,
        use: getStyleLoader(),
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: appPath,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/img/[name].[ext]',
        },
      },
    ],
  },

  plugins,
}
