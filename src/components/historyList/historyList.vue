<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
      <li v-for="(item, index) in historyLists" :key="index" class="list-item">
        {{ item.createTime }}
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

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
const props = defineProps({
  getHistoryList: {
    type: Function,
    required: true,
  },
  historyLists: {
    type: Array,
    required: true,
  },
});
const getHistoryData = () => {
  if (typeof props.getHistoryList === 'function') {
    props.getHistoryList();
  }
};

onMounted(() => {
  getHistoryData();
});
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
