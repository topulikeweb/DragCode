<template>
  <div class="flex">
    <el-button :icon="DocumentAdd" size="small" class="toolbarBtn">生成 </el-button>
    <el-button :icon="Failed" size="small" class="toolbarBtn" @click="cleanAll"> 清空 </el-button>

    <!--    <div style="display: inline-block; margin-left: 30px">-->
    <!--      <span>画布大小:</span>-->
    <!--      <el-input type="number" class="inputWith" />-->
    <!--      *-->
    <!--      <el-input type="number" class="inputWith" />-->
    <!--    </div>-->
    <!--    <div style="display: inline-block; margin-left: 30px">-->
    <!--      <span>画布比例:</span>-->
    <!--      <el-input type="number" class="inputWith" />-->
    <!--      %-->
    <!--    </div>-->
  </div>
</template>
<script setup lang="ts">
import { DocumentAdd, Failed } from '@element-plus/icons-vue';
import { Store } from '../../pinia';
import { reactive } from 'vue';

const elementList = reactive(Store().elementList);
/**
 * 清空页面上创建出来的组件
 */
const cleanAll = () => {
  elementList.length = 0;
  Store().updateElementList(elementList);
};
</script>

<style scoped>
@import './_style.scss';
</style>
