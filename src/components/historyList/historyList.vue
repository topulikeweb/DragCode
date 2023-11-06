<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
      <li v-for="(item, index) in historyLists" :key="index" class="list-item" @click="getHistoryElements(item.elementList)">
        <div>{{ item.createTime }}</div>
        <div>{{ item.desc }}</div>
      </li>
    </ul>
    <p v-if="loading" class="loading">加载中</p>
    <p v-if="noMore" class="no-more">暂无更多</p>
  </div>
  <!--    气泡确认框-->
  <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确认清除吗？清除之后无法恢复" @confirm="clearAllHistoryList">
    <template #reference>
      <el-button class="clearBtn" type="danger"> 清空历史记录</el-button>
    </template>
  </el-popconfirm>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { IComponentType } from '../../../type';
import { Store } from '../../pinia';
import { InfoFilled } from '@element-plus/icons-vue';
import { reqClearHistoryLists } from '../../request';

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
    type: Array<any>,
    required: true,
  },
});
/**
 * 获取历史记录
 */
const getHistoryData = () => {
  if (typeof props.getHistoryList === 'function') {
    props.getHistoryList();
  }
};
/**
 * 获取单个历史记录的详细数据
 * @param item
 */
const getHistoryElements = (item: IComponentType[]) => {
  Store().updateElementList(item);
  location.reload();
};
/**
 * 清空历史记录
 */
const clearAllHistoryList = () => {
  reqClearHistoryLists()
    .then(() => {
      // 刷新数据
      getHistoryData();
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getHistoryData();
});
</script>

<style scoped>
@import './_style.scss';
</style>
