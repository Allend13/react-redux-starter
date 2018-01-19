/* eslint-disable import/no-extraneous-dependencies */
import { optimize } from 'webpack'
import Path, { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Autoprefixer from 'autoprefixer'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'


const appPath = Path.resolve(__dirname, 'src')
const isProd = process.env.NODE_ENV === 'production'


const ExtractСSS = new ExtractTextPlugin({
  filename: `css/app${isProd && '.[contenthash:5]'}.css`,
})


module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [appPath],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        include: appPath,
        use: ['css-hot-loader'].concat(ExtractСSS.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  camelCase: true,
                  sourceMap: !isProd,
                  localIdentName: '[folder]_[local]-[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [Autoprefixer],
                  sourceMap: !isProd,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  paths: [resolve(__dirname, 'src/less')],
                  sourceMap: !isProd,
                },
              },
            ],
            publicPath: '/build',
          })
        )
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: [appPath],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/img/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),

    ExtractСSS,

    new HtmlWebpackPlugin({
      title: process.env.APP_TITLE || 'Title',
      template: Path.resolve(__dirname, 'index.ejs'),
      inject: 'body',
      hash: true,
    }),

    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js',
      minChunks: module => module.resource && (/node_modules/).test(module.resource),
    }),
  ],

  resolve: {
    modules: [
      Path.resolve('node_modules'),
      appPath,
    ],
  },
}
