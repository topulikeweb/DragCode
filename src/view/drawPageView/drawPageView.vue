<template>
  <HistoryList :getHistoryList="getHistoryList" :historyLists="historyLists"></HistoryList>
  <SideMenu />
  <DrawerPage :getHistoryList="getHistoryList"></DrawerPage>
</template>

<script setup lang="ts">
import SideMenu from '../../components/sideMenu/sideMenu.vue';
import DrawerPage from '../../components/drawerPage/drawerPage.vue';
import HistoryList from '../../components/historyList/historyList.vue';
import axios from 'axios';
import { Store } from '../../pinia';
import { IHistoryList } from '../../../type';
import { ref } from 'vue';
// 历史列表数据
const historyLists = ref<Array<IHistoryList>>([]);
/**
 * 获取历史信息
 */
const getHistoryList = () => {
  axios({
    method: 'GET',
    url: 'http://127.0.0.1:3001/lists/historyLists',
    headers: {
      Authorization: Store().token,
    },
  })
    .then((res: any) => {
      // res数据类型是JSON
      try {
        historyLists.value = JSON.parse(res.data?.message[0]?.history_lists) ?? [];
      } catch (error) {
        console.error('JSON 解析错误:', error);
        historyLists.value = [];
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style></style>
