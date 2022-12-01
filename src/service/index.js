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

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Message.error({
      content: '请求错误~'
    });
    return Promise.reject(error);
  }
);

export default service;
