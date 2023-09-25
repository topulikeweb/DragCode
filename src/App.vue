<template>
  <div class="container">
    <div class="topContainer">
      <Toolbar />
      <el-switch
        @change="handleToggleDark"
        v-model="theme"
        active-text="light"
        inactive-text="dark"
      ></el-switch>
    </div>
    <SideMenu />
    <DrawerPage />
    <AttrsMenus />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { ref } from 'vue';
import Toolbar from './components/toolbar/toolbar.vue';
import SideMenu from './components/sideMenu/sideMenu.vue';
import DrawerPage from './components/drawerPage/drawerPage.vue';
import AttrsMenus from './components/attrsMenus/attrsMenus.vue';

let theme = ref<boolean>(false);
const isDark = useDark();
const toggleDark = useToggle(isDark);

// 定义一个事件处理函数，内部调用 toggleDark
const handleToggleDark = () => {
  theme.value = isDark.value;
  toggleDark();
};
</script>

<style>
@import './styles/_style.scss';
</style>
