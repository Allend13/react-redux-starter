/* eslint-disable import/no-extraneous-dependencies */
import Config from 'webpack-config'
import { resolve } from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const appPath = resolve(__dirname, 'src')

export default new Config().extend('webpack.base.babel.js').merge({
  entry: appPath,

  output: {
    filename: 'js/app.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: resolve(__dirname),
      verbose: true,
      dry: false,
    }),
  ],
})
