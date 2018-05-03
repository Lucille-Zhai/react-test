import React, { Component } from 'react';

import Icon from '@/components/Icon';

import classnames from 'classnames';

import './index.less';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCloseBtn: false,
      isFocus: false
    };
  }

  onFocus = () => {
    let state = {
      isFocus: true,
      showCloseBtn: true
    };
    this.setState(state);
  }

  onBlur = () => {
    this.setState({
      isFocus: false
    });
    setTimeout(() => {
      this.setState({
        showCloseBtn: false,
      });
    }, 230);
  }

  onChange = (ev) => {
    this.props.onChange(ev.target.value);
  }

  onClear = () => {
    this.props.onChange('');
  }

  render() {
    let props = this.props;

    let labelClass = classnames({active: this.state.isFocus || props.value});
    let componentsClass = classnames('component-ui-input', {[props.className]: !!props.className});
    let continarClass = classnames({left: props.children, 'input-continar': true});
    return (
      <div className={componentsClass}>
        <div className={continarClass}>
          <div className="input-box">
            <label className={labelClass}>{props.placeholder}</label>
            <input 
            type={props.type || 'text'} 
            onFocus={this.onFocus} 
            onBlur={this.onBlur}
            value={props.value}
            onChange={this.onChange}
            style={{width:props.inputWidth}}
            maxLength={props.maxLength}
            disabled={props.disabled}
            />

            {this.state.showCloseBtn && props.value && (<div className="close-btn" onClick={this.onClear}>
              <Icon icon="icon-shanchu" style={{fontSize:16}} svg/>
            </div>)}
          </div>
        </div>
        {props.children}
      </div>
    );
  }
};