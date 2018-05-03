import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import  './index.less';
import storeClass from './store/index';
import Util from 'util';
const KF_URL = 	'//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9741';
const store = new storeClass();
@inject('store')
@observer
class Success extends Component {
  constructor(props) {
    super(props);
    this.props.store.order = store;
    this.props.store.order.getStoreList();
    Util.piwik.setViewPage();
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onKeFu = () => {
    let scripts = Util.requireJS(KF_URL);
    scripts.then(() => {
      NTKF.im_openInPageChat();
    });
  };
  onBack = () => {
    this.context.router.history.push('/');
  }
  render() {
    const { storeList } = this.props.store.order;
    const time = decodeURIComponent(Util.getParamsString('time'));
    const price = Util.getParamsString('price');
    return (
      <div className="page-success-continar">
        <div className="success-page">
          <Header leftText="首页" onBack={this.onBack}>
          </Header>
          <div className="success-title-wrap">
            <div className="success-title">
              <Icon icon="icon-tijiaochenggong-" style={{'fontSize':'40'}} svg/>
              <div className="title-text">
                <h2>提交成功</h2>
                <p>请注意查收预约短信，预计费用<span>¥{price}</span></p>
              </div>
            </div>
          </div>
          <div className="store-infor">
            <h3>门店信息</h3>
            <div className="tip">
              <span className="reminder">提示</span>
              <span>请在 <i>{time}</i> 前往门店维修</span>
            </div>
            <ul className="infor">
              <li>
                <span className="left">门店地址：</span>
                <div className="right">
                  <p>{storeList.name}</p>
                  <p>{storeList.address}</p>
                </div>
              </li>
              <li>
                <span className="left">联系电话：</span>
                <a href={`tel:${storeList.phone}`} className="right tel">
                  {storeList.phone}
                </a>
              </li>
            </ul>
            <ul className="flow">
             <li>去门店</li>
              <li>验货确认</li>
              <li>放款</li>
            </ul>

          </div>
          <div className="notice-items">
            <div className="tip">
              注意事项
            </div>
            <ul>
              <li>1、携带有效证件</li>
              <li>2、如需更改到店维修时间，请联系门店工作人员：<br/><a href={`tel:${storeList.phone}`}>{storeList.phone}</a></li>
              <li>3、如有其他疑问请联系 <a href="javascript:;" onClick={this.onKeFu}>在线客服</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Success;