<template>
  <div class="team-bg-box">
    <div class="team-avatar" :style="`background-image:url(${teamInfo.logo_url})`"></div>
    <div class="team-summary">
      <div class="team-name">
        <div>{{ teamInfo.name }}</div>
      </div>
      <div class="team-detail">
        <div class="team-detail-item">
          <span class="team-item-label">胜</span>
          <span class="team-item-value win">{{ teamInfo.wins }}</span>
        </div>
        <div class="team-detail-item">
          <span class="team-item-label">败</span>
          <span class="team-item-value lose">{{ teamInfo.losses }}</span>
        </div>
        <div class="team-detail-item">
          <span class="team-item-label">等级分</span>
          <span class="team-item-value">{{ parseInt(teamInfo.rating) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getTeamDetailAPI } from '../api';

const props = defineProps({
  teamId: {
    type: String,
    default: ''
  }
});

const teamInfo = ref({});
const getTeamDetail = async () => {
  const response = await getTeamDetailAPI(props.teamId);
  teamInfo.value = response.data || {};
};

onMounted(() => {
  getTeamDetail();
});
</script>
<style lang="scss">
.team-bg-box {
  padding: 20px;
  display: flex;
  .team-avatar {
    width: 80px;
    height: 80px;
    border-radius: 3px;
    background: #333;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .team-summary {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
    .team-name {
      font-size: 20px;
    }
    .team-detail {
      display: flex;
      .team-detail-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50px;
        .team-item-label {
          font-size: 12px;
        }
        .team-item-value {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
