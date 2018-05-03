import Axios from 'axios';
import Cookie from './cookie';
import urlSearch from 'url-search-params-polyfill';
import { getParamsString } from './function';
let apiKey = '50340303c3e170af1901914a0949ba38';
let name = 'ahs_pc_smzdm';

// 页面广告相关
class SMZDM {

  // 初始化信息
  static init() {
    let info = null;
    if (getParamsString('feedback') && getParamsString('utm_source') === 'smzdm') {
      info = {
        feedback: getParamsString('feedback'),
        orderList: []
      };
    } else {
      // 没有则不初始化
      return;
    }

    // 如果有信息，则不需要初始化
    if (this.getInfo()) {
      return;
    }

    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    Cookie.set(name, JSON.stringify(info),expiresDate);
  }
  static getInfo() {
    let ck = Cookie.get(name);
    if (!ck) {
      return;
    }

    return JSON.parse(ck);
  }
  static orderStatusPush(order) {
    // 判断当前order状态状态

    // 如果不是交易成功或者交易失败,则中断操作
    if (order.orderStatus != 65535 || order.orderStatus != 131072) {
      return;
    }

    let info = this.getInfo();
    //认为是官网用户；
    if (!info) {
      return;
    }
    var index = -1;
    // 便利orderList
    for (var i = 0; i < info.orderList.length; i++) {
      let item = info.orderList[i];

      // 如果为同一个订单，则跳出
      if (item.order_number != order.orderNo) {
        continue;
      }
      if (item.order_status != 0) {
        continue;
      }
      index = i;
    }

    if (index == -1) {
      return;
    }
    // 成功推送订单
    this.pushOrder(info, index, order);

  }

  // 推送订单，info、索引、订单
  static pushOrder(info, index, order) {
    let _this = this;

    // 动态加载crypto-js；
    import("crypto-js").then(CryptoJS => {

      // 获取索引项和金额
      let item = info.orderList[index];
      item.order_price = order.amount;

      // 订单交易成功失败判断
      item.order_status = order.orderStatus == 65536 ? 1 : -1;

      let params = new URLSearchParams();

      // 添加key与order
      params.append('key', _this.smzdmGenerateKey(item, CryptoJS));
      params.append('order', _this.smzdmGenerateOrder(item, CryptoJS));

      let option = {
        method: 'POST',
        url: 'https://www.linkstars.com/api/adv/cps/order',
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };

      // 订单完成，差不多可以清空cookie了
      Cookie.set(name, JSON.stringify(info));
      Axios(option);
    });
  }

  static setOrder(item) {
    import("crypto-js").then(CryptoJS => {
      let params = new URLSearchParams();

      // 添加key与order
      params.append('key', this.smzdmGenerateKey(item, CryptoJS));
      params.append('order', this.smzdmGenerateOrder(item, CryptoJS));

      let option = {
        method: 'POST',
        url: 'https://www.linkstars.com/api/adv/cps/order',
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };
      Axios(option);
    });

  }

  // MD5订单信息
  static smzdmGenerateKey(order, CryptoJS) {
    var hash = CryptoJS.MD5(apiKey + this.smzdmGenerateOrder(order));
    var hashString = hash.toString(CryptoJS.enc.Hex);
    return hashString.toLowerCase(hashString);
  }

  // 反序列化
  static smzdmGenerateOrder(order, CryptoJS) {
    return JSON.stringify(order); //.replace(/\+/g, "%2B").replace(/\s/g, "+")        

  }

  // 检测订单信息是否存在
  static checkOrderExist(orderList, orderNo) {
    return orderList.some(function (element) {
      return element.order_number === orderNo;
    });
  }
  // 计算佣金，* 8% 保留2位小数
  static computeCommission(price) {
    return parseFloat((price / 8).toFixed(2));
  }
  static successOrder(orderList) {
    let info = this.getInfo();
    //认为是官网用户；
    if (!info) {
      return;
    }

    if (!orderList.length) {
      return;
    }

    orderList.map(order => {
      let item = [{
        goods_id: order.productId,
        goods_name: order.productName,
        goods_price: order.amount,
        goods_commission_type: 1,
        goods_commission_rate: 0.08,
        goods_count: 1,
        goods_commission: this.computeCommission(order.amount),
      }];
      let orderItem = {
        feedback: info.feedback,
        order_number: order.orderItemNo,
        order_time: order.createDt, //.replace(/\//g, '-').replace(/\s/g, 'T') + '+08:00',
        order_status: 0,
        order_price: order.amount,
        goods: item,
        // options
        device: 1,
      };

      if (!this.checkOrderExist(info.orderList, order.orderItemNo)) {
        info.orderList.push(orderItem);
        this.setOrder(orderItem);
      }

    });

    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    Cookie.set(name, JSON.stringify(info),expiresDate);
  }


}

// 自动初始化
SMZDM.init();

export default {
  SMZDM
};