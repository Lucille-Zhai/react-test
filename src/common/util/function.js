import CryptoJS from 'crypto-js';

export const getParamsString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (1 >= window.location.hash.split('?', 2).length) {
    return null;
  }
  var r = window.location.hash.split('?', 2)[1].match(reg);
  if (r != null) return r[2];
  return null;
};

export const random = (num) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < num; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
export const checkedMobilePhone = (num) => {
  return /^1[0-9]{10}$/.test(num);
};

export const getWeek = (date) => {

  const weekMap = {
    '0': '周日',
    '1': '周一',
    '2': '周二',
    '3': '周三',
    '4': '周四',
    '5': '周五',
    '6': '周六'
  };
  return weekMap[new Date(date).getDay()];
};

export const formatDate = (date, nowDay) => {

  const weekMap = {
    '0': '周日',
    '1': '周一',
    '2': '周二',
    '3': '周三',
    '4': '周四',
    '5': '周五',
    '6': '周六'
  };

  let m = `00${Number(date.getMonth()) + 1}`.slice(-2),
    d = `00${date.getDate()}`.slice(-2),
    h = `00${date.getHours()}`.slice(-2),
    mi = `00${date.getMinutes()}`.slice(-2),
    s = `00${date.getSeconds()}`.slice(-2),
    hh=`${date.getHours()}`;

  return {
    'txt': `${date.getFullYear()}年${m}月${d}日  (${nowDay ? '今天' : weekMap[date.getDay()]})`,
    '-': `${date.getFullYear()}-${m}-${d}`,
    ':': `${date.getFullYear()}-${m}-${d} ${h}:${mi}:${s}`,
    'q': `${date.getFullYear()}.${m}.${d} (${nowDay ? '今天' : weekMap[date.getDay()]}) ${h}:${mi}~${parseInt(h) + 1}:${mi}`,
    'th': `${date.getFullYear()}年${m}月${d}日 ${h}:${mi}`,
    '.': `${date.getFullYear()}.${m}.${d}`,
    'y':`${m}月${d}日 ${hh}:${mi}-${parseInt(h) + 1}:${mi}`,
    '::':`${date.getFullYear()}-${m}-${d} ${hh}:${mi}`,
    'time': parseInt(date.getTime()) / 1000
  };
};

export const getAmountFloat = (amount) => {
  if (!amount) {
    return '0.00';
  }
  let leftNum = amount.toString().split('.')[0];
  let floatNum = amount.toString().split('.')[1];

  if (!floatNum) {
    return amount + '.00';
  }
  //补0 处理 100.30 会变成 100.3 的问题
  return floatNum.length == 1 ? leftNum + '.' + floatNum + '0' : floatNum;
};

export const testIdCard = (num) => {//是否是身份证号码
  if (!num)
    return false;
  num = num.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!((/(^\d{15}$)|(^\d{17}([0-9]|X)$)/).test(num))) {
    //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
    return false;
  }
  //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  //下面分别分析出生日期和校验位
  var len, re;
  len = num.length;
  if (len == 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确
    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      //alert('输入的身份证号里出生日期不对！');
      return false;
    }
    else {
      //将15位身份证转成18位
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0, i;
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      num += arrCh[nTemp % 11];
      return true;
    }
  }
  if (len == 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    var arrSplit = num.match(re);

    //检查生日日期是否正确
    var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
    var bGoodDay;
    bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      //alert(dtmBirth.getYear());
      //alert(arrSplit[2]);
      //alert('输入的身份证号里出生日期不对！');
      return false;
    }
    else {
      //检验18位身份证的校验码是否正确。
      //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var valnum;
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var nTemp = 0, i;
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[nTemp % 11];
      if (valnum != num.substr(17, 1)) {
        //alert('18位身份证的校验码不正确！应该为：' + valnum);
        return false;
      }
      return true;
    }
  }
  return false;
};

//获得加密数据 用于密码
export const getEncryptedData = (keyStr = 'L00easy.ahwallet', pwd) => {
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  var encryptedData = CryptoJS.AES.encrypt(pwd, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  var encryptedBase64Str = encryptedData.toString();
  return encryptedBase64Str;
};