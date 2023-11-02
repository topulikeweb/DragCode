<template>
  <div class="flex">
    <el-button :icon="Opportunity" size="small" class="toolbarBtn" @click="makeCode" v-loading.fullscreen.lock="fullscreenLoading"> 生成代码 </el-button>
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
    <el-popconfirm title="确认退出登录？" @confirm="logout" confirm-button-text="是的" cancel-button-text="不用">
      <template #reference>
        <el-button size="small" style="margin-left: 400px; background-color: #007aff; color: #ffffff" class="toolbarBtn"> 退出登录 </el-button>
      </template>
    </el-popconfirm>
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
  Store().updateFromData();
  Store().updateRules();
  centerDialogVisible.value = false;
};
const drawPage = () => {
  router.push('/drawPageView');
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

const logout = () => {
  localStorage.removeItem('token');
  ElMessage({
    showClose: true,
    message: '退出登录成功，token已清空',
    center: true,
    type: 'success',
  });
  router.push('/login');
};
</script>

<style scoped>
@import './_style.scss';
</style>
