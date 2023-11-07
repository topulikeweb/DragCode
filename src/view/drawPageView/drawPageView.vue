<template>
  <HistoryList :getHistoryList="getHistoryList" :historyLists="historyLists"></HistoryList>
  <SideMenu />
  <DrawerPage :getHistoryList="getHistoryList"></DrawerPage>
</template>

<script setup lang="ts">
import SideMenu from '../../components/sideMenu/sideMenu.vue';
import DrawerPage from '../../components/drawerPage/drawerPage.vue';
import HistoryList from '../../components/historyList/historyList.vue';
import { IHistoryList } from '../../../type';
import { ref } from 'vue';
import { reqHistoryLists } from '../../request';
// 历史列表数据
const historyLists = ref<Array<IHistoryList>>([]);
/**
 * 获取历史信息
 */
const getHistoryList = () => {
  reqHistoryLists()
    .then((res: any) => {
      // // res数据类型是JSON
      // try {
      //   historyLists.value = JSON.parse(res.data?.message[0]?.history_lists) ?? [];
      // } catch (error) {
      //   console.error('JSON 解析错误:', error);
      //   historyLists.value = [];
      // }
      historyLists.value = JSON.parse(res.data?.message[0]?.history_lists) ?? [];
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style></style>
