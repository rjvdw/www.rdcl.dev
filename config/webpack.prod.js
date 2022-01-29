'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const { paths, base } = require('./webpack.base')

module.exports = {
  ...base,
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: paths.PUBLIC, to: paths.DIST, globOptions: {
          ignore: ['index.html'],
        } },
      ],
    }),

    ...base.plugins,
  ],
}
