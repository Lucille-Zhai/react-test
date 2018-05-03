
import React, { Component } from 'react';

import Icon from '@/components/Icon';

import Popup from '@/components/Popup';

import Selector from '@/components/Selector';

import classnames from 'classnames';

import style from './fault.less';

import Util from 'util';

import { inject, observer } from 'mobx-react';

@observer
export default class Fault extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupTitle: '品牌/型号/设备故障/颜色',
      showPopup: false
    };

    console.log(this.props)
  }

  componentDidMount() {
    if(Util.getParamsString('name')) {
      let item = this.props.store.trade.sku.filter(v => v.name == decodeURIComponent(Util.getParamsString('name')) )[0];
      setTimeout(() => {
        this.onSelectSku();
      }, 500);
    }
  }

  //点击 触发 sku 选择下拉组件
  onSelectSku = () => {
    this.setState({
      showPopup: true
    });
  }
   //关闭 触发 sku 选择下拉组件
  onClose = () => {
    this.setState({
      showPopup: false
    });
  }
  //sku 选择组件完成
  onComplete = (item) => {
    this.onClose();
    this.props.store.trade.submitInfo.sku = item;
    this.props.store.trade.submitInfo = {...this.props.store.trade.submitInfo, faultInfo: item[3].children[0]};
  }

  //故障信息 选择
  faultClick = (v) => {
    this.props.store.trade.submitInfo = {...this.props.store.trade.submitInfo, faultInfo: v};
  }

  //render 故障信息列表
  renderCheckList = () => {
    const {submitInfo} = this.props.store.trade;
    
    if(this.props.store.trade.submitInfo.sku.length < 3) return false;
  
    return (
      <div className="list-box">
        { this.props.store.trade.submitInfo.sku[3].children.map(v =>{

          const active = submitInfo.faultInfo == v;
          const listClassName = classnames('list', {'active': active});

          return (
            <div className={listClassName} onClick={() => {this.faultClick(v);}}>
              <div className="left">
                <p>{v.name}</p>
                <span>{v.plan}</span>
              </div>
              <div className="right">
                <p>预计费用</p>
                <span>￥{v.price}.00</span>
              </div>
            </div>
          );
        }) }
      </div>
    );
  }

  render() {
    const {sku, submitInfo} = this.props.store.trade;
    //更具类型 制定下样式
    const selectGroupClass = classnames('select-group', {'placeholder-group': submitInfo.sku.length == 0});
    //拼接属性
    const productAttribute = submitInfo.sku.length > 0 
      ? submitInfo.sku.filter(v => v.name).map( v => v.name).join('/') 
      : '';

    return (
      <div className="fault-continar">
        <header className="small-title">
        <h3 name='title'>{this.props.wrapData && this.props.wrapData.title ? this.props.wrapData.title :'故障维修'}</h3>
        </header>
        <div className={selectGroupClass} onClick={this.onSelectSku}>
          <div className="left-text">
          
          {submitInfo.sku.length > 0 &&  <small name="pingpai">品牌/型号/设备故障/颜色</small>}

          {submitInfo.sku.length > 0 && <div className="text">{productAttribute}</div>}

          {submitInfo.sku.length == 0 &&  <div className="placeholder">选择品牌/型号/设备故障/颜色</div> }

          </div>
          
          <Icon icon="icon-gongnengjiantou" style={{ fontSize: 14, color: '#ccc' }} className="select-group-icon" />
        </div>

        <div className="select-group full-group">
          <small>选择故障信息获取维修报价（维修完成后付款）：</small>
          {submitInfo.sku.length < 3 && <div className="not-box">暂无报价</div>}
          { this.renderCheckList() }
        </div>

        <Popup title={this.state.popupTitle} onShow={this.state.showPopup} onClose={this.onClose}>
          <Selector 
            onComplete={this.onComplete} 
            item={sku} 
            value={submitInfo.sku} 
            itemName="name" 
            itemChild="children"
            selectNumber="4"
          />
        </Popup> 

      </div>
    );
  }
}