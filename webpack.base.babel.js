/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin, optimize } from 'webpack'
import Dotenv from 'dotenv'
import Path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

Dotenv.config()

const appPath = Path.resolve(__dirname, 'src')

module.exports = {

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [appPath],
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [appPath],
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
    new DefinePlugin({
      APP_API_HOST: JSON.stringify(process.env.APP_API_HOST),
    }),

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

    alias: {
      components: Path.resolve(__dirname, 'src/components/'),
      routes: Path.resolve(__dirname, 'src/routes/'),
      actions: Path.resolve(__dirname, 'src/actions/'),
      constants: Path.resolve(__dirname, 'src/constants/'),
      reducers: Path.resolve(__dirname, 'src/reducers/'),
      less: Path.resolve(__dirname, 'src/less/'),
      node: Path.resolve(__dirname, 'node_modules'),
    },
  },
};
