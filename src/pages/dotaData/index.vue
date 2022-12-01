<template>
  <div class="dota-matches-box">
    <team-top class="card" />
    <hot-match class="card" />
  </div>
</template>
<script setup>
import teamTop from './components/teamTop.vue';
import hotMatch from './components/hotMatch.vue';
</script>
<style lang="scss">
.dota-matches-box {
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
  }
}
</style>
