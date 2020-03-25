const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'production',
    devtool: 'cheep-module-source-map',
    output: {
        filename: 'js/[name].[contenthash:8].js', // contenthash：只有模块的内容改变，才会改变hash值
    },
    plugins: [new CleanWebpackPlugin()],
})
