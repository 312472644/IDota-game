import service from '@/service';

// 获取物品列表
const getDotaItemAPI = () => {
  return service({
    url: 'https://www.dota2.com.cn/itemscategory/json'
  });
};

export { getDotaItemAPI };
