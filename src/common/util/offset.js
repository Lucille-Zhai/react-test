
//获取元素offset top left
export default function offset(elem, root) {
  let curElem = elem;
  const offset = {
    top: 0,
    left: 0,
  };
  while (curElem && curElem !== root) {
    offset.top += curElem.offsetTop;
    offset.left += curElem.offsetLeft;
    curElem = curElem.offsetParent;
  }
  return offset;
}