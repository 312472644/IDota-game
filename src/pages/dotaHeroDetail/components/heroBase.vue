<template>
  <div class="hero-base-container">
    <div class="base-item base-properties-box">
      <div class="hero-avatar">
        <img class="image" :src="heroInfo.index_img" />
        <div class="health-bar">
          <span class="init-value">{{ heroInfo.max_health }}</span>
          <span class="grow-value">+{{ toFixed(heroInfo.health_regen) }}</span>
        </div>
        <div class="mana-bar">
          <span class="init-value">{{ heroInfo.max_mana }}</span>
          <span class="grow-value">+{{ toFixed(heroInfo.mana_regen) }}</span>
        </div>
      </div>
      <div class="base-properties">
        <div class="property-item">
          <img src="../../../assets/images/strong.png" />
          <span class="attribute-value">{{ heroInfo.str_base }}</span>
          <span class="gain-value">+{{ toFixed(heroInfo.str_gain) }}</span>
        </div>
        <div class="property-item">
          <img src="../../../assets/images/agile.png" />
          <span class="attribute-value">{{ heroInfo.agi_base }}</span>
          <span class="gain-value">+{{ toFixed(heroInfo.agi_gain) }}</span>
        </div>
        <div class="property-item">
          <img src="../../../assets/images/intelligence.png" />
          <span class="attribute-value">{{ heroInfo.int_base }}</span>
          <span class="gain-value">+{{ toFixed(heroInfo.int_gain) }}</span>
        </div>
      </div>
    </div>
    <div class="base-item">
      <hero-position :data="heroInfo.role_levels" />
    </div>
    <div class="base-item extract-box">
      <div class="row">
        <div class="category-card">
          <div class="title">{{ heroInfo.damage_min }} - {{ heroInfo.damage_max }}</div>
          <div class="body">攻击力</div>
        </div>
        <div class="category-card">
          <div class="title">{{ toFixed(heroInfo.attack_rate) }}</div>
          <div class="body">攻击间隔</div>
        </div>
        <div class="category-card">
          <div class="title">{{ heroInfo.attack_range }}</div>
          <div class="body">攻击范围</div>
        </div>
        <div class="category-card">
          <div class="title">{{ heroInfo.projectile_speed }}</div>
          <div class="body">弹道速度</div>
        </div>
      </div>
      <div class="row">
        <div class="category-card">
          <div class="title">{{ toFixed(heroInfo.armor) }}</div>
          <div class="body">护甲</div>
        </div>
        <div class="category-card">
          <div class="title">{{ toFixed(heroInfo.magic_resistance) }}%</div>
          <div class="body">魔抗</div>
        </div>
        <div class="category-card">
          <div class="title">{{ heroInfo.movement_speed }}</div>
          <div class="body">移速</div>
        </div>
        <div class="category-card">
          <div class="title">{{ toFixed(heroInfo.turn_rate) }}</div>
          <div class="body">生命回复</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import lodash from 'lodash';
import heroPosition from './heroPosition.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});

const heroInfo = ref({});

const watchCallback = newValue => {
  heroInfo.value = lodash.cloneDeep(newValue.data);
};

const toFixed = (number = 0, decimal = 1) => {
  return parseFloat(number).toFixed(decimal) || 0;
};

watch(props, newValue => {
  watchCallback(newValue);
});
</script>
<style lang="scss">
.hero-base-container {
  display: flex;
  align-items: center;
  .base-item {
    flex: 1;
    &:first-of-type {
      border-right: 1px solid #dcdee2;
    }
  }
  .base-properties-box {
    flex: none;
    display: flex;
    justify-content: space-around;
    width: 320px;
    padding-right: 16px;
  }
  .hero-avatar {
    display: flex;
    flex-direction: column;
    width: 150px;
    .image {
      width: 150px;
      height: 85px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .health-bar {
      position: relative;
      height: 22px;
      background: linear-gradient(90deg, #286323, #7af03c);
    }
    .mana-bar {
      position: relative;
      height: 22px;
      background: linear-gradient(90deg, #1056db, #73f5fe);
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    .init-value {
      position: absolute;
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: 15px;
      text-shadow: 1px 1px 2px #000;
    }
    .grow-value {
      display: block;
      text-align: right;
      padding-right: 10px;
    }
  }
  .base-properties {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .property-item {
      display: flex;
      align-items: center;
      > img {
        width: 25px;
        height: 25px;
      }
      .attribute-value {
        color: #515a6e;
        font-size: 20px;
        font-weight: 600;
        margin-left: 12px;
      }
      .gain-value {
        color: #808695;
        font-size: 13px;
        margin-left: 8px;
        text-align: right;
      }
    }
  }
  .extract-box {
    padding: 0 10px;
    .row {
      display: flex;
      margin-bottom: 16px;
      .category-card {
        text-align: center;
        width: 25%;
        border: 1px solid #ebedf2;
        &:not(:nth-of-type(4n)) {
          margin-right: 10px;
        }
        .title {
          background: linear-gradient(-45deg, #485563 0%, #29323c 100%);
          border-radius: 4px 4px 0 0;
          color: #fff;
          font-size: 18px;
          height: 27px;
        }
        .body {
          height: 24px;
          line-height: 22px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
