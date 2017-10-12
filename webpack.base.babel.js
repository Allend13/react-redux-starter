/* eslint-disable import/no-extraneous-dependencies */
import { optimize, SourceMapDevToolPlugin } from 'webpack'
import Path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const appPath = Path.resolve(__dirname, 'src')

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
};
