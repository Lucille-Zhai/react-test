import React, { Component } from 'react';

import Header from '@/components/Header';

import Button from '@/components/Button';

import Checkbox from '@/components/Checkbox';

import Input from '@/components/Input';

import Popup from '@/components/Popup';

import Timer from '@/components/Timer';

import Selector from '@/components/Selector';

import style from './index.less';

import testData from './testdata';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a:123444,
      checked: false,
      show: false,
      test:[
        'abc',
        'bbc'
      ],
      value: 'abc',
      test2: testData,
      value2:[
        {
          id:1,
          name:'上海'
        },
        {
          id:1,
          name:'上海'
        },
        {
          id:3,
          name:'杨浦区'
        }
      ]
    };
  }

  click1 = () => {
    console.log(this.state);
    this.setState({
      show: !this.state.show
    });
  }

  click2 = () => {
    this.setState({
      checked: !this.state.checked
    });
  }

  onChange = (value) => {
    this.setState({
      a: value
    });
  }

  onClose = () => {
    this.setState({
      show:false
    });
  }

  onComplete = (v) => {
    console.log('你选择了' + v);
    this.setState({
      value:v
    });
    this.onClose();
  }

  onComplete2 = (v) => {
    console.log('你选择了' + v);
    this.setState({
      value2:v
    });
    this.onClose();
  }

  render() {
    return (
      <div className="not-found">
        <Header>
          <h1>服务器开小差了</h1>
        </Header>

        <div className="body" style={{'minHeight': '6.23rem'}}>
          <img src={require('../../images/base/notfound/404.png')} alt="404" />
          <div id="info">
              <div className="container">
                  <div id="title">
                      该页面已坐方舟逃离了地球
                  </div>
                  <div className="detail">
                      你懂得，别难过回首页吧
                      <div>
                          <a href="/">返回到首页</a>
                      </div>
                  </div>
              </div>

              <Button onClick={this.click1}>123</Button>

              <Checkbox onClick={this.click2} checked={this.state.checked}/>

              <Input placeholder="你的姓名" value={this.state.a} onChange={this.onChange}/>

              <Input placeholder="你的姓名" value={this.state.a} onChange={this.onChange}>
                <Button onClick={this.click1} disabled>获取验证码</Button>
              </Input>

              {/*<Popup title="选择到店时间" onShow={this.state.show} onClose={this.onClose}>
                <Timer onComplete={this.onComplete} item={this.state.test} value={this.state.value} />
              </Popup> */}

              <Popup title="品牌/型号/设备故障/颜色" onShow={this.state.show} onClose={this.onClose}>
                <Selector 
                  onComplete={this.onComplete2} 
                  item={this.state.test2} 
                  value={this.state.value2} 
                  itemId="id" 
                  itemName="name" 
                  itemChild="childRegions"
                />
              </Popup>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound;