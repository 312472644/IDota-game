<template>
  <Card class="hot-match-box" title="热门赛事" :bordered="false" :dis-hover="true">
    <template #extra>
      <span class="href" @click="toAllEvent">更多</span>
    </template>
    <Spin :show="loading" class="page-loading" size="small">
      <Icon type="ios-loading" color="#808695" size="18" class="spin-icon-load"></Icon>
      <div class="loading-text">加载中...</div>
    </Spin>
    <div v-if="!loading">
      <div class="match">
        <div v-for="item in matchList" :key="item.id" class="match-item" @click="toEventDetail(item)">
          <Image width="100%" height="120px" :src="item.coverUrl">
            <template #placeholder>
              <Spin size="large" fix />
            </template>
          </Image>
          <div class="bottom">
            <div class="match-date">{{ item.startTime }} ~ {{ item.endTime }}</div>
            <div class="match-name">{{ item.eventName }}</div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { getEventListAPI } from '../api';

const loading = ref(false);
const matchList = reactive([]);
const router = useRouter();

const getMatchList = async () => {
  loading.value = true;
  const response = await getEventListAPI();
  const data = response.data?.result || [];
  matchList.push(
    ...data.slice(0, 6).map(item => {
      const { eventStartTime, eventEndTime } = item;
      return {
        ...item,
        startTime: dayjs(eventStartTime).format('YYYY-MM-DD'),
        endTime: dayjs(eventEndTime).format('YYYY-MM-DD')
      };
    })
  );
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

const toAllEvent = () => {
  router.push({ path: '/dota-data/dota-all-event' });
};

const toEventDetail = item => {
  router.push({ path: `/dota-data/dota-event-detail/${item.id}` });
};

onMounted(() => {
  getMatchList();
});
</script>
<style lang="scss">
.hot-match-box {
  .match {
    display: flex;
    align-items: center;
    .match-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 15px;
      background-color: #f8f8f9;
      border: 1px solid #ebedf2;
      border-radius: 4px;
      flex: 1;
      transition: transform 0.2s ease-in-out;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    .ivu-image-img {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .bottom {
      font-size: 13px;
      padding: 8px;
      text-align: center;
      .match-date {
        color: #808695;
      }
      .match-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
      }
    }
  }
}
</style>
