const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const APP_PATH = path.resolve(__dirname, '../src')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const argv = require('yargs').argv
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const px2rem = require('postcss-px2rem')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const bundleAnalyzerReport = argv.report // 根据命令参数是否含有 'report' 来决定是否生成报告

const webpackConfig = {
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  module: {
    rules: [{
      oneOf: [{
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.(j|t)sx?$/,
        include: APP_PATH,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react', // jsx支持
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 2
              }] // 按需使用polyfill
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', {
                loose: true
              }] // class中的箭头函数中的this指向组件
            ],
            cacheDirectory: true // 加快编译速度
          }
        },
        {
          loader: 'awesome-typescript-loader'
        }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function (info) {
                  return [require('autoprefixer'), px2rem({ remUnit: 75 })]
                }
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'postcss-loader', // 注意插入的位置，webpack.prod.js也要加这一项！！！
          {
            loader: 'less-loader',
            options: {
              plugins: function (info) {
                return [require('autoprefixer'), px2rem({ remUnit: 75 })]
              }
            }
          }
        ]
      }
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
    alias: {
      '@': path.resolve(__dirname, '../src/') // 以 @ 表示src目录
    }
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true,
      chunks: ['commons', 'vendor', 'app']
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: false
    }) // 单独使用style标签加载css并设置其路径
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: true ? {
          map: {
            inline: false
          }
        } : {}
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          minSize: 1,
          chunks: 'all',
          priority: 0
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
        }
      }
    }
  }
}

if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: path.join(config.assetsRoot, './report.html')
  }))
}

module.exports = merge(webpackConfig, {
  // ...configs
})
