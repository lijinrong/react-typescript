const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.dev.js')
const merge = require('webpack-merge')
var FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')

const compiler = webpack(
    // webpack options
    merge(webpackConfig, {
        plugins: [
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: ['You application is running here http://localhost:8080'],
                    notes: ['Some additional notes to be displayed upon successful compilation'],
                },
            }),
        ],
    })
)
const express = require('express')
const app = express()

app.use(require('webpack-hot-middleware')(compiler))

app.use(
    middleware(compiler, {
        // webpack-dev-middleware options
        stats: false,
    })
)

app.listen(8080)
