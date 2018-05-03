let cache = [];
let EventHandler = {
  init() {
    window.addEventListener(
      'click',
      function () {
        cache.map(v => {
          v && v();
        });
      },
      false);
  },
  add(func) {
    // 如果已经有
    if (cache.indexOf(func) != -1) {
      return;
    }
    cache.push(func);
  },
  remove(func) {
    for (let i = 0; i < cache.length; i++) {
      let item = cache[i];
      if (item === func) {
        cache.splice(i, 1);
        break;
      }
    }
  }
};
EventHandler.init();
export default EventHandler;