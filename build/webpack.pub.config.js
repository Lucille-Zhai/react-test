/**
 * Created by Yinhuang on 2017/7/12.
 */
const webpack = require("webpack");

const path = require("path");

const webpackConfig = require('./webpack.base.config');

webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_console: true,
    drop_debugger: true
  }
}));
module.exports = webpackConfig;