<template>
  <Card class="team-summary-box" title="战队排名Top10" :bordered="false" :dis-hover="true">
    <template #extra>
      <span class="href" @click="toAllTeam">更多</span>
    </template>
    <Spin :show="loading" class="page-loading" size="small">
      <Icon type="ios-loading" color="#808695" size="18" class="spin-icon-load"></Icon>
      <div class="loading-text">加载中...</div>
    </Spin>
    <div v-if="!loading">
      <div class="sub-title">Elo等级分排名</div>
      <div class="team">
        <div v-for="(item, index) in teamList" :key="item.team_id" class="team-item" @click="toTeamDetail(item)">
          <div class="team-rank">{{ index + 1 }}</div>
          <div class="avatar" :style="`background-image: url(${item.logo_url})`"></div>
          <div class="name">{{ item.name }}</div>
          <div class="score">等级分:{{ parseFloat(item.rating).toFixed(0) }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTeamListAPI } from '../api';

const teamList = reactive([]);
const loading = ref(false);
const router = useRouter();

const getTeamList = async () => {
  loading.value = true;
  const response = await getTeamListAPI();
  const dataList = response.data || [];
  teamList.push(...dataList.slice(0, 10));
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

const toAllTeam = () => {
  router.push({ path: '/dota-team' });
};

const toTeamDetail = item => {
  const { team_id } = item;
  router.push({ path: `/dota-team/dota-team-detail/${team_id}` });
};

onMounted(() => {
  getTeamList();
});
</script>
<style lang="scss">
.team-summary-box {
  .avatar {
    border-radius: 3px;
    width: 80px;
    height: 80px;
    margin: 12px auto 0;
    display: block;
    background: #333;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .name {
    height: 18px;
    line-height: 18px;
    margin-top: 5px;
    text-align: center;
    font-size: 13px;
    padding: 0 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bolder;
  }
  .score {
    margin-top: 4px;
    font-size: 12px;
    text-align: center;
  }
  .team {
    display: flex;
    justify-content: space-between;
    .team-item {
      width: 110px;
      height: 170px;
      background-color: #f8f8f9;
      border: 1px solid #ebedf2;
      border-radius: 4px;
      transition: transform 0.2s ease-in-out;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
      &:nth-of-type(1) .team-rank {
        color: #fff;
        background-image: linear-gradient(-39deg, #ffd500 0%, #fa0 99%);
      }
      &:nth-of-type(2) .team-rank {
        color: #fff;
        background-image: linear-gradient(135deg, #8993a6 0%, #aab3c3 100%);
      }
      &:nth-of-type(3) .team-rank {
        color: #fff;
        background-image: linear-gradient(149deg, #ff9a57 0%, #ffbb80 100%);
      }
    }
    .team-rank {
      font-style: italic;
      margin: 12px auto 0;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      width: 40px;
      text-align: center;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 0 1px 0 #ebedf2, 0 2px 4px 0 rgb(2 5 13 / 8%);
    }
  }
}
</style>
