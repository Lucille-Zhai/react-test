
import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';

import Icon from '@/components/Icon';

import Checkbox from '@/components/Checkbox';

import Popup from '@/components/Popup';

import Timer from '@/components/Timer';

import classnames from 'classnames';

import './appointment.less';

import Util from 'util';

@observer
export default class Fault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: false,
      popupTitle: '选择到店时间',
      timeList: this.onGetTimeList()
    };

    //默认选中第一个 门店
    this.props.store.trade.submitInfo.store =  this.props.store.trade.storeList[0];
    //默认选中时间
    this.props.store.trade.submitInfo.time = this.state.timeList[0].trim();
  }

  onGetTimeList = () => {
    const arr = [];
    let date = new Date();
    arr.push(Util.formatDate(date, true).txt);
    for(let i = 0; i< 6; i++) {
      date.setDate(date.getDate() + 1);
      arr.push(Util.formatDate(date).txt);
    }
    return arr;
  }

  onTimerPopup = () => {
    this.setState({
      showTimer: true
    });
  }

  onClose = () => {
    this.setState({
      showTimer: false
    });
  }

  onComplete = (item) => {
    this.props.store.trade.submitInfo.time = item;
    this.onClose();
  }

  render() {
    const {submitInfo} = this.props.store.trade;

    const timerSelect = classnames('time-continar', {'placeholder-group': Object.keys(submitInfo.time).length == 0});

    return (
      <div className="appointment-continar">
        <header className="small-title">
          <h3>预约门店/时间</h3>
        </header>

        <div className="store-list-continar">
          {
            this.props.store.trade.storeList.map( v => {
              return (
                <div className="store-list">
                  <div className="left">
                    <h4>{v.name}</h4>
                    <p>地址：{v.address}</p>
                    <p>电话：{v.phone}</p>
                  </div>
                  <Checkbox className="store-list-checkbox" checked/>
                </div>
              );
            })
          }

        </div>

        <div className={timerSelect} onClick={this.onTimerPopup}>
          <div className="left-text">
            {Object.keys(submitInfo.time).length > 0 && <small>选择到店时间</small>}
            {Object.keys(submitInfo.time).length > 0 && <div className="text">{submitInfo.time}</div>}
            {Object.keys(submitInfo.time).length == 0 &&  <div className="placeholder">选择到店时间</div>}
          </div>
          <Icon icon="icon-gongnengjiantou" style={{ fontSize: 14, color: '#ccc' }} className="select-group-icon" />
        </div>

        <Popup title={this.state.popupTitle} onShow={this.state.showTimer} onClose={this.onClose}>
          <Timer 
            onComplete={this.onComplete} 
            item={this.state.timeList} 
            value={submitInfo.time} 
          />
        </Popup> 
        
      </div>
    );
  }
}