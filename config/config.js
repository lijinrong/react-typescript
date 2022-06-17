const path = require('path')

module.exports = {
    isDev: process.env.NODE_ENV === 'development',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsDirectory: 'static',
    publicPath: '/',
    indexPath: path.resolve(__dirname, '../public/index.html'),
}
