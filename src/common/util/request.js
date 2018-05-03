import Axios from 'axios';
import ui from './ui';
//import Message from '@/components/Message';

const serverNames = {
  test: 'aihuishoutest.com',
  dev: 'aihuishoutest.com',
  prod: 'aihuishou.com'
};

const server_env = __SERVER_ENV__;

switch(server_env) {
  case 'DEV':
    break;
  case 'UAT':
    break;
  case 'PRE':
    break;
  case 'PUB':
    break;
  default:
    break;
}


/**
 *
 * @param method       (String)     [GET,POST]  default GET
 * @param url          (String)                 default empty
 * @param params       (Object)                 default {}
 * @param contentType  (String)                 default text/plain
 * @param responseType (String)                 default json
 * @param headers      (Object)                 default {}
 */

//wrap
export const Request = (args, codes, source) => {

  //默认的参数
  let defaultArgs = {
    //contentType: 'application/json',
    //responseType: 'application/json',
    headers: { source: 'pc' }
  };

   //清除callback，如果有的话,urlsearch
   try {
    args.params.delete('callback');
  } catch (error) {}

  if (withCredentials) {
    defaultArgs['withCredentials'] = withCredentials;
  }

  //设置域名
  //测试环境
  if(/aihuishoutest\.com/.test(document.domain)) {
    args.url = /portal-user/.test(args.url)
    ? `//portaluser.${requestSeverName}${args.url.replace('/portal-user', '')}`
    : `//portalapi.${requestSeverName}${args.url.replace('/portal-api', '')}`;

}

  //默认method
  args.method = args.method || 'GET';

  //合并默认参数和业务参数
  const opts = { ...defaultArgs, ...args };

  //如果是post 请求 则 delete 掉 params key值 赋值给data
  if (args.method === 'POST') {
    opts['data'] = opts.params;
    delete opts['params'];
  }

  //返回一个promise 用来 await调用
  return new Promise((resolve, reject) => {

    Axios(opts).then((res) => {
      //如果业务层有错误码过来
      let data = source ? res.data : res.data.data;

      if (codes && codes.indexOf(res.data.code) !== -1) {
        reject(res.data);
        return;
      }
      if (res.data.code !== 0) {

        if (codes && codes.length === 0) {
          reject(res.data);
          return;
        }

        ui.toast(res.data.msg);
        // Message.toast({
        //   content: res.data.msg,
        //   duration: 10000
        // });
        // getVue.get().$Toast(res.data.msg);
        reject(res.data);
        return;
      }
      resolve(data);

    }).catch((err) => {
      ui.toast('网络繁忙，请稍后重试！');
      // Message.toast({
      //   content: '网络繁忙，请稍后重试！',
      //   duration: 10000
      // });
      //默认直接弹框报错
      // alert('网络繁忙，请稍后重试！');
      reject(err);

    });
  });
};