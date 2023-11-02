<template>
  <div class="modal-overlay">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/img_2.png" class="image" />
      <div style="padding: 14px">
        <span style="color: #484dff; font-size: 20px; font-weight: 550">登录入口</span>
        <div class="bottom">
          <div class="inputBox">
            <span>username:</span>
            <el-input style="margin-left: 40px" v-model="userInfo.password"></el-input>
          </div>
          <div class="inputBox">
            <span>password:</span>
            <el-input style="margin-left: 40px" v-model="userInfo.username" type="password"></el-input>
          </div>

          <div class="inputBox">
            <el-button @click="login">登录</el-button>
            <div class="registerBox" @click="router.push('/register  ')">没有账号?去注册</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Store } from '../../pinia';
import router from '../../router/index.ts';

let userInfo = reactive({
  username: '',
  password: '',
});
/**
 * 登录
 */
const login = () => {
  axios({
    method: 'POST',
    url: 'http://127.0.0.1:3001/api/login',
    data: userInfo,
    headers: {
      'Content-Type': 'application/json', // 指定请求头的 Content-Type 为 JSON
    },
  })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: res.data.message + ', token已更新',
        center: true,
        type: 'success',
      });
      // 更新token
      Store().updateToken(res.data.token);
      router.push('/drawPageView');
    })
    .catch((error) => {
      console.log(error);
      ElMessage({
        showClose: true,
        message: error,
        center: true,
        type: error,
      });
    });
};
</script>

<style scoped>
@import './_style.scss';
</style>
