export default class baiduMaps {
  constructor(args) {
      this.map = null;
  }

  static getLocation() {
    const map = new AMap.Map('__container__', {
        resizeEnable: true
    });
    let geolocation = null;
    return new Promise((resolve, reject) => {
        map.plugin('AMap.Geolocation', function() {
          geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 2000,          //超过10秒后停止定位，默认：无穷大
          });
          
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', (data) => {
            //   resolve({});
            //   return;
            resolve(data);
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', (err) => {
              reject(err);
          });
      }); //返回定位出错信息
    });
  }
}