const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge.smart(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].[hash:8].js'
  },
  module: {
  }
})
