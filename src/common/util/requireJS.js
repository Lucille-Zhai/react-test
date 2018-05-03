import { random } from './function';
//加载js，用于非amd等第三方cdn js加载
let cache = {};
export default function requireJS(src, attrs, cb) {
  return new Promise(function (resolve, reject) {

    if (cache[src]) {
      resolve(cache[src]);
      return;
    }

    let scripts = document.createElement('script');
    scripts.async = true;
    //随机6位数
    let cbName = random(6);
    let links = src;
    //如果有cb 存在则表示走 cb 回调 触发 reslove

    if (cb) {
      links = src + cb + '=' + cbName;
    }
    scripts.src = links;

    for (let item in attrs) {
      scripts[item] = rels[item];
    }

    document.body.appendChild(scripts);

    //如果有cb 存在则表示走 cb 回调 触发 reslove
    if (cb) {
      window[cbName] = () => {
        cache[src] = 123;
        setTimeout(() => {
          resolve(1);
        }, 500);
      };
      return;
    }

    if (!window.attachEvent) {
      scripts.onload = function () {
        setTimeout(() => {
          cache[src] = this;
          resolve(this);
        }, 200);
      };
    } else {
      scripts.onreadystatechange = function () {
        if (/(complete|loaded)/.test(scripts.readyState)) {
          setTimeout(() => {
            cache[src] = this;
            resolve(this);
          }, 200);
        }
      };
    }

  });
}

// remove JS
export function removeJS(name) {
  let script = document.querySelector(`script[src="${name}"]`);
  if (script) {
    script.parentNode.removeChild(script);
  }
  delete cache[name];
}