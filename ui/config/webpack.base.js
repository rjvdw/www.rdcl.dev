'use strict'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = {
  SRC: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, '../dist'),
  PUBLIC: path.resolve(__dirname, '../public'),
}

exports.paths = paths
exports.base = {
  entry: path.resolve(paths.SRC, 'main.tsx'),

  output: {
    path: paths.DIST,
    filename: 'main.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: { '@': paths.SRC },
  },

  module: {
    rules: [
      {
        test: /\.ya?ml?$/,
        type: 'json',
        use: 'yaml-loader',
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

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
              '@babel/plugin-syntax-export-default-from',
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

      {
        test: /components\/.*\.svg$/,
        use: '@svgr/webpack',
      },

      {
        test: /elements\/.*\.svg$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.SRC, 'index.html'),
    }),
  ],
}
