<template>
  <div class="flex">
    <el-button :icon="DocumentAdd" size="small" class="toolbarBtn">生成 </el-button>
    <el-button :icon="Failed" size="small" class="toolbarBtn" @click="centerDialogVisible = true"> 清空 </el-button>
    <!--    弹出的警告-->
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" align-center>
      <span>确认清空画布吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="cleanAll"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
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
import { reactive, ref } from 'vue';

const centerDialogVisible = ref(false);
const elementList = reactive(Store().elementList);
/**
 * 清空页面上创建出来的组件
 */
const cleanAll = () => {
  elementList.length = 0;
  Store().updateElementList(elementList);
  centerDialogVisible.value = false;
};
</script>

<style scoped>
@import './_style.scss';
</style>
