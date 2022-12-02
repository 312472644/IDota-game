import service from '@/service';

// 获取英雄列表
const getHeroListAPI = () => {
  return service({
    url: 'https://www.dota2.com.cn/datafeed/heroList?task=herolist'
  });
};

export { getHeroListAPI };
