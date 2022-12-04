/**
 * jsonp跨域请求
 *
 * @param {*} config
 * @param {*} key 参数名称
 * @param {*} callbackName 返回函数名称
 * @param {*} callback 请求完成回调函数
 * @return {*}
 */
const jsonp = config => {
  if (!config.url) {
    return;
  }
  config = Object.assign(
    {
      key: 'callback',
      callbackName: 'jsonpCallback',
      callback: () => {}
    },
    config
  );
  window[config.callbackName] = data => {
    config.callback(data);
  };
  const script = document.createElement('script');
  script.src = config.url + `?${config.key}=${config.callbackName}`;
  document.body.appendChild(script);
  document.body.removeChild(script);
};

/**
 * 节流
 *
 * @param {*} fn
 * @param {*} delay
 */
const throttle = (fn, delay) => {
  let preTime = Date.now();
  return function () {
    let context = this,
      args = [...arguments],
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
};

/**
 * 时间戳转化成分秒
 *
 * @param {*} timeStamp
 * @return {*}
 */
const formatTimeStampMS = timeStamp => {
  const mins = Math.floor(timeStamp / 60);
  const seconds = Math.floor(timeStamp % 60);
  const result = {
    mins: mins.toString().padStart(2, 0),
    seconds: seconds.toString().padStart(2, 0)
  };
  return `${result.mins}:${result.seconds}`;
};

/**
 * 从localStorage中获取英雄详细信息
 *
 * @param {*} heroId
 * @return {*}
 */
const getCacheHeroInfo = heroId => {
  const cacheHeroInfo = localStorage.getItem('heroList');
  if (!cacheHeroInfo) {
    return {};
  }
  const heroCNList = JSON.parse(localStorage.getItem('heroList'));
  return heroCNList.find(item => item.id === heroId);
};

export { jsonp, throttle, formatTimeStampMS, getCacheHeroInfo };
