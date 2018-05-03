import baseReserve from '@/containers/Trade/components/reserve';

import React, { Component } from 'react';

//这里采用高阶组件直接render
export default class Reserve extends baseReserve {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div onClick={() => {this.onAlert();}}>232131231232</div>
    );
  }
}