/**
 * Created by Yinhuang on 2017/7/12.
 * Webpack公共配置
 */

const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  // 依赖图分析入口文件
  entry: {
    "app": [path.resolve(__dirname, "../src/client/base-client.js")],
    "common": ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react']
  },

  //输出配置
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: '[name]-[chunkhash:8].js',
    publicPath: ""
  },

  module: {
    //加载器配置
    loaders: [  //loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        //loader: "style-loader!css-loader" // css in js
        //loader: ExtractTextPlugin.extract("style-loader", "css-loader") // link 加载
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        //loader: "style-loader!css-loader!less-loader"
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      }
      ,
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-decorators-legacy',
            "transform-class-properties",
            "syntax-async-functions",
            "syntax-dynamic-import",
            "transform-async-to-generator",
            "transform-regenerator",
            "transform-runtime"
          ],
          presets: [
            'react',
            'es2015',
            'stage-2'
          ]
        }
      }
      ,
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=8096&name=[name].[hash:8].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      util: __dirname + '/../src/common/util/',
      '@':path.join(__dirname,'..','src')
    }
  },
  plugins: [
    // 删除dist
    // new CleanWebpackPlugin([path.resolve(__dirname,'../dist')]),
    // 插件并不直接操作单个文件，它直接对整个构建过程其作用。
    // index 页面
    new HtmlWebpackPlugin({
      //这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件，这个文件中自动引用了你打包后的JS文件。每次编译都在文件名中插入一个不同的哈希值。
      template: path.resolve(__dirname, '../src/index.html'),
      js: ["common.js", "app.js"],
      //css: ["website.css", "style.css"],
      favicon: path.resolve(__dirname, '../src/favicon.ico'),
      filename: 'index.html',
      minify: {
        //移除注释
        removeComments: true,
        //移除空白
        collapseWhitespace: true,
        //移除html中可以去掉的引号
        removeAttributeQuotes: true
      }
    }),

    // build optimization plugins
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[hash:8].js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      // (选择所有被选 chunks 的子 chunks)

      async: true,
      // (创建一个异步 公共chunk)

      minChunks: 2,
    }),

    new ExtractTextPlugin({
      filename: './style-[contenthash:8].css',
      allChunks: false,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};

