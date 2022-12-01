<template>
  <div class="dota-data-box">
    <team-top class="card" />
    <rank-top class="card" />
    <hot-match class="card" />
  </div>
</template>
<script setup>
import teamTop from './components/teamTop.vue';
import hotMatch from './components/hotMatch.vue';
import rankTop from './components/rankTop.vue';
</script>
<style lang="scss">
.dota-data-box {
  .card {
    margin-bottom: 15px;
    .ivu-card-head {
      span {
        color: #515a6e;
      }
    }
    .ivu-card-body {
      min-height: 70px;
    }
    .sub-title {
      color: #999fad;
      font-size: 12px;
      padding-bottom: 8px;
    }
    .href {
      color: #808695;
      cursor: pointer;
    }
    .rank-item {
      &:nth-of-type(1) .rank-no {
        color: #fff;
        background-image: linear-gradient(-39deg, #ffd500 0%, #fa0 99%);
      }
      &:nth-of-type(2) .rank-no {
        color: #fff;
        background-image: linear-gradient(135deg, #8993a6 0%, #aab3c3 100%);
      }
      &:nth-of-type(3) .rank-no {
        color: #fff;
        background-image: linear-gradient(149deg, #ff9a57 0%, #ffbb80 100%);
      }
    }
    .rank-no {
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
    }
  }
}
</style>
