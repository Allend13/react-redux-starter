/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const Dotenv = require('dotenv')
const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Autoprefixer = require('autoprefixer')

const { DefinePlugin, HotModuleReplacementPlugin, NamedModulesPlugin } = webpack

Dotenv.config()

const appPath = Path.resolve(__dirname, 'src')

module.exports = {

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
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [appPath],
      },
      {
        test: /\.less$/,
        include: appPath,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [Autoprefixer],
            },
          },
          'less-loader',
        ],
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
          limit: 6000,
          name: '/img/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),

    new NamedModulesPlugin(),

    new DefinePlugin({
      APP_API_HOST: JSON.stringify(process.env.APP_API_HOST),
    }),

    new HtmlWebpackPlugin({
      title: process.env.APP_TITLE || 'Title',
      template: Path.resolve(__dirname, 'index.ejs'),
      inject: 'body',
      hash: true,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
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
