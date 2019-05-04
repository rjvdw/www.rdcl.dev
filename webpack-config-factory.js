'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = factory

function factory(dirname, publicPath, config = {}) {
  const paths = {
    ROOT: path.resolve(dirname),
    PUBLIC: path.resolve(dirname, 'public'),
    SRC: path.resolve(dirname, 'src'),
    DIST: path.resolve(dirname, 'dist'),
  }

  const webpackConfig = {}

  webpackConfig.entry = path.resolve(paths.SRC, config.entry || 'main.ts')
  webpackConfig.output = {
    path: paths.DIST,
    filename: config.output || 'main.js',
    publicPath,
  }
  webpackConfig.resolve = {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  }

  if (config.useSrcAlias !== false) {
    webpackConfig.resolve.alias = {
      '@': paths.SRC,
    }
  }

  if (config.useDevServer) {
    webpackConfig.devtool = 'inline-source-map'
    webpackConfig.devServer = {
      contentBase: paths.DIST,
      historyApiFallback: true,
      overlay: {
        warnings: true,
        errors: true,
      },
      publicPath,
    }
  }

  webpackConfig.module = {
    rules: [],
  }

  if (config.useTypescript !== false) {
    webpackConfig.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: 'ts-loader' },
      ],
    })
  }

  if (config.useSass) {
    webpackConfig.module.rules.push({
      test: /\.s[ca]ss$/,
      exclude: /node_modules/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ],
    })
  }

  webpackConfig.plugins = []

  if (config.useIndexHtml) {
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(paths.PUBLIC, 'index.html'),
        })
    )
  }

  return webpackConfig
}
