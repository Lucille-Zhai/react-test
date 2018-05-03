import React, { Component } from 'react';

import Header from '@/components/Header';

import style from './index.less';

import Util from 'util';
class NotFound extends Component {
  constructor(props) {
    super(props);
    Util.piwik.setViewPage();
  }
  render() {
    return (
      <div className="not-found">
        <Header>
          <h1>服务器开小差了</h1>
        </Header>

        <div className="body" style={{'minHeight': '6.23rem'}}>
          <img src={require('../../images/base/notfound/404.png')} alt="404" />
          <div id="info">
              <div className="container">
                  <div id="title">
                      该页面已坐方舟逃离了地球
                  </div>
                  <div className="detail">
                      你懂得，别难过回首页吧
                      <div>
                          <a href="/">返回到首页</a>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound;