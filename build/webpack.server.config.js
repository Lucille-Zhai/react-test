/**
 * Created by Yinhuang on 2017/7/12.
 */
//Webpack基础配置文件
const path = require("path");
const webpack = require('webpack');

module.exports = {

  target: "node",
  //依赖图分析入口文件
  entry: {
    "app": [path.resolve(__dirname, "../src/server.js")]
  },

  //输出配置
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'server.js',
    publicPath: ""
  },

  module: {
    //加载器配置
    loaders: [  //loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
        /*use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })*/
      }
      ,
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy', "transform-class-properties"],
          presets: ['react', 'es2015', 'stage-0']
        }
      }
      ,
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=8096&name=[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development"),
    })
  ]
};

