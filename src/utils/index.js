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

export { jsonp, throttle };
