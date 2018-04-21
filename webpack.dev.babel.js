/* eslint-disable import/no-extraneous-dependencies */
import Config from 'webpack-config'
import { HotModuleReplacementPlugin, SourceMapDevToolPlugin } from 'webpack'
import { resolve } from 'path'

const appPath = resolve(__dirname, 'src')

export default new Config().extend('webpack.base.babel.js').merge({
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

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

  devServer: {
    contentBase: appPath,
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
  },

  plugins: [
    new SourceMapDevToolPlugin(),
    new HotModuleReplacementPlugin(),
  ],
})
