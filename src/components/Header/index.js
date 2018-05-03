import React, { Component } from 'react';

import Icon from '@/components/Icon';

import './index.less';

//Body 组件，为了给 #body增加class
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  onBack = () => {
    if(this.props.onBack) {
      this.props.onBack();
      return;
    }

    history.go(-1);
  }

  render() {
    let props = this.props;
    return (
      <header className="header-ahs-ued-continar fixed-header" style={props.style}>
        <Icon icon="icon-back_navbar-" style={{fontSize:22}} className="back-btn" onClick={this.onBack} />
        {props.leftText && <span className="header-home" onClick={this.onBack}>{props.leftText}</span> }
        {props.children}
        {props.rightIcon && 
        (<div className="btn-share right">
          <Icon icon={props.rightIcon} style={{fontSize:22}} className="back-btn" onClick={props.onRightClick}/>
        </div>)}
      </header>
    );
  }

}