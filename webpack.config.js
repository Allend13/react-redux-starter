const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  devTool: 'eval',
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
    path: path.join(__dirname, 'js'),
    publicPath: 'http://localhost:8080/',
    filename: 'app.js',
    pathinfo: true,
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'src'),
        loaders: ['style', 'css', 'postcss', 'less'],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: path.join(__dirname, 'src'),
        loader: 'url-loader?limit=5120&name=/img/[name].[ext]',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      hash: true,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'libraries.js',
      minChunks: () => module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1,
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  postcss: () => [autoprefixer],

  resolve: {
    root: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ],
    alias: {
      less: path.resolve(__dirname, 'src/less/'),
      components: path.resolve(__dirname, 'src/components/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
    },
  },
}






try { require('dotenv').load(); } catch (e) { }
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

/**
 * @function appPathTo
 * @description Get the path to a folder within the application.
 * @returns {string} path
 */
var appPathTo = _.partial(function () {
  return path.join(__dirname, path.join.apply(path, arguments));
}, 'app');

module.exports = function (options) {
  var config = _.merge({}, {
    entry: {
      // ...entry is included in development and production configs
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, '/dist'),
      filename: '[name].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'APP_API_HOSTNAME': JSON.stringify(process.env.APP_API_HOSTNAME),
        'APP_API_VERSION': JSON.stringify(process.env.APP_API_VERSION),
        'FACEBOOK_APP_ID': JSON.stringify(process.env.FACEBOOK_APP_ID),
        'ANALYTICS_API_KEY': JSON.stringify(process.env.ANALYTICS_API_KEY),
        'GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
        'FILEPICKER_API_KEY': JSON.stringify(process.env.FILEPICKER_API_KEY)
      })
    ],
    resolve: {
      extensions: ['', '.js', '.less', '.css'],

      // All aliases are prefixed with "app" to prevent name conflicts
      alias: {

        // Resolve componets and views
        'app-core': appPathTo('components'),
        'app-views': appPathTo('views'),
        'app-router': appPathTo('router'),

        // Resolve Redux actions, constants and reducers
        'app-actions': appPathTo('actions'),
        'app-constants': appPathTo('constants'),
        'app-reducers': appPathTo('reducers'),
        'app-store': appPathTo('store'),

        // Resolve utility functions/services
        'app-utils': appPathTo('utils'),
        'app-fixtures': path.join(__dirname, 'tests', 'fixtures'),

        // Resolve assets and styles
        images: appPathTo('images'),
        normalize: path.join(__dirname, 'node_modules', 'normalize.css', 'normalize.css'),
        styles: appPathTo('styles')
      }
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /\.less$/,
          include: path.join(__dirname, 'app'),
          exclude: /node_modules/,
          loader: 'style!css!postcss!less'
        },
        {
          test: /\.css$/,
          loader: 'style!css!postcss'
        },
        {
          test: /\.woff$|\.woff2$|\.eot$|\.ttf$|\.png$|\.svg$|\.jpg$/,
          include: path.join(__dirname, 'app'),
          exclude: /node_modules/,
          loader: 'file'
        }
      ]
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    postcss: function () {
      return [autoprefixer];
    }
  }, options.overrides);

  config.module.loaders = _.union(config.module.loaders, options.loaders);
  config.plugins = _.union(config.plugins, options.plugins);

  return config;
};
