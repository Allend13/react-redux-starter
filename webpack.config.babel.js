/* eslint-disable import/no-extraneous-dependencies */
import { optimize, HotModuleReplacementPlugin, DefinePlugin } from 'webpack'
import Dotenv from 'dotenv'
import Config from 'webpack-config'
import Path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Autoprefixer from 'autoprefixer'

Dotenv.config()

export default new Config().merge({
  module: {

    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          Path.resolve(__dirname, 'src'),
        ],
      },
    ],

    loaders: [
      {
        test: /\.js?$/,
        include: Path.join(__dirname, 'src'),
        loaders: ['babel'],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: Path.join(__dirname, 'src'),
        loader: 'url-loader?limit=5120&name=/img/[name].[ext]',
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
      filename: 'js/libraries.js',
      minChunks: () => module.resource && module.resource.indexOf(Path.resolve(__dirname, 'src')) === -1,
    }),

    new HotModuleReplacementPlugin(),
  ],

  postcss: () => [Autoprefixer],

  resolve: {
    root: [
      Path.resolve('node_modules'),
      Path.resolve('src'),
    ],
    alias: {
      node_modules: Path.resolve(__dirname, 'node_modules'),
      less: Path.resolve(__dirname, 'src/less/'),
      components: Path.resolve(__dirname, 'src/components/'),
      actions: Path.resolve(__dirname, 'src/actions/'),
      constants: Path.resolve(__dirname, 'src/constants/'),
      reducers: Path.resolve(__dirname, 'src/reducers/'),
      routes: Path.resolve(__dirname, 'src/routes/'),
    },
  },
});
