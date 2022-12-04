import service from '@/service';

// 获取队伍汇总信息
const getTeamDetailAPI = teamId => {
  return service({
    url: `https://api.opendota.com/api/teams/${teamId}?`
  });
};

// 获取队伍比赛列表
const getTeamMatchListAPI = teamId => {
  return service({
    url: `https://api.opendota.com/api/teams/${teamId}/matches?`
  });
};

// 获取队伍使用英雄列表
const getTeamHeroesAPI = teamId => {
  return service({
    url: `https://api.opendota.com/api/teams/${teamId}/heroes?`
  });
};

// 获取队伍成员列表
const getTeamPlayersAPI = teamId => {
  return service({
    url: `https://api.opendota.com/api/teams/${teamId}/players?`
  });
};

export { getTeamDetailAPI, getTeamMatchListAPI, getTeamHeroesAPI, getTeamPlayersAPI };
