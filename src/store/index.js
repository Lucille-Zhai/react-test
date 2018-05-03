// 引入出index.js之外的全部文件
const context = require.context('./', false, /\.js$/);

const keys = context.keys().filter(item => item !== './index.js');

const store = {};

keys.map((item,key) => {
  const attr = item.match(/([^\/]+)\.js$/)[1];
  store[attr] = context(item);
});

export default store;