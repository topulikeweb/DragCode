<template>
  <div class="modal-overlay">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/img_1.png" class="image" />
      <div style="padding: 14px">
        <span style="color: #d07b34; font-size: 20px; font-weight: 550">注册</span>
        <div class="bottom">
          <div class="inputBox">
            <span>username:</span>
            <el-input style="margin-left: 40px" v-model="userInfo.username"></el-input>
          </div>
          <div class="inputBox">
            <span>password:</span>
            <el-input style="margin-left: 40px" v-model="userInfo.password" type="password"></el-input>
          </div>
          <div class="inputBox">
            <el-button @click="router.push('/login')"> 去登录</el-button>
            <el-button @click="register">确认</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import router from '../../router/index.ts';
import { reqRegister } from '../../request';

let userInfo = reactive({
  username: '',
  password: '',
});
/**
 * 注册
 */
const register = () => {
  reqRegister(userInfo)
    .then((res) => {
      ElMessage({
        showClose: true,
        message: res.data.message,
        center: true,
      });
    })
    .catch((error) => {
      console.log(error);
      ElMessage({
        showClose: true,
        message: error,
        center: true,
        type: 'error',
      });
    });
};
</script>

<style scoped>
@import './_style.scss';
</style>
