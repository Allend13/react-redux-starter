/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path'
import Autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isProd = process.env.NODE_ENV === 'production'
const isInlineStyles = process.env.NODE_ENV === 'inline'

const loaderConfigs = {
  vendor: [
    //
  ],
  app: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: true,
        sourceMap: !isProd,
        localIdentName: '[folder]_[local]-[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [Autoprefixer],
        sourceMap: !isProd,
      },
    },
    {
      loader: 'less-loader',
      options: {
        paths: [resolve(__dirname, 'src/less')],
        sourceMap: !isProd,
      },
    },
  ],
}

const cssExtractLoaders = [
  'css-hot-loader',
  MiniCssExtractPlugin.loader,
]

const getStyleLoader = (isVendor) => {
  let config = []

  if (isVendor) {
    config = loaderConfigs.vendor
  } else {
    config = loaderConfigs.app
  }

  if (isInlineStyles) {
    config = [{ loader: 'style-loader' }, ...config]
  } else {
    config = [...cssExtractLoaders, ...config]
  }

  return config
}

export default getStyleLoader
