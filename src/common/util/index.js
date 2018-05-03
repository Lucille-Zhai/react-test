import ad from './ad';
import piwik from './piwik';
import scroll from './scroll';
import offset from './offset';
import cookie from './cookie';
import storage from './storage';
import { Request } from './request';
import requireJS from './requireJS';
import Raf from './requstAnimationFrame';
import createReducer from './createReducer';
import baiduMaps from './baiduMaps';
import gaodeMaps from './gaodeMaps';
import EventHandler from './event';
import scrollToAnchor from './scrollToAnchor';

import ui from './ui';

import * as methods from './function';

module.exports = {
  ad,
  ui,
  Raf,
  piwik,
  scroll,
  offset,
  cookie,
  Request,
  storage,
  requireJS,
  baiduMaps,
  gaodeMaps,
  createReducer,


  EventHandler,
  ...methods,
  scrollToAnchor
};

//import("crypto-js").then(function(res){
//  console.log(res)
//})