import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import  './index.less';
import Util from 'util';
const KF_URL = 	'//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9741';

class Home extends Component {
  constructor(props) {
    super(props);
    Util.piwik.setViewPage();
  }

  onKeFu = () => {
    let scripts = Util.requireJS(KF_URL);

    scripts.then(() => {
      NTKF.im_openInPageChat();
    });
  }
  onBack = () => {
    window.location.href = '//m.aihuishou.com';
  }
  render() {
    return (
      <div className="home-page">
        <Header rightIcon="icon-fuceng-lianxikefu-" leftText="回收旧机" onRightClick={this.onKeFu}  onBack={this.onBack}>
          <h1>手机维修</h1>
        </Header>
        <div className="topbanner">
          <img src={require('../../../images/base/home/banner.png')} alt=""/>
        </div>
        <div className="repair-container">
          <ul>
            <li>
            <Icon  icon='icon-xianshangxiadan-' style={{ 'color': '#333','fontSize':'30'}} />
            <p>线上下单</p>
              <Icon  icon='icon-home_jiantou' style={{'color': '#999','fontSize':'12'}} />
            </li>
            <li>
              <Icon  icon='icon-daodianweixiu-' style={{ 'color': '#333','fontSize':'30'}} />
              <p>到店维修</p>
              <Icon  icon='icon-home_jiantou' style={{'color': '#999','fontSize':'12'}} />
            </li>
            <li>
              <Icon  icon='icon-dingdanwancheng-' style={{ 'color': '#333','fontSize':'30'}} />
              <p>完成维修</p>
            </li>
          </ul>
          <div className="repair-btn">
            <Link to='/trade'>我要预约维修</Link>
          </div>
        </div>
        <div className="brand">
          <h2>支持维修品牌</h2>
          <ul>
            <li>
              <Link to={`/trade?name=${encodeURIComponent('苹果')}`}>
              <img src={require('../../../images/base/home/logo_pg.png')} alt=""/>
              <p>苹果</p>
              </Link>
            </li>
            <li>
              <Link to={`/trade?name=${encodeURIComponent('华为')}`}>
              <img src={require('../../../images/base/home/logo_hw.png')} alt=""/>
              <p>华为</p>
              </Link>
            </li>
            <li>
              <Link to={`/trade?name=${encodeURIComponent('小米')}`}>
              <img src={require('../../../images/base/home/logo_xm.png')} alt=""/>
              <p>小米</p>
              </Link>
            </li>
            <li>
              <Link to={`/trade?name=${encodeURIComponent('魅族')}`}>
              <img src={require('../../../images/base/home/logo_meizu.png')} alt=""/>
              <p>魅族</p>
              </Link>
            </li>
            <li>
              <Link to={`/trade?name=${encodeURIComponent('魅族')}`}>
              <img src={require('../../../images/base/home/logo_sx.png')} alt=""/>
              <p>三星</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="serve">
          <h2>服务保障</h2>
          <ul>
            <li>
              <img src={require('@/images/base/home/pic.png')} alt=""/>
              <p>原厂品质</p>
            </li>
            <li>
              <img src={require('../../../images/base/home/pic_bz.png')} alt=""/>
              <p>180天质保</p>
            </li>
            <li>
              <img src={require('../../../images/base/home/pic_wx.png')} alt=""/>
              <p>专业维修</p>
            </li>
          </ul>
        </div>
        <div className="companion">
          <h2>合作伙伴</h2>
          <ul>
            <li>
              <img src={require('../../../images/base/home/logo_sj.png')} alt=""/>
              <p>世界银行 战略投资</p>
            </li>
            <li>
              <img src={require('../../../images/base/home/logo_jd.png')} alt=""/>
              <p>京东战略 合作伙伴</p>
            </li>
          </ul>
        </div>
        <div className="question">
          <h2>您可能会关心的问题</h2>
          <ul>
            <li>
              <div className="title"><Icon  icon='icon-QA-' style={{ 'color': '#FF6D1A','fontSize':'16'}} /><span>1. 哪些城市支持门店维修？</span></div>
              <div className="answer">目前仅上海地区指定门店开通维修服务。</div>
            </li>
            <li>
              <div className="title"><Icon  icon='icon-QA-' style={{ 'color': '#FF6D1A','fontSize':'16'}} /><span>2. 在线预约之后的服务流程是怎样的?</span></div>
              <div className="answer">请您带着需要维修的设备，自行前往预约的爱回收门店维修即可。</div>
            </li>
            <li>
              <div className="title"><Icon  icon='icon-QA-' style={{ 'color': '#FF6D1A','fontSize':'16'}} /><span>3. 手机维修后更换的配件保修期是多久？</span></div>
              <div className="answer">您的手机经爱回收修复以后，所换的零配件提供180天（国家的手机三包规定是90天）的保修。在保修期内，私自拆修，再次人为损坏，或者出现其他器件的故障，爱回收不提供保修。</div>
            </li>
            <li>
              <div className="title"><Icon  icon='icon-QA-' style={{ 'color': '#FF6D1A','fontSize':'16'}} /><span>4. 外屏碎和内屏碎有什么区别？</span></div>
              <div className="answer">如果屏幕碎了，但图像可以正常显示，表示只是外屏碎。如果图片显示不正常或者完全无法显示，则内屏已碎。</div>
            </li>
          </ul>
        </div>
        <div className="footer">
          Copyright 2010-2017 上海悦易网络信息技术有限公司
            <br/>
            <a href="//www.miitbeian.gov.cn/" target="_blank">
              沪ICP备10043802号-2
            </a>
            <br/>
            <a href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011002002333" target="_blank">
              <i className="hgw"></i>沪公网安备 31011002002333号
            </a>
        </div>
      </div>
    );
  }
}
export default Home;