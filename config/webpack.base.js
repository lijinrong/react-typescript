const path = require('path')
const config = require('./config')
const APP_PATH = path.resolve(__dirname, '../src')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
const px2rem = require('postcss-px2rem')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const bundleAnalyzerReport = argv.report // 根据命令参数是否含有 'report' 来决定是否生成报告

const webpackConfig = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: config.assetsRoot,
        publicPath: config.publicPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 忽略依赖插件目录的识别
                loader: 'babel-loader', // 但需要编译es6语法时需要引入babel
            },
            {
                oneOf: [
                    {
                        test: /\.(html)$/,
                        loader: 'html-loader',
                    },
                    {
                        test: /\.(j|t)sx?$/,
                        include: APP_PATH,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    cacheDirectory: true, // 加快编译速度
                                },
                            },
                            {
                                loader: 'awesome-typescript-loader',
                            },
                        ],
                    },
                    {
                        test: /\.(less|css)$/,
                        use: [
                            config.isDev
                                ? {
                                      loader: 'style-loader',
                                  }
                                : MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function(info) {
                                        return [require('autoprefixer'), px2rem({ remUnit: 75 })]
                                    },
                                },
                            },
                            {
                                loader: 'less-loader',
                            },
                        ].filter(Boolean),
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        use: {
                            loader: 'url-loader', // 功能跟file-loader差不多，区别是有转换base64的功能
                            options: {
                                name: '[name]_[hash].[ext]', // ext 是保留源文件后缀
                                outputPath: 'images/', // dist 目录下的images文件夹
                                limit: 10240, // 10kb以下的图片自动转换为base64编码插入到html中，其他正常生成图片
                            },
                        },
                    },
                    {
                        test: /\.(eot|ttf|svg)$/,
                        use: {
                            loader: 'file-loader',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
        alias: {
            '@': path.resolve(__dirname, '../src/'), // 以 @ 表示src目录
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: config.indexPath,
            showErrors: true,
            chunks: ['commons', 'vendor', 'app'],
            minify: config.isDev
                ? {
                      html5: true,
                      collapseWhitespace: true,
                      preserveLineBreaks: false,
                      minifyCSS: true,
                      minifyJS: true,
                      removeComments: false,
                  }
                : null,
        }),
    ],
}

if (bundleAnalyzerReport) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: path.join(config.assetsRoot, './report.html'),
        })
    )
}

module.exports = merge(webpackConfig, {
    // ...configs
})
