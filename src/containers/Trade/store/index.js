import { observable, action, computed } from 'mobx';
import Util from 'util';
import api from '@/containers/Trade/api/index';

class Index {
  @observable sku = [];
  @observable storeList = [];
  @observable submitInfo = {
    sku:[],
    faultInfo:{},
    store:{},
    time:'',
    name:'',
    phone:'',
    code:'',
    isLogin: false
  };

  @action async getSku() {
    await Util.requireJS('http://sr.aihuishou.com/activity/repair/sku_new.js');
    this.sku = window.sku;
  }

  @action async getStoreList() {
    await Util.requireJS('http://sr.aihuishou.com/activity/repair/storeList.js');
    this.storeList = window.storeList;
  }

  @action async getMsgCode(args) {
    let result;
    try {
      result = await api.getPhoneCode(args.phone, args.imgCodeValue);
    }catch(e) {
      console.warn(e);
      args.callback(e);
      return;
    };

    args.callback(false, result);
  }

  @action async login(args, callback) {
    let result;
    try {
      result = await api.login(args);
    }catch(e) {
      console.warn(e);
      callback && callback(e);
      return;
    };

    callback && callback();
  }

  @action async submit(args) {
    let result;
    try {
      result = await api.submit(args);
    }catch(e) {
      console.warn(e);
      return;
    };

    return result;
  } 

  @action async resetImg() {
    let result;
    try {
      result = await api.getImgCaptcha('Login');
    }catch(e) {
      console.warn(e);
      return;
    };

    return result;
  } 
}

// 外部使用require
module.exports = Index;