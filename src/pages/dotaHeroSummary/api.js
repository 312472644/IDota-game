import service from '@/service';

// 获取英雄详情
const getHeroDetailAPI = heroId => {
  return service({
    url: `https://www.dota2.com.cn/datafeed/hero?hero_id=${heroId}`
  });
};

// 英雄玩家排名
const getRankListAPI = heroId => {
  return service({
    url: `https://api.opendota.com/api/rankings?hero_id=${heroId}`
  });
};

export { getHeroDetailAPI, getRankListAPI };
