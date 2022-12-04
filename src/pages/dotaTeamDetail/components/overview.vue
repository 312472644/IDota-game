<template>
  <div class="overview-box">
    <Spin :show="loading" class="page-loading" size="small">
      <Icon type="ios-loading" color="#808695" size="18" class="spin-icon-load"></Icon>
      <div class="loading-text">加载中...</div>
    </Spin>
    <div v-if="!loading" class="content-box">
      <div class="left">
        <div class="overview-card">
          <div class="title">最近比赛</div>
          <div class="content">
            <Table class="table" :columns="matchOptions.columns" :data="matchOptions.dataList">
              <template #matchId="{ row }">
                <div class="link">
                  <span>{{ row.match_id }}</span>
                  <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
                </div>
                <div class="date">
                  <span>{{ row.start_time }}</span>
                  <span class="symbol">/</span>
                  <span>{{ row.league_name }}</span>
                </div>
              </template>
              <template #duration="{ row }">
                <div class="row-slot">
                  <span>{{ row.duration }}</span>
                  <span>{{ row.radiant ? '天辉' : '夜魇' }}</span>
                </div>
              </template>
              <template #radiant_win="{ row }">
                <span :class="{ 'win-result': true, win: row.winResult, lose: !row.winResult }">
                  {{ row.winResult ? '比赛胜利' : '比赛失败' }}
                </span>
              </template>
              <template #opposing="{ row }">
                <div class="inline-logo-box">
                  <span :style="`background-image:url(${row.opposing_team_logo})`" class="inline-logo"></span>
                  <span class="link">{{ row.opposing_team_name }}</span>
                  <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
                </div>
              </template>
            </Table>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="overview-card">
          <div class="title">当前玩家</div>
          <div class="content">
            <Table class="table" :columns="playersOptions.columns" :data="playersOptions.dataList">
              <template #name="{ row }">
                <div class="inline-logo-box">
                  <span :style="`background-image:url(${row.avatar})`" class="inline-logo"></span>
                  <span class="link">{{ row.name }}</span>
                  <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
                </div>
              </template>
            </Table>
          </div>
        </div>
        <div class="overview-card">
          <div class="title">使用英雄</div>
          <div class="content">
            <Table class="table" :columns="heroOptions.columns" :data="heroOptions.dataList">
              <template #hero_id="{ row }">
                <div class="inline-logo-box">
                  <img :src="row.avatar" class="inline-logo" />
                  <span class="link">{{ row.heroCnName }}</span>
                  <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
                </div>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { getTeamMatchListAPI, getTeamPlayersAPI, getTeamHeroesAPI } from '../api';
import { formatTimeStampMS, getCacheHeroInfo } from '@/utils';

const props = defineProps({
  teamId: {
    type: String,
    default: ''
  }
});

const matchOptions = reactive({
  dataList: [],
  columns: [
    { title: '比赛ID', key: 'matchId', slot: 'matchId' },
    { title: '时长', key: 'duration', slot: 'duration', width: '80px' },
    { title: '胜败', key: 'radiant_win', slot: 'radiant_win', width: '120px' },
    { title: '敌方', key: 'opposing', slot: 'opposing', width: '300px' }
  ]
});

const loading = ref(false);
const playersOptions = reactive({
  dataList: [],
  columns: [
    { title: '名称', key: 'name', slot: 'name' },
    { title: '游戏次数', key: 'games_played', width: '100px' },
    { title: '胜率', key: 'winRate', width: '70px' }
  ]
});

const heroOptions = reactive({
  dataList: [],
  columns: [
    { title: '击杀英雄', key: 'hero_id', slot: 'hero_id' },
    { title: '游戏次数', key: 'games_played', width: '100px' },
    { title: '胜率', key: 'winRate', width: '70px' }
  ]
});

const computedWin = data => {
  const { radiant, radiant_win } = data;
  if (radiant) {
    return radiant_win;
  }
  return !radiant_win;
};

const getTeamMatchList = async () => {
  const response = await getTeamMatchListAPI(props.teamId);
  const dataList = (response.data || []).slice(0, 20).map(item => {
    const { start_time, duration } = item;
    return {
      ...item,
      start_time: dayjs(start_time * 1000).format('YYYY-MM-DD'),
      winResult: computedWin(item),
      duration: formatTimeStampMS(duration)
    };
  });
  matchOptions.dataList.push(...dataList);
};

const getPlayerList = async () => {
  const response = await getTeamPlayersAPI(props.teamId);
  const dataList = (response.data || []).map(item => {
    const { account_id, wins, games_played } = item;
    return {
      ...item,
      avatar: `https://www.opendota.com/assets/images/dota2/players/${account_id}.png`,
      winRate: `${((wins / games_played) * 100).toFixed(0)}%`
    };
  });
  playersOptions.dataList.push(...dataList.filter(item => item.is_current_team_member));
};

const getHeroList = async () => {
  const response = await getTeamHeroesAPI(props.teamId);
  const dataList = (response.data || []).map(item => {
    const { wins, games_played } = item;
    const heroCN = getCacheHeroInfo(item.hero_id);
    return {
      ...item,
      heroCnName: heroCN.name_loc,
      avatar: heroCN.index_img,
      winRate: `${((wins / games_played) * 100).toFixed(0)}%`
    };
  });
  heroOptions.dataList.push(...dataList.slice(0, 10));
};

const init = async () => {
  loading.value = true;
  await getTeamMatchList();
  await getPlayerList();
  await getHeroList();
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

onMounted(() => {
  init();
});
</script>
<style lang="scss">
.overview-box {
  min-height: 40px;
  .content-box {
    display: flex;
  }
  .table {
    .ivu-table {
      border: 1px solid rgba(5, 5, 5, 0.05);
      border-bottom: none;
      .ivu-table-overflowX {
        overflow-x: hidden;
      }
    }
    .link {
      color: #2d8cf0;
      font-size: 12px;
      cursor: pointer;
    }
    .symbol {
      padding: 0 2px;
    }
    .date,
    .win-result {
      font-size: 12px;
    }
    .row-slot {
      display: flex;
      flex-direction: column;
      font-size: 12px;
    }
    .inline-logo-box {
      font-size: 12px;
      .inline-logo {
        display: inline-block;
        width: 35px;
        height: 35px;
        margin-right: 10px;
        vertical-align: middle;
        border-radius: 50%;
        background: #333;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
  .left {
    margin-right: 15px;
    width: calc(100% - 365px);
  }
  .right {
    display: flex;
    flex-direction: column;
    width: 350px;
  }
  .overview-card {
    margin-bottom: 10px;
    .title {
      font-size: 14px;
      padding-bottom: 10px;
    }
  }
}
</style>
