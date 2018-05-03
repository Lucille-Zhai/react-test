import React, { Component } from 'react';

import Icon from '@/components/Icon';

import classnames from 'classnames';

import './index.less';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }


  render() {
    let props = this.props;

    var lists = props.item.map((v) => {
      //设置初始值
      let result = props.value == v;
      //如果有 itemName  则表示 是个复杂数组，用 name 去判断 是否相等
      if(props.itemName) {
        result = props.value[props.itemName] == v[props.itemName];
      }
      //设置选中 className
      let classes = classnames("list", {"active": props.value == v});

      return (
        <div className={classes} onClick={() => {this.props.onComplete(v);}}>
          {props.itemName ? v[props.itemName] : v}
          {props.value == v && <Icon icon="icon-xuanze-" svg style={{fontSize: 18}} className="timer-checked-icon" />}
        </div> 
      );
    });

    return (
      <div className="component-ui-timer">
         {lists}
      </div>
    );
  }
};