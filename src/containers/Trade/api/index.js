import Util from 'util';
/**
 * 获取短信验证码
 * @param {*} args 
 * @return code int
 */

const getPhoneCode = async (phone, imgCaptcha, type) => {

    let params = new URLSearchParams();

    params.append('mobile', phone);
    params.append('type', type ? type : 'Login');

    if(imgCaptcha) {
        params.append('imgCaptcha', imgCaptcha);
    }

    const opts = {
        url: '/portal-api/captcha/sendsmscaptcha',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: params
    };

   return await Util.Request(opts, [], /*[3001,3002]*/);

};

const login = async (args = {}) => {

  let params = new URLSearchParams();

  for (let item in args) {

      params.append(item, args[item]);
  }

  const opts = {
      url: '/portal-user/account/loginbycaptcha',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: params
  };

  return await Util.Request(opts);

};

const submit = async (args = {}) => {

  const opts = {
      url: '/portal-api/repair-order',
      method: 'POST',
      params: args
  };

  return await Util.Request(opts);

};

const resetImg = async (args = {}) => {

    const opts = {
        url: '/portal-api/repair-order',
        method: 'POST',
        params: args
    };
  
    return await Util.Request(opts);
  
};

const getImgCaptcha = async (args) => {
    let opts = {
        url:`/portal-api/captcha/getimgcaptcha?type=${args}`,
    };

    return await Util.Request(opts);
}

export default {
  getPhoneCode,
  login,
  submit,
  resetImg,
  getImgCaptcha
};