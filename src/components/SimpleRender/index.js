/**
 * 这是一个高阶组件
 */
import React, { Component } from 'react';

export default function SimpleRender(WrappedComponent, wrapData) {
  // ……返回另一个新组件……
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = wrapData;
    }

    render() {
      return <WrappedComponent wrapData={this.state} {...this.props} />;
    }
  };
}