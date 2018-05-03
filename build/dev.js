/*
* dev.js
* */

const path = require("path");
const webpack = require('webpack');
const express = require("express");
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const opn = require("opn");
const proxyMiddleware = require('http-proxy-middleware');
const devConfig = require('../config/dev.env');

// dev配置文件
const webpackConfig = require('./webpack.dev.config');

webpackConfig.entry['app'] = [path.resolve(__dirname, `../src/client/${process.env.npm_config_area}-client.js`)];

webpackConfig.output['path'] = path.resolve(__dirname, `../dev/${process.env.npm_config_area}`);

webpackConfig.output['publicPath'] = `/${process.env.npm_config_area}/`;

const compiler = webpack(webpackConfig);

const devMiddlewareConfig = {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true},
  lazy: false,
  historyApiFallback: true,
};
const devMiddleware = WebpackDevMiddleware(compiler, devMiddlewareConfig);
const hotMiddleware = WebpackHotMiddleware(compiler);

const app = express();
app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(path.resolve(__dirname, '../dist')));

//反向代理
devConfig.proxy.forEach(function (item) {
  app.use( 
    proxyMiddleware(
      item[0], { 
        target: item[1], 
        changeOrigin: true, 
        pathRewrite: { [item[0]]: item[2] } 
      }
    )
  );
});

// mock
const mock = path.resolve(__dirname, '../mock');
app.use('/mock', express.static(mock));

app.use('*', require('connect-history-api-fallback')());

app.get('*', function (request, response){
  if(!request.path || request.path == '/index.html' || request.path == '/favicon.icoindex.html') {
    response.send('等雷岩岩的头！\n  请输入渠道名/' + process.env.npm_config_area);
    return;
  }
  const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${ path.resolve(__dirname, '../dev') }/${process.env.npm_config_area}/index.html`);
  response.send(htmlBuffer.toString());
});

app.listen(devConfig.port, devConfig.hostName, () => {
  console.log(`> http://${devConfig.hostName}:${devConfig.port}/${process.env.npm_config_area}`);
  console.log('> waiting...');
  opn(`http://${devConfig.hostName}:${devConfig.port}/${process.env.npm_config_area}`);
});