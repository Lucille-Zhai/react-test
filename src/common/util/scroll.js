//全局滚动
import Raf from './requstAnimationFrame';
let scrolls = [];
let listener = false;
class Scroll {

  static init() {
    window.addEventListener('scroll', this.handlerScroll, false);
  }
  // 缓动动画算法
  static easeInOutCubic = (t, b, c, d) => {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
      return cc / 2 * t * t * t + b;
    } else {
      return cc / 2 * ((t -= 2) * t * t + 2) + b;
    }
  };

  //循环回掉方法
  static handlerScroll(e) {
    scrolls.map((v, i, a) => {
      v && v();
    });
  }

  //注册函数
  static registerScroll(func) {
    if (!listener) {
      listener = true;
      this.init();
    }

    // 如果已经有
    if (scrolls.indexOf(func) != -1) {
      return;
    }
    scrolls.push(func);
  }

  //删除注册的函数
  static removeScroll(func) {
    for (let i = 0; i < scrolls.length; i++) {
      let item = scrolls[i];
      if (item === func) {
        scrolls.splice(i, 1);
        break;
      }
    }
    // 如果一个都没有，就取消监听
    if (!scrolls.length) {
      listener = false;
      this.destory();
    }
  }
  static getScroll() {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
  }
  //释放
  static destory() {
    window.removeEventListener('scroll', this.handlerScroll, false);
    scrolls.length = 0;
  }

  // 设置滚动条
  static setScrollValue(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  // 返回顶部

  static scrollToTop() {
    const scrollTop = this.getScroll();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollValue(this.easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        Raf.getRequestAnimationFrame()(frameFunc);
      }
    };
    Raf.getRequestAnimationFrame()(frameFunc);
  }

}
// 初始化监听
// Scroll.init();

export default Scroll;