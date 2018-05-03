import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import PropTypes from 'prop-types';

import Header from '@/components/Header';

import Icon from '@/components/Icon';

import Button from '@/components/Button';

import style from './index.less';

import Fault from '@/containers/Trade/components/fault';

import Appointment from '@/containers/Trade/components/Appointment';

import Reserve from '@/containers/Trade/components/Reserve';

import Util from 'util';

import storeClass from '@/containers/Trade/store/index';

import { Link } from 'react-router-dom';

const store = new storeClass();

@inject('store')
@observer
class Trade extends Component {
  constructor(props) {
    super(props);
    Util.piwik.setViewPage();

    this.state = {
      isSubmiting: false
    };

    this.props.store.trade = store;

    this.props.store.trade.getSku();

    this.props.store.trade.getStoreList();
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  onCheckSubmit = () => {

    if(this.props.store.trade.submitInfo.sku.length == 0) return true;

    if(this.props.store.trade.submitInfo.faultInfo.length == 0) return true;
   
    if(!this.props.store.trade.submitInfo.store.id) return true;

    if(!this.props.store.trade.submitInfo.time) return true;
  
    if(!this.props.store.trade.submitInfo.name) return true;

    if(!this.props.store.trade.submitInfo.isLogin) return true;
    return false;
  }

  onSubmit = async () => {
    if(this.onCheckSubmit()) return false;

    if(this.state.isSubmiting) return false;

    this.setState({
      isSubmiting: true
    });
    
    let submitInfo = this.props.store.trade.submitInfo;
    let params = {
      brand: submitInfo.sku[0].name,
      model: submitInfo.sku[1].name,
      colour: submitInfo.sku[3].name,
      malfunction: submitInfo.sku[2].name,
      repairPlan: submitInfo.faultInfo.name,
      repairPlanDetail: submitInfo.faultInfo.plan,
      estimatedAmount: submitInfo.faultInfo.price,
      name: submitInfo.name,
      date: submitInfo.time.replace(/\(.*\)/g, '').trim(),
      shopId: submitInfo.store.id
    };

    const result = await this.props.store.trade.submit(params);

    this.setState({
      isSubmiting: false
    });

    this.context.router.history.push('/success?price=' + submitInfo.faultInfo.price + '&time=' + encodeURIComponent(submitInfo.time.replace(/\(.*\)/g, '').trim()));
  }

  render() {
    return (
      <div className="page-trade-continar">
        <Header>
          <h1>预约到店维修</h1>
        </Header>

        {this.props.store.trade.sku.length > 0 && <Fault {...this.props}/>}

        {this.props.store.trade.storeList.length > 0 && <Appointment {...this.props}/> }

        <Reserve {...this.props}/>

        <Link to='/success'>我要预约维修</Link>
        <div className="button-group">
          <Button disabled={this.onCheckSubmit()} onClick={this.onSubmit}>提交订单</Button>
        </div>

      </div>
    );
  }
}
export default Trade;