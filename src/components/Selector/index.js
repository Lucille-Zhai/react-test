import React, { Component } from 'react';

import Icon from '@/components/Icon';

import classnames from 'classnames';

import Util from 'util';

import './index.less';

export default class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerList : props.value || []
    };
  }

  //递归查找
  find = (item, num = 0) => {
    let props = this.props;


    let result = [];

    if(!this.state.headerList || this.state.headerList.length == 0) {
      return {
        num:0,
        item:item
      };
    }

    if(this.state.headerList[num + 1]) {
      let itemValue = props.itemId || 'id';

      if(!item[props.itemId || 'id']) {
        itemValue = props.itemName || 'name';
      }
      let child = item.filter( v =>  v[itemValue] == (this.state.headerList[num][itemValue]) )[0][props.itemChild || 'child'];

      return this.find(child, num + 1);
    }
    
    return  {
      num:num,
      item:item
    };;
  }

  onClick = (v, num) => {
    let result = [...this.state.headerList];
    result[num] = v;

    //如果达到轮数，直接 return
    if(this.props.selectNumber - 1 == num ) {
      this.props.onComplete(result);
    }

    
    if(num != this.props.value.length -1 && v[this.props.itemChild || 'children'].length > 0) {
      result[num + 1] = {};
    }

    this.setState({
      headerList: result
    });

    //selectNumber 外面传进来的轮数   num == this.props.value.length -1 表示已经最后一轮   || 没有 child 子集了
    if(num == this.props.value.length -1 ||  v[this.props.itemChild || 'children'].length == 0) {
      this.props.onComplete(result);
    }
  }

  changeHeader = (num) => {
    let result = this.state.headerList.slice(0, num + 1);
    this.setState({
      headerList: result
    });
  }


  render() {
    let props = this.props;
    let list = this.find(props.item);

    const lists = list.item.map((v) => {
      let active = this.state.headerList.length > 0 && this.state.headerList[list.num][props.itemName||'name'] == v[props.itemName||'name'];
      let classes = classnames('list', {active, active});
      return (
        <div className={classes} onClick={() => {this.onClick(v, list.num);}}>
          {v[props.itemName || 'name']}

          {active && <Icon icon="icon-xuanze-" svg style={{fontSize: 18}} className="timer-checked-icon" />}
        </div> 
      );
    });

    return (
      <div className="component-ui-selector">
         <div className="header">
            {
              this.state.headerList.length > 0 
              ? this.state.headerList.map((v, i) => {
                  let classes = classnames({'active': i == this.state.headerList.length - 1});
                  let name = v[props.itemName || 'name'];
                  let htmls = name ? (<span onClick={() => {this.changeHeader(i);}} className={classes}>{v[props.itemName || 'name'] }</span>) : (<span className="active">请选择</span>);

                  return htmls;
                }) 
              : <span className="active">请选择</span>
            }
         </div>
         <div className="content">
          {lists}
         </div>
      </div>
    );
  }
};