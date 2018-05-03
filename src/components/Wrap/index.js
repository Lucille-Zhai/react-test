
//包裹组件，主要是为了根据路由生成css填充
import React, { Component } from 'react';
//Body 组件，为了给 #body增加class
export default class Wrap extends Component {
  constructor(props) {
    super(props);

    let css = this.getCss();
    this.state = {
      css: css,
      body: true
    };
  }

  // 为了给body增加class
  componentWillReceiveProps(nextProps) {
    let css = this.getCss();
    this.setState({
      css: css
    });
  }

  // 从url中取得class 以/分隔
  getCss() {
    let hash = location.hash.split('?')[0];
    //let css = hash.replace(/^#\/([^\/]+).*/,'$1');
    let arr = hash.split('/').filter(v => v != '' && v != '#');

    return arr.join(' ');
  }
  render() {

    return (
      <div {...this.props} className={this.state.css}>
        {this.props.children}
      </div>
    );
  }
}