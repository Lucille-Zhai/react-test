import React, { Component } from 'react';
import classnames from 'classnames';

import style from './index.less';

class Icon extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    let {icon,style, svg, className, onClick} = this.props;

    var useTag = `<use xlink:href="#${icon}" />`;

    let iconClass = classnames({
      'icon': true, 
      'iconfont': true,  
      [icon]: !! icon,
      [className]: !!className
    });

    let svgClass = classnames({
      'icon': true, 
      [className]: !!className
    });

    let text = '';
    if(svg) {
      text =  <svg className={svgClass} aria-hidden='true' style={{...style}} dangerouslySetInnerHTML={{__html: useTag }} onClick={onClick}></svg >
    } else {
      text =  <i className={iconClass} aria-hidden='true' style={{...style}} onClick={onClick}></i>
    }
    return text;
  }
}

export default Icon;