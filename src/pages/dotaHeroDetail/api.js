import service from '@/service';

// 获取英雄详情
const getHeroDetailAPI = heroId => {
  return service({
    url: `https://www.dota2.com.cn/datafeed/hero?hero_id=${heroId}`
  });
};

export { getHeroDetailAPI };
