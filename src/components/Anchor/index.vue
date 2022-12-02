<template>
  <div class="anchor-container">
    <ul>
      <li
        v-for="item in anchorList"
        :key="item.name"
        :class="['anchor-link', activeAnchor === item.name ? 'active' : '']"
      >
        <a href="javascript:void(0)" @click="clickEvent(item)">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { throttle } from '@/utils';

const props = defineProps({
  anchorList: {
    type: Array,
    default: () => []
  }
});

const activeAnchor = ref(props.anchorList[0].name);
const anchorPositionList = [];
let anchorTrigger = false;

const setAnchorPosition = () => {
  const clientRect = document.querySelector('.wrap').getBoundingClientRect();
  const anchorDom = document.querySelector('.anchor-container');
  if (clientRect) {
    const { left, width } = clientRect;
    const fixedLeft = left + width;
    anchorDom.style = `left:${fixedLeft}px`;
  }
};

const getAnchorPosition = () => {
  const anchorDom = document.querySelectorAll('.anchor-card');
  if (anchorDom.length > 0) {
    const anchorDomList = Array.from(anchorDom).map(item => {
      const id = item.getAttribute('id');
      const rects = item.getBoundingClientRect();
      return { name: id, top: rects.top };
    });
    anchorPositionList.push(...anchorDomList);
  }
};

const clickEvent = item => {
  const anchorDom = document.querySelector(`#${item.name}`);
  if (anchorDom) {
    anchorDom.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    activeAnchor.value = item.name;
    anchorTrigger = true;
    // 模拟滚动条已经滚动完成
    setTimeout(() => {
      anchorTrigger = false;
    }, 1000);
  }
};

const scrollEvent = () => {
  // 锚链接会触发scroll事件，a标签点击时不走该方法
  if (anchorTrigger) {
    return;
  }
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const currentAnchor = anchorPositionList.filter(item => item.top > scrollTop) || [];
  if (currentAnchor.length > 0) {
    activeAnchor.value = currentAnchor[0].name;
  }
};

const eventListen = () => {
  document.addEventListener('scroll', throttle(scrollEvent, 50));
};

onMounted(() => {
  setAnchorPosition();
  getAnchorPosition();
  eventListen();
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', throttle(scrollEvent, 50));
});
</script>
<style lang="scss">
.anchor-container {
  position: fixed;
  top: 70px;
  width: 120px;
  margin-left: 10px;
  background: #fff;
  padding: 10px;
  border-radius: 3px;
  .anchor-link {
    position: relative;
    padding: 0 0 8px 16px;
    transition: all 0.1s ease-in-out;
    &:last-of-type {
      padding-bottom: 0;
    }
    &.active {
      color: #2d8cf0;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 2px solid #2d8cf0;
      }
    }
    a {
      color: inherit;
      font-size: 12px;
    }
  }
}
</style>
