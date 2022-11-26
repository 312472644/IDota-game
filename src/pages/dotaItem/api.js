import service from '@service';

// 获取物品列表
const getDotaItemAPI = () => {
  return service({
    url: 'https://www.dota2.com.cn/itemscategory/json'
  });
};

// 获取物品详情
const getDotaItemDetailAPI = () => {
  return service({
    url: 'https://www.dota2.com.cn/items/json?callback=HeropediaDFReceive'
  });
};

export { getDotaItemAPI, getDotaItemDetailAPI };
