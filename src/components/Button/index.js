import React, { Component } from 'react';

import classnames from 'classnames';

import './index.less';

export default (props) => {
  let classes = classnames('component-ui-button', {'disabled': props.disabled});
  return (
    <div className={classes} onClick={props.onClick} {...props}>{props.children}</div>
  );
};