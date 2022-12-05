<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <we-chat-bar-code />
</template>
