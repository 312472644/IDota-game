<template>
  <div v-if="showTop" class="scroll-top" @click="scrollTop"></div>
</template>
<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';

const props = defineProps({
  scrollTop: {
    type: Number,
    default: 500
  }
});
const showTop = ref(false);

const scrollEvent = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  showTop.value = scrollTop > props.scrollTop;
};

const scrollTop = () => {
  document.body.scrollIntoView({
    behavior: 'smooth'
  });
};

const eventListen = () => {
  document.addEventListener('scroll', scrollEvent);
};

onMounted(() => {
  eventListen();
});

onBeforeUnmount(() => {
  document.removeEventListener('scroll', scrollEvent);
});
</script>
<style lang="scss">
.scroll-top {
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 50px;
  background: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #ebedf2;
  background-image: url('../../assets/images/et-rocket.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
