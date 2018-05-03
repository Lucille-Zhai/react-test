const express = require('express');

const formidable = require('formidable');
const fs = require("fs");
const MESSAGE_PATH = './database/message.json';//定义文件路径地址

const app = express();

app.get('/', function (req, res) {
  //读取文件
  var json = JSON.parse(fs.readFileSync(MESSAGE_PATH, 'utf8'));
  console.log(json);
  //return(json);
  res.send(json);//返回数据


});
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});