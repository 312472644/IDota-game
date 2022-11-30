import service from '@service';

// 获取队伍列表
const getTeamListAPI = () => {
  return service({ url: 'https://api.opendota.com/api/teams' });
};

export { getTeamListAPI };
