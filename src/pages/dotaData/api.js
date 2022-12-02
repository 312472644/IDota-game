import service from '@service';

// 获取队伍列表
const getTeamListAPI = () => {
  return service({ url: 'https://api.opendota.com/api/teams' });
};

// 获取赛事列表
const getMatchListAPI = params => {
  return service({
    url: 'https://gwapi.pwesports.cn/eventcenter/dota/event/getEventListByPeriod',
    params
  });
};

// 获取战队成员列表
const getTeamPlayersAPI = teamId => {
  return service({
    url: `https://api.opendota.com/api/teams/${teamId}/players?`
  });
};

// 获取赛事列表(带baner)
const getEventListAPI = (
  params = {
    type: 0,
    pageNum: 1,
    pageSize: 20
  }
) => {
  return service({
    url: `https://appengine.wmpvp.com/dota/event/getEventList`,
    params
  });
};

// 获取版本列表
const getVersionListAPI = () => {
  return service({
    url: 'https://gwapi.pwesports.cn/appdatacenter/api/v2/dota2/rank/versions'
  });
};

// 获取英雄状态(bp信息、胜率等)
const getHeroTopAPI = (version, rank) => {
  return service({
    url: 'https://gwapi.pwesports.cn/appdatacenter/api/v2/dota2/rank/hero',
    params: {
      rank,
      version
    }
  });
};

export { getTeamListAPI, getMatchListAPI, getTeamPlayersAPI, getEventListAPI, getHeroTopAPI, getVersionListAPI };
