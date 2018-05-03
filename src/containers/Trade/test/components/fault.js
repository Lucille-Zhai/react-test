import SimpleRender from '@/components/SimpleRender';

import baseIndex from '@/containers/Trade/components/fault';

import '@/containers/Trade/components/fault.less';

//这里采用高阶组件直接render
export default SimpleRender(baseIndex, {title:'aaaaaaaaaaaa'});