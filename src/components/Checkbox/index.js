import React, { Component } from 'react';

import Icon from '@/components/Icon';

import classnames from 'classnames';

import './index.less';

export default (props) => {
  let {className} = props;
  let classess = classnames({
    'component-ui-checkbox': true, 
    [className]: !!className
  });

  return (
    <div className={classess} onClick={props.onClick}>
      {props.checked 
        ? <Icon icon="icon-xuanze-" style={{fontSize: 18}} svg />
        : <span className="checkbox-default"></span>}
    </div>
  );
};