'use strict'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  SRC: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, '../dist'),
  PUBLIC: path.resolve(__dirname, '../public'),
}

module.exports = {
  entry: path.resolve(paths.SRC, 'main.jsx'),

  output: {
    path: paths.DIST,
    filename: 'main.js',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: { '@': paths.SRC },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-decorators', {
                decoratorsBeforeExport: true,
              }],
            ],
          },
        },
      },

      {
        test: /\.s[ca]ss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.PUBLIC, 'index.html'),
    }),
  ],
}
