/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};

/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
};
export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

// 获取年龄
export function getAge(birthTs) {
  const today = new Date();
  const birthDate = new Date(birthTs * 1000);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// 防止滑动中突然点击
// ts 为停止滚动或滑动多少 毫秒后 接触禁止点击
export function preventDelay(ts = 300) {
  window.canClick = true;
  document.addEventListener('touchmove', () => {
    setCanNotClick();
  }, true);
  document.addEventListener('touchmove', debounce(setCanClick, ts), true);
  document.addEventListener('click', (e) => {
    if (!window.canClick) {
      e.stopPropagation();
    }
  }, true);
  document.addEventListener('scroll', () => {
    setCanNotClick();
  }, false);
  document.addEventListener('scroll', debounce(setCanClick, ts), false);

  function setCanNotClick() {
    window.canClick = false;
  }

  function setCanClick() {
    window.canClick = true;
  }
}

// 函数防抖
// 参数function是需要进行函数防抖的函数;
// 参数wait则是需要等待的时间，单位为毫秒;
// immediate参数如果为true，则debounce函数会在调用时立刻执行一次function，而不需要等到wait这个时间后，例如防止点击提交按钮时的多次点击就可以使用这个参数。
export function debounce(func = () => {}, wait = 300, immediate = false) {
  let timeout;
  let args;
  let context;
  let timestamp;
  let
    result;
  const later = () => {
    const last = (new Date()).getTime() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = (new Date()).getTime();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

// 函数节流
// 参数function是需要进行函数节流的函数;
// 参数wait则是函数执行的时间间隔，单位是毫秒;
// option有两个选项，throttle第一次调用时默认会立刻执行一次function，如果传入{leading: false}，则第一次调用时不执行function。{trailing: false}参数则表示禁止最后那一次延迟的调用。
export function throttle(
  func = () => {},
  wait = 300, {
    leading = true,
    trailing = true
  } = {},
) {
  let context;
  let args;
  let
    result;
  let timeout = null;
  let previous = 0;
  // if (!options) options = {};
  const later = () => {
    previous = leading === false ? 0 : (new Date()).getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };
  return function () {
    const now = (new Date()).getTime();
    if (!previous && leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

// 日期格式化 如果是今天显示具体时间 今天之前则显示月日
export function formatTime(timestamp) {
  let format = '';
  if (!timestamp || timestamp === 0) {
    return;
  }
  const date = new Date(timestamp * 1000);
  if (new Date(timestamp * 1000).toDateString() === new Date().toDateString()) {
    format = `今天 ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  } else {
    format = `${date.getMonth() + 1}-${date.getDate()}`;
  }
  return format;
}

// 版本比较
export function versionCompare(stra, strb) {
  const straArr = stra.split('.');
  const strbArr = strb.split('.');
  const maxLen = Math.max(straArr.length, strbArr.length);
  let result;
  let sa;
  let
    sb;
  for (let i = 0; i < maxLen; i++) {
    sa = ~~straArr[i];
    sb = ~~strbArr[i];
    if (sa > sb) {
      result = 1;
    } else if (sa < sb) {
      result = -1;
    } else {
      result = 0;
    }
    if (result !== 0) {
      return result;
    }
  }
  return result;
}


// 浏览器相关的方法
export function getUrlParam(name) {
  let match = RegExp('[?&]' + name + '=([^&]*)', 'gi').exec(window.location.search)
  return match && window.decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export function isMobile() {
  let userAgentInfo = window.navigator.userAgent.toLowerCase()
  let Agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipod']
  let isMobile = false
  Agents.map((agent) => {
    if (userAgentInfo.indexOf(agent) > 0) {
      isMobile = true
    }
  })
  return isMobile
}

export function isWeiXin() {
  return /micromessenger/.test(window.navigator.userAgent.toLowerCase())
}

export function isAndroid() {
  return (/android/.test(window.navigator.userAgent.toLowerCase()))
}

export function isIos() {
  return (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()))
}

export function isClient() {
  return (/JUDTrade/.test(window.navigator.userAgent))
}

export function isSina() {
  return /weibo/.test(window.navigator.userAgent.toLowerCase())
}

export function isQQ() {
  return /qqbrowser/.test(window.navigator.userAgent.toLowerCase())
}
// 设置页面 title
// iframeSrc 推荐用图片链接, 用于在iOS微信 设置 title失败的情况所采用的黑科技
export function setTitle({
  title = '',
  iframeSrc = 'https://www.jd.com/favicon.ico'
}) {
  document.title = title
  if (!isClient()) {
    if (isWeiXin() && isIos()) {
      try {
        let body = document.getElementsByTagName('body')[0]
        let iframe = document.createElement('iframe')
        iframe.setAttribute('src', iframeSrc)
        iframe.style.display = 'none'
        iframe.addEventListener('load', () => {
          setTimeout(() => {
            iframe.removeEventListener('load', false)
            document.body.removeChild(iframe)
          }, 0)
        })
        body.appendChild(iframe)
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    window.jsBridge && window.jsBridge.changeTitle({
      title
    })
  }
}

// 滚动到位置
// 滚动的位置， 滚动的时间
export function scrollTo(scrollTo, time) {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  let scrollFrom = parseInt(scrollTop)
  let i = 0
  let runEvery = 5
  scrollTo = parseInt(scrollTo)
  time = time / runEvery
  let interval = window.setInterval(() => {
    let scrollDis = (scrollTo - scrollFrom) / time * i + scrollFrom
    i++
    document.body.scrollTop = scrollDis
    document.documentElement.scrollTop = scrollDis
    if (i >= time) {
      window.clearInterval(interval)
    }
  }, runEvery)
}