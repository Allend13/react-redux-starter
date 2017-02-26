/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack'
import Config from 'webpack-config'
import Path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import Autoprefixer from 'autoprefixer'

const appPath = Path.resolve(__dirname, 'src')

export default new Config().extend('webpack.base.babel.js').merge({

  entry: appPath,

  output: {
    filename: 'js/app.js',
    path: Path.resolve(__dirname, 'build'),
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
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [Autoprefixer],
              },
            },
            {
              loader: 'less-loader',
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
      root: Path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
  ],
});
