import React, { Component } from 'react';

import Icon from '@/components/Icon';

import classnames from 'classnames';

import './index.less';

export default class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    let classes = classnames('component-ui-Popup', {show: props.onShow});
    return (
      <div className={classes}>
          <div className="mask" onClick={this.props.onClose}></div>
          <div className="popup-continar">
            <header className="popup-header">
              <h2>{props.title}</h2>
              <Icon icon="icon-gongnengguanbi-" style={{fontSize: 16, color: '#ccc'}} className="popup-icon" onClick={this.props.onClose}/>
            </header>

            <div className="content-continar" style={{minHeight: props.children.type.name != 'Selector' ? '3.6rem': 'initial'}}>
              {props.onShow && props.children}
            </div>
          </div>
      </div>
    );
  }
};