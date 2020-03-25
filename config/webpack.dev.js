const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge.smart(baseWebpackConfig, {
	mode: 'development',
	entry: {
        app: ['react-hot-loader/patch','./src/index.tsx']
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].[hash:8].js',
    },
	module: {},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: './dist', // 设置实时监听打包文件的目录
		historyApiFallback:true,
		open: true, // 自动打开浏览器
		port: 8080, // 端口
		hot: true, // 启动模块热更新
		hotOnly: true, // 当模块热更新失败时浏览器也不自动刷新
		inline: true
		// proxy 可以配置跨域
	}
})
