<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
      <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import axios from 'axios';
import { Store } from '../../pinia';

const count = ref(10);
const loading = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
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
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

getHistoryList();
</script>

<style>
.infinite-list-wrapper {
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: row;
  width: 200px;
}

.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 200px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>
