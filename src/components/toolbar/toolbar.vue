<template>
  <div class="flex">
    <el-button :icon="Opportunity" size="small" class="toolbarBtn" @click="makeCode" v-loading.fullscreen.lock="fullscreenLoading">
      生成代码
    </el-button>
    <el-button :icon="Opportunity" size="small" class="toolbarBtn" @click="drawPage"> 我要绘制 </el-button>
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
    <div></div>
  </div>
</template>
<script setup lang="ts">
import { Failed, Opportunity } from '@element-plus/icons-vue';
import { Store } from '../../pinia';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElLoading, ElMessage } from 'element-plus';

const router = useRouter();
const centerDialogVisible = ref(false);
const elementList = reactive(Store().elementList);
const fullscreenLoading = ref(false);
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 2000);
};
/**
 * 清空页面上创建出来的组件
 */
const cleanAll = () => {
  if (elementList.length === 0) {
    ElMessage({
      showClose: true,
      message: '画布已经清空',
      center: true,
    });
  }
  elementList.length = 0;
  Store().updateElementList(elementList);
  centerDialogVisible.value = false;
};
const drawPage = () => {
  router.push('/drawPage');
};
/**
 * 生成代码
 */
const makeCode = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'making code for you',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  setTimeout(() => {
    loading.close();
    router.push('/codePage');
  }, 1300);
};
</script>

<style scoped>
@import './_style.scss';
</style>
