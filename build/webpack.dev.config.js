/**
 * Created by Yinhuang on 2017/7/12.
 */
const webpack = require('webpack');

const webpackConfig = require('./webpack.base.config');  //基础配置文件

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

webpackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"development"', //node env
  '__AREA_ENV__': JSON.stringify(process.env.npm_config_area),
  '__SERVER_ENV__': JSON.stringify('DEV'),  //环境 env DEV UAT PRE PUB
}));


webpackConfig.devtool = '#cheap-module-eval-source-map';
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name].push('webpack-hot-middleware/client?timeout=200&overlay=true', 'react-hot-loader/patch');
});
module.exports = webpackConfig;