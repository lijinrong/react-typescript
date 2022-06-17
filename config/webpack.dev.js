const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client', './src/index.tsx'],
    },
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: 'js/[name].js',
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        open: true, // 自动打开浏览器
        port: 8080, // 端口
        hot: true,
    },
})
