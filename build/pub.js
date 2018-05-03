const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const webpackConfig = require('./webpack.pub.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');


//取得所有静态目录
fs.readdir(path.resolve(__dirname, `../src/client/`), async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  await recursionWebpack(files, 0);

  console.log(chalk.cyan('All  Build complete.\n'));
  console.log(chalk.cyan('Done ! \n'));
  console.log(chalk.cyan('Done !! \n'));
  console.log(chalk.cyan('Done !!! \n'));

});

async function recursionWebpack(files, index) {
  if(files.length == index) return;

  let res;
  try {
    res = await compilerEach(files[index], index);
  }catch(e) {
    console.error(e);
    return;
  }

  if(res) {
    return recursionWebpack(files, index + 1);
  }else {
    return;
  }
}


function compilerEach(fileName, nums) {

  return new Promise((resolve) => {

    const areaName = fileName.replace(/^(.*)\-client\.js$/, '$1');

    webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__AREA_ENV__': JSON.stringify(areaName),
      '__SERVER_ENV__': JSON.stringify(process.env.__SERVER_ENV__),  //环境 env DEV UAT PRE PUB
    }));

    webpackConfig.entry['app'] = [path.resolve(__dirname, `../src/client/${areaName}-client.js`)];

    webpackConfig.output['path'] = path.resolve(__dirname, `../dist/${areaName}`);

    webpackConfig.output['publicPath'] = `/${areaName}/`;

    webpackConfig.plugins.push(
      new CleanWebpackPlugin(
        [`dist/${areaName}/*`],
        {
          root: path.resolve(__dirname, '../'),
          verbose: true,
          dry: false,
        }
      ));

    const spinner = ora('building for production...');
    webpack(webpackConfig, function (err, stats) {
      spinner.stop();
      if (err) {
        throw err;
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      console.log(chalk.cyan('  Build complete.\n'));
      webpackConfig.plugins.splice(-2, 2);
      resolve(true);
    });

  });
}