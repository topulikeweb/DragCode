<template>
  <div class="container">
    <div class="topContainer">
      <Toolbar />
      <el-switch @change="handleToggleDark" v-model="theme" active-text="light" inactive-text="dark"></el-switch>
    </div>
    <SideMenu v-if="isShow" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { ref } from 'vue';
import Toolbar from './components/toolbar/toolbar.vue';
import SideMenu from './components/sideMenu/sideMenu.vue';
import router from './router';

const isShow = ref(false);

let theme = ref<boolean>(false);
const isDark = useDark();
const toggleDark = useToggle(isDark);

/**
 * 定义路由拦截器来判断是否显示SideMenu
 */
router.beforeEach((to, from, next) => {
  isShow.value = to.path !== '/codePage';
  next();
});
// 定义一个事件处理函数，内部调用 toggleDark
const handleToggleDark = () => {
  theme.value = isDark.value;
  toggleDark();
};
</script>

<style>
@import './styles/_style.scss';
</style>
