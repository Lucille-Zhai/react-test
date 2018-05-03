
import React, { Component } from 'react';

import Input from '@/components/Input';

import Button from '@/components/Button';

import Icon from '@/components/Icon';

import Util from 'util';

import './reserve.less';

export default class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getMsgCodeDisabled: true,
      coldTime: 0,
      onShowImgCode: false,
      imgCodeValue: '',
      imgSrc: ''
    };
  }

  onAlert = () => {
    alert(234)
  }

  setColdTime = () => {
    this.coldTimer = setInterval(() => {
      if(this.state.coldTime == 0) {
        clearInterval(this.coldTimer);

        if(Util.checkedMobilePhone(this.props.store.trade.submitInfo.phone)) {
          this.setState({
            getMsgCodeDisabled: false
          });
        };
        return;
      }
      this.setState({
        coldTime: this.state.coldTime - 1
      });
    },1000);
  }

  onMsgCodeBtnClick = async(ev, value) => {
    let _self = this;
    if(_self.state.getMsgCodeDisabled) return;

    Util.ui.createWait();
    await _self.props.store.trade.getMsgCode({
      phone: _self.state.phone, 
      imgCodeValue: value || '', 
      callback(err, res) {
        Util.ui.closeWait();
        if(err) {
          if (err.code == 3002) {
            Util.ui.toast("图形验证码错误");
          }

          if (err.code == 3001 || err.code == 3002) {
            _self.setState({
              imgSrc: err.data.captchaUrl.replace(
                /http\:|https\:/,
                location.protocol
              ),
              onShowImgCode: true
            });
          }

          if (err.code == 3003) {
            Util.ui.toast(err.msg);
          }
          return;
        }

        _self.setState({
          coldTime: 60
        });

        _self.setColdTime();
      }
    });
  }

  onChange = (item, str) => {
    const state = {
      [str]: item
    };

    if(str == 'phone') {
      state['getMsgCodeDisabled'] = true;
    }

    if(str == 'phone' && Util.checkedMobilePhone(item)) {
      state['getMsgCodeDisabled'] = false;
    };

    if(str == 'code' && !isNaN(item) && item.length == 6) {
      this.login(item);
    };

    this.setState(state);

    this.props.store.trade.submitInfo[str] = item;
  }

  login = async (item) => {
    let params = {
      mobile: this.props.store.trade.submitInfo.phone,
      smsCaptcha: item
    };
    Util.ui.createWait();
    await this.props.store.trade.login(params, (err) => {
      Util.ui.closeWait();
      if(!err) {
        this.props.store.trade.submitInfo.isLogin = true;
      }
    });
  }

  onResetInmg = async () => {
    const result = await this.props.store.trade.resetImg();

    this.setState({
      imgSrc: result.captchaUrl
    });
  }

  onInputImgCode = (value) => {

    let state = {
      onShowImgCode: true,
      imgCodeValue: value
    };

    if (value.length == 4) {
      this.onMsgCodeBtnClick(false, value);
      state.onShowImgCode = false;
      state.imgCodeValue = '';
    }

    this.setState(state);
  }

  onClose = () => {
    this.setState({
      onShowImgCode: false
    });
  }

  render() {
    let phoneInput = (<Input placeholder="手机号" maxLength="11" value={this.props.store.trade.submitInfo.phone} disabled />);

    if(!this.props.store.trade.submitInfo.isLogin) {
      phoneInput = (
        <Input placeholder="手机号" maxLength="11" value={this.props.store.trade.submitInfo.phone} onChange={(item) => {this.onChange(item, 'phone');}}>
          <Button disabled={this.state.getMsgCodeDisabled || this.state.coldTime != 0} onClick={this.onMsgCodeBtnClick}>{this.state.coldTime != 0 ? this.state.coldTime + 's重新获取' : '获取验证码'}</Button>
        </Input>
      );
    }
    return (
      <div className="reserve-continar">
        <header className="small-title">
          <h3>预约门店/时间</h3>
        </header>
        
        <div className="from-group">
          <Input placeholder="您的姓名" value={this.props.store.trade.submitInfo.name} onChange={(item) => {this.onChange(item, 'name');}}/>
          {phoneInput}
          {!this.props.store.trade.submitInfo.isLogin && <Input placeholder="短信验证码" maxLength="6" value={this.props.store.trade.submitInfo.code} onChange={(item) => {this.onChange(item, 'code');}}/>}
        </div>

        {this.state.onShowImgCode && <div className="img-code-box">
          <div className="main">
            <header className="title">图形验证码<Icon icon="icon-guanbi" size="20" color="#ccc" className="icon" onClick={this.onClose} /></header>
            <div className="content">
              <Input placeholder="4位验证码" type="tel" maxlength="4" className="input" value={this.state.imgCodeValue} onChange={this.onInputImgCode}>
                <img src={this.state.imgSrc} className="img"/>
              </Input>
              <a href="javascript:;" className="reset" onClick={this.onResetInmg}>刷新图片</a>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}