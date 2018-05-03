/**
 * 百度api api 类 （业务层）
 * addOverlay 只打一个点的时候用，会自动设置 center
 * 
 */
export default class baiduMaps {
  constructor(args) {
    this.map = new BMap.Map(args.el);
    this.ac = null;
    this.markers = [];
    this.points = [];
    this.cityInfo = args.cityInfo;
    this.diyOverlayList = [];
    this.LocalSearchLocal = null;
    this.positionPoint = null;
    this.onDoorlabel = null;

    if (args['zoom']) {
      this.map.centerAndZoom(args['cityInfo']['name'], args['zoom'] || 12);
    }
    if(args['disabelWheel']) {
      this.map.disableDragging();
    }
    if(args['wheelZoom']) {
      this.map.enableScrollWheelZoom();
    }
  }
  addOverlay(args) {
    let point = new BMap.Point(args.lng, args.lat);
    var myIcon = new BMap.Icon(args.icon.img, new BMap.Size(args.icon.size[0], args.icon.size[1]), {
      anchor: new BMap.Size(args.icon.anchor[0], args.icon.anchor[0]),
    });
    var marker1 = new BMap.Marker(point, { icon: myIcon }); // 标注

    if(args.label) {
      let label = new BMap.Label("", { offset: new BMap.Size(-48, -40) });
      
      label.setContent(`<div class="store-maps-small-label">${args.label}</div>`);

      marker1.setLabel(label);
    }

    if(args.setCenter) {
      this.map.centerAndZoom(point, 15); // 设置中心点和级别
    }
    this.map.addOverlay(marker1); // 创建标注
  }

  autoComplete(id, cb) {
    let self = this;
    this.ac = new BMap.Autocomplete({
      "input": id,
      "type": "city",
      "location": this.map,
      "onSearchComplete": function (AutocompleteResult) {
        self.ac.hide();

        cb && cb(AutocompleteResult);
      },
    });
  }

  getPoint(value) {
    return new Promise((resolve, reject) => {
      if(typeof value != 'string') {
        value = new BMap.Point(value.lng, value.lat);
        resolve(value);
        return;
      }
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(value, function(point){
        if(point) {
          resolve(point);
        }else {
          reject(1);
        }
      });
    });
  }

  async setPositionPoint(point, icon, setCenter, size=15) {
    if(this.positionPoint) {
      this.map.removeOverlay(this.positionPoint);
    }
    let lng, lat, isGaode = true;
    if(Object.prototype.toString.call(point) == '[object Array]') {
      lng = point[0];
      lat = point[1];
      isGaode = false;
    }else {
      lng = point.position.getLng ? point.position.getLng() : 0;
      lat = point.position.getLng ? point.position.getLat() : 0;
    }

    let result = {points:[{lng, lat}]};
    if(isGaode) {
      result = await this.gaodeToBaidu(lng, lat);
    }

    this.positionPoint = this.setMarkers(result.points[0], icon);

    if(setCenter) {
      this.map.centerAndZoom(result.points[0], size); // 设置中心点和级别
      this.map.setMinZoom(11);
    }


  }
  gaodeToBaidu(x, y) {
    return new Promise((resolve, reject) => {
      var ggPoint = new BMap.Point(x, y);
      var convertor = new BMap.Convertor();
      var pointArr = [];
      pointArr.push(ggPoint);
      convertor.translate(pointArr, 3, 5, (data) => {
        if (data.status == 0) {
          resolve(data);
          return;
        }

        reject(data);
      });
    });
  }

  setMarkers(points, icon, shop, currentShop) {

    if(Object.prototype.toString.call(points) == '[object Array]') {
      points = new BMap.Point(points[0], points[1]);
    }

    var myIcon = new BMap.Icon(icon, new BMap.Size(32, 32), {
      anchor: new BMap.Size(16, 32),
    });

    let marker = new BMap.Marker(points, { icon: myIcon });
    if (shop) {
      let label = new BMap.Label("", { offset: new BMap.Size(-172, -200) });

      label.setContent(`
          <div class="store-maps-label-box">
            <div class="left">
              <h3>${shop.name}</h3>
              <p>${shop.address}</p>
              <span>工作时间：<em>${shop.normalBusinessStartTime}-${shop.normalBusinessEndTime}</em></span>
              <span>联系电话：<em>${shop.mobile}</em></span>
            </div>
            <img class="right store-maps-store-img" src="${shop.coverImg ? shop.coverImg + '&w=80' : ''}"/>
            <div class="button-box" style="display: ${currentShop.id == shop.id ? 'none': 'block'}">
              <div class="button store-maps-label-button" data-id="${shop.id}">选取</div>
            </div>
          </div>
        `);
      label.canRemove = true;
      marker.addEventListener('mouseover', (e) => {
        marker.setLabel(label);
        e.target.Ac.style.zIndex = 1000;
      });

      marker.addEventListener('mouseout', (e) => {
        setTimeout(() => {
          if (label.canRemove) {
            this.map.removeOverlay(label);
            e.target.Ac.style.zIndex = 10;
          }
        }, 50);
      });
      label.addEventListener('mouseover', (e) => {
        label.canRemove = false;
        marker.Ac.style.zIndex = 1000;
      });
      label.addEventListener('mouseout', (e) => {
        label.canRemove = true;
        setTimeout(() => {
          if (label.canRemove) {
            this.map.removeOverlay(label);
            marker.Ac.style.zIndex = 10;
          }
        }, 50);
      });
    }

    this.points.push(points);
    this.markers.push(marker);
    marker.setZIndex(10);
    this.map.addOverlay(marker);
    return marker;
  }


  async setOndoorMarker(args) {

    let result = null;

    if(Object.prototype.toString.call(args.points) == '[object Array]') {
      if(args.isGaode) {
        result = await this.gaodeToBaidu(args.points[0], args.points[1]);
        args.points = result.points[0];
      }else {
        args.points = new BMap.Point(args.points[0], args.points[1]);
      }
    }
    

    var myIcon = new BMap.Icon(args.icon, new BMap.Size(32, 32), {
      anchor: new BMap.Size(16, 32),
    });

    let marker = new BMap.Marker(args.points, { icon: myIcon });

    if (args.label) {
      let label = new BMap.Label("", { offset: new BMap.Size(-145, -115) });

      label.setContent(`
          <div class="ondoor-maps-label-box ${args.label.full ? 'full' : ''}">
            <div class="left">
              <p>
                <span>${args.label.label}</span>
                <span>${args.label.name}</span>
              </p>
              <span class="address">${args.label.business}${args.label.district}</span>
            </div>
            <div class="button-box" style="display: ${args.label.btn ? 'inline-block' : 'none'}">
              <div class="button ondoor-maps-label-button" data-addressname="${args.label.name}" data-business="${args.label.business}" data-district="${args.label.district}">选取</div>
            </div>
            <div style="clear:both"></div>
          </div>
        `);
      label.canRemove = true;

      if(args.label.show) {
        if(this.onDoorlabel) {
          this.map.removeOverlay(this.onDoorlabel);
        }
        marker.setLabel(label);
        this.onDoorlabel = label;
        marker.setZIndex(1000);
      }else {
        marker.addEventListener('mouseover', () => {
          marker.setLabel(label);
          marker.setZIndex(1000);
        });
  
        marker.addEventListener('mouseout', () => {
          setTimeout(() => {
            if (label.canRemove) {
              this.map.removeOverlay(label);
              marker.setZIndex(1);
            }
          }, 200);
        });
        label.addEventListener('mouseover', () => {
          label.canRemove = false;
          marker.setZIndex(1);
        });
        label.addEventListener('mouseout', () => {
          label.canRemove = true;
          setTimeout(() => {
            if (label.canRemove) {
              this.map.removeOverlay(label);
              marker.setZIndex(1);
            }
          }, 200);
        });
      }
      
    }

    if(args.setCenter) {
      this.map.centerAndZoom(args.points, args.size || 12); // 设置中心点和级别
    }

    this.map.addOverlay(marker);

    return marker;
  }

  on(eventName, cb) {
    this.map.addEventListener(eventName, () => {
      cb && cb(this.map.getZoom());
    });
  }
  getMap() {
    return this.map;
  }

  addRegionsOverlay(regions, shopList) {
    const myGeo = new BMap.Geocoder();

    regions.forEach(v => {
      let shops = shopList.filter(item => item.idRegion == v.id);
      if (shops.length == 0) return;

      myGeo.getPoint(this.cityInfo.name + v.name, (point) => {
        this.createDiyOverlay(point, "<div class='diy-overlay'>" + shops.length + "家<br/>" + v.name + "</div>", this.cityInfo.name + v.name);
      });
    });
  }

  createDiyOverlay(pt, text, addressText) {
    let self = this;
    function diyOverlay(point, txt) {
      this._point = point;
      this._text = txt;
      this._color = '#FC6232';
      this._size = 100;
    };

    diyOverlay.prototype = new BMap.Overlay();

    diyOverlay.prototype.initialize = function (map) {
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      var div = document.createElement("div");
      div.style.position = "absolute";
      div.style.borderRadius = '50%';
      //div.style.boxShadow = '0 0 2px 0 #999';
      // 可以根据参数设置元素外观
      div.style.width = this._size + "px";
      div.style.height = this._size + "px";
      div.style.textAlign = 'center';
      div.style.lineHeight = "20px";
      div.style.background = this._color;
      div.style.color = '#fff';
      div.style.fontSize = '16px';
      div.innerHTML = this._text;

      div.addEventListener('click', () => {
        var bdary = new BMap.Boundary();
        bdary.get(addressText, function(rs){       //获取行政区域
          //map.clearOverlays();        //清除地图覆盖物       
          var count = rs.boundaries.length; //行政区域的点有多少个
          if (count === 0) {
            return ;
          }
          var pointArray = [];
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 1, 
              strokeColor: "#4A90E2",
              fillColor:'rgba(74,144,226,0.20)'
            }); //建立多边形覆盖物
            map.addOverlay(ply);  //添加覆盖物
            pointArray = pointArray.concat(ply.getPath());
          }    
         map.setViewport(pointArray);    //调整视野  
        // map.panBy(-250, 0);  
         map.setZoom(12);
        });   

        //alert(map.getZoom())
       // map.panTo(this._point);
      });
      // 将div添加到覆盖物容器中
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
    };
    diyOverlay.prototype.draw = function () {
      // 根据地理坐标转换为像素坐标，并设置给容器    
      var position = this._map.pointToOverlayPixel(this._point);
      this._div.style.left = position.x - this._size / 2 + "px";
      this._div.style.top = position.y - this._size / 2 + "px";
    };

    diyOverlay.prototype.hide = function () {
      if (this._div) {
        this._div.style.display = "none";
      }
    };

    var myCompOverlay = new diyOverlay(pt, text);

    this.diyOverlayList.push(myCompOverlay);

    this.map.addOverlay(myCompOverlay);
  }

  setCenterForRegion(regionName) {
    const myGeo = new BMap.Geocoder();
    myGeo.getPoint(this.cityInfo.name + regionName, (point) => {
      this.map.setCenter(point);
    });
  }

  toDoOverlay(ovelay) {
    let arr = [];

    ovelay.polygon.forEach(item => {
      var temArr = item || [], 
          pArr = [];  //保存单个区域的坐标点 

          temArr.forEach(v => {
            pArr.push(new BMap.Point(v.lng, v.lat));
          });

          if (pArr.length != 0) {
            arr.push(new BMap.Polygon(pArr));
          }
    });
    ovelay.donePolygon = arr;

    this.ovelay = ovelay;
  }

  checkAddress(ovelay, item, point) {
    if(!this.ovelay) {
      this.toDoOverlay(ovelay);
    }
    let self = this;
    return new Promise((resolve, reject) => {

      if(point) {
        self.getPoi(resolve, reject, point);
      }

      if(typeof item == 'string') {
        searchResult = item;
      }else {
        //对重复地名做处理
        item.business = item.business ? item.business.replace(new RegExp(item.city, 'g'), '').replace(new RegExp(item.district, 'g'), '') : '';
        var searchResult = item.province
          + item.city
          + item.district
          + item.street
          + item.business;
      }
      
      self.LocalSearchLocal = new BMap.LocalSearch(self.map, {
        // 本地搜索
        onSearchComplete: function() {self.getPoi(resolve, reject);}
      });

      self.LocalSearchLocal.search(searchResult);
    });
  }

  getPoi(resolve, reject, point) {
    let pp = null;
    if(point) {
      pp = point;
    }else {
      // 关键词提示输入 无法获取到坐标点，需要根据获取的地址名进行本地搜索，根据第一个结果取得坐标值
      pp =this.LocalSearchLocal.getResults() 
      && this.LocalSearchLocal.getResults().getPoi(0) 
      && this.LocalSearchLocal.getResults().getPoi(0).point;   // 获取第一个智能搜索的结果
    }
    
    if(!pp) {
      resolve(false);
      return;
    }
    // 遍历区域多边形
    let hitted = false,
    result = false,
    donePolygon = this.ovelay.donePolygon,
    circle = this.ovelay.circle;

    for (var i = donePolygon.length - 1; i >= 0; i--) {
      result = BMapLib.GeoUtils.isPointInPolygon(pp, donePolygon[i]);
      if (result == true) {
        hitted = true;
        break;
      }
    }

    if (!hitted) {
      for (i = circle.length - 1; i >= 0; i--) {
        result = (BMapLib.GeoUtils.getDistance(pp, new BMap.Point(circle[i].position.lng, circle[i].position.lat)) < circle[i].radius);
        if (result == true) {//点在多边形内
          hitted = true;
          break;
        }
      }
    }

    if (hitted) {
      resolve(true);

    } else {
      resolve(false);
    }
  }

  createCircle(circle) {

    circle.forEach( item => {
      let point = new BMap.Point(item.position.lng, item.position.lat);
      let ply = new BMap.Circle(point, item.radius, {
        strokeWeight: 1, 
        strokeColor: "#4A90E2",
        fillColor:'rgba(74,144,226,0.20)'
      }); //建立多边形覆盖物
      this.map.addOverlay(ply);  //添加覆盖物
    });

  }

  createPolygon(polygon) {
    let boundes = [];
    polygon.forEach(v => {
      boundes = v.map( item => {
        return `${item['lng']}, ${item['lat']}`;
      });

      let ply = new BMap.Polygon(boundes.join(';'), {
        strokeWeight: 1, 
        strokeColor: "#4A90E2",
        fillColor:'rgba(74,144,226,0.20)'
      }); //建立多边形覆盖物
      this.map.addOverlay(ply);  //添加覆盖物
    });
  }

  search(item) {
    this.ac.search(item);
  }
}