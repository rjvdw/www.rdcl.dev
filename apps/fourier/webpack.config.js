'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  ROOT: path.resolve(__dirname),
  PUBLIC: path.resolve(__dirname, 'public'),
  SRC: path.resolve(__dirname, 'src'),
  DIST: path.resolve(__dirname, 'dist'),
}

const PUBLIC_URL = '/fourier/'

module.exports = {
  entry: path.resolve(paths.SRC, 'main.ts'),

  output: {
    path: paths.DIST,
    filename: 'main.js',
    publicPath: PUBLIC_URL,
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.DIST,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    publicPath: PUBLIC_URL,
  },

  module: {
    rules: [
      rule(/\.ts$/, use('ts-loader')),
      rule(/\.s[ca]ss$/, use(
        'style-loader',
        'css-loader',
        'sass-loader',
      )),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.PUBLIC, 'index.html'),
    }),
  ],
}

function rule(test, use) {
  return {
    test,
    exclude: /node_modules/,
    use,
  }
}

function use(...loaders) {
  return loaders.map(loader => {
    if (typeof loader === 'string') {
      return { loader }
    } else {
      return loader
    }
  })
}
