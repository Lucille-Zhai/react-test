import { observable, action, computed } from 'mobx';
import Util from 'util';

class Index {
  @observable storeList = {};
  @action async getStoreList() {
    await Util.requireJS('https://sr.aihuishou.com/activity/repair/storeList.js');
    this.storeList = window.storeList[0];
  }
}
module.exports = Index;