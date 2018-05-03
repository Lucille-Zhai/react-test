//闭包形式创建createReduce以便调用
export default function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    // 获取对应的reducer
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
}