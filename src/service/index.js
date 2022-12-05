import axios from 'axios';
import { Message } from 'view-ui-plus';
import JsonBig from 'json-bigint';

const service = axios.create({
  transformResponse: [
    data => {
      // JSON.parse精度丢失的问题
      const json = JsonBig({ storeAsString: true });
      const responseData = json.parse(data);
      return responseData;
    }
  ],
  timeout: 5000
});

service.interceptors.request.use(async config => {
  const cacheHeroList = localStorage.getItem('heroList');
  // 缓存中文英雄列表
  if (!cacheHeroList) {
    // 防止接口多次调用
    localStorage.setItem('heroList', 'loading');
    const response = await axios.get('https://www.dota2.com.cn/datafeed/heroList?task=herolist');
    localStorage.setItem('heroList', JSON.stringify(response.data.result.heroes));
  }
  return config;
});

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Message.error({
      content: '请求错误,请刷新下页面试试~'
    });
    return Promise.reject(error);
  }
);

export default service;
