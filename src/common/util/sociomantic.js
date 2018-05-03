import requireJS, { removeJS } from './requireJS';

class Sociomantic {

  //data customer
  static addProducts(data,customer) {
    let url = '//cn-sonar.sociomantic.com/js/2010-07-01/adpan/aihuishou-cn';

    // 先移除，在添加
    window.sociomantic = undefined;
    

    // remove cache 与页面script
    removeJS(url);

    // 设置参数
    window.sonar_basket = data;
    window.customer = customer;

    // 加载sociomantic
    requireJS(url);

  }
}

export default Sociomantic;