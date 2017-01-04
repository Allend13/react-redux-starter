/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin, optimize } from 'webpack'
import Config from 'webpack-config'
import Path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export default new Config().extend('webpack.config.babel.js').merge({
  entry: {
    app: './src',
  },

  output: {
    path: './build/',
    filename: '/js/app.js',
  },

  module: {
    loaders: [
      {
        test: /\.(less|css)$/,
        include: Path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('css!postcss!less'),
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new optimize.UglifyJsPlugin({ sourceMap: false }),

    new ExtractTextPlugin('/css/app.css'),

    new CleanWebpackPlugin(['build'], {
      root: Path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
  ],
});
