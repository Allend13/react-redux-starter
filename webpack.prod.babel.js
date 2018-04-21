/* eslint-disable import/no-extraneous-dependencies */
import Config from 'webpack-config'
import { resolve } from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const appPath = resolve(__dirname, 'src')

export default new Config().extend('webpack.base.babel.js').merge({
  mode: 'production',

  entry: appPath,

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
  },

  output: {
    filename: 'js/app.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
  ],
})
