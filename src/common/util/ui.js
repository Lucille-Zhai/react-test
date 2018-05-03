export default {
  createWait: function () {
    var oModal = document.createElement('div');
    oModal.className = 'base-ui-wait';
    oModal.innerHTML = '<div class="box"></div>'
    document.body.appendChild(oModal);
  },
  closeWait: function () {
    var oModal = document.querySelector('.base-ui-wait');
    oModal && oModal.parentNode.removeChild(oModal);
  },
  alert: function (msg, txtok, cbok) {
    if (!msg) return false;
    var oText = null, oBtnOk = null;
    var oModal = document.createElement('div');

    //txtok不为function类型时当确认按钮文字处理
    if (typeof txtok === 'function') {
      cbok = txtok;
    }

    oModal.className = 'base-ui-alert';
    oModal.innerHTML = '<div class="modal">'
      + '<div class="modal-inner">'
      + msg
      + '</div>'
      + '<div class="modal-btns">'
      + '<a href="javascript:;" class="modal-btn confirm-ok">' + (typeof txtok === 'string' ? txtok : '确认') + '</a>'
      + '</div>'
      + '</div>'
    document.body.appendChild(oModal);

    //确认操作
    var confirmModal = function () {
      oModal.parentNode.removeChild(oModal);
      if (typeof cbok === 'function') cbok();
    };

    oModal.classList.add('modal-in');
    oText = oModal.querySelector('.modal-inner');
    oBtnOk = oModal.querySelector('.confirm-ok');

    oBtnOk.addEventListener('click', confirmModal, false);
  },
  /*
  ** opt.msg 提示内容
  ** opt.cbok 确认回调
  ** opt.cbcancle 取消回调
  ** opt.reversal 调转确认按钮和取消按钮位置
  ** opt.txtok 确认按钮文本
  ** opt.txtcancel 取消按钮文本
  **
  ** util.ui.confirm({
  **		msg: '测试一个',
  **		reversal: true,
  **		txtok: '按钮2',
  **		txtcancel: '按钮1'
  **	});
  */
  confirm: function (msg, cbok, cbcancle) {
    if (!msg) return false;

    var opt = {};
    //第一个参数为object时忽略其他参数
    if (Object.prototype.toString.call(msg) === '[object Object]') {
      opt = msg;
    }
    else {
      opt.msg = msg;
      opt.cbok = cbok;
      opt.cbcancle = cbcancle;
    }

    var oModal = document.querySelector('.base-ui-confirm');
    var oText = null, oBtnOk = null, oBtnCancel = null, iRemove = true;
    if (!oModal) {
      oModal = document.createElement('div');
      oModal.className = 'base-ui-confirm';
      oModal.innerHTML = '<div class="modal">'
        + '<div class="modal-inner">'
        + opt.msg
        + '</div>'
        + '<div class="modal-btns">'
        //反转
        + (opt.reversal ? '<a href="javascript:;" class="modal-btn confirm-ok">' + (opt.txtok || '确认') + '</a><a href="javascript:;" class="modal-btn confirm-cancel">' + (opt.txtcancel || '取消') + '</a>'
          : '<a href="javascript:;" class="modal-btn confirm-cancel">' + (opt.txtcancel || '取消') + '</a><a href="javascript:;" class="modal-btn confirm-ok">' + (opt.txtok || '确认') + '</a>')
        + '</div>'
        + '</div>'
      document.body.appendChild(oModal);
    }
    else {
      iRemove = false;
    }
    oModal.classList.add('modal-in');
    oText = oModal.querySelector('.modal-inner');
    oBtnOk = oModal.querySelector('.confirm-ok');
    oBtnCancel = oModal.querySelector('.confirm-cancel');

    //关闭modal
    var closeModal = function () {
      if (iRemove) {
        oModal.parentNode.removeChild(oModal);
      }
      else {
        oModal.classList.remove('modal-in');
        oBtnCancel.removeEventListener('click', cancelModal, false);
        oBtnOk.removeEventListener('click', okModal, false);
      }
    };
    //取消的回调函数
    var cancelModal = closeModal;
    if (typeof opt.cbcancle === 'function') {
      cancelModal = function () {
        opt.cbcancle();
        closeModal();
      };
    }
    //确认的回调函数
    var okModal = function () {
      closeModal();
      if (typeof opt.cbok === 'function') {
        opt.cbok();
      }
    };

    //绑定事件
    oBtnCancel.addEventListener('click', cancelModal, false);
    oBtnOk.addEventListener('click', okModal, false);
  },
  //自关闭
  toast: function (msg, time) {
    if (!msg) return false;
    var oModal = document.createElement('div');
    time = time || 3000;

    oModal.className = 'base-ui-toast';
    oModal.innerHTML = '<div class="modal">'
      + '<div class="modal-inner">'
      + msg
      + '</div>'
      + '</div>'
    document.body.appendChild(oModal);

    //确认操作
    oModal.classList.add('modal-in');
    //设置生存期
    setTimeout(function () {
      oModal.parentNode.removeChild(oModal);
    }, time);
  }
}