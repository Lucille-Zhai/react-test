import { observable, action, computed } from 'mobx';
import Apis from '@/apis/common';

class Common {
  @observable dateList = [];
  @action async getExpressDate(args) {
    const result = await Apis.getExpressDate(args);

    this.dateList = result;
  }
}

// 外部使用require
module.exports = new Common();