const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonConfig = {
    entry: {
        app: [
            'babel-polyfill',
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'react-dom', 'mobx', 'mobx-react']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ],
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            css: path.join(__dirname, 'src/css'),
            images: path.join(__dirname, 'src/images'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            mock: path.join(__dirname, 'mock'),
        }
    }
};

module.exports = commonConfig;