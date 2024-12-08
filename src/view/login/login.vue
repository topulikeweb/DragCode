<template>
  <div class="modal-overlay">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/img_2.png" class="image" />
      <div style="padding: 14px">
        <span
          style="color: #484dff; font-size: 20px; font-weight: 550">登录入口</span>
        <div class="bottom">
          <div class="inputBox">
            <span>username:</span>
            <el-input style="margin-left: 40px"
                      v-model="userInfo.username"></el-input>
          </div>
          <div class="inputBox">
            <span>password:</span>
            <el-input style="margin-left: 40px" v-model="userInfo.password"
                      type="password"></el-input>
          </div>

          <div class="inputBox">
            <el-button @click="login">登录</el-button>
            <div class="registerBox" @click="router.push('/register')">
              没有账号?去注册
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Store } from '../../pinia';
import router from '../../router/index.ts';
import { reqLogin } from '../../request';

let userInfo = reactive({
  username: '',
  password: '',
});

/**
 * 更新token
 */
const updateToken = (token: string) => {
  // 更新token
  Store().updateToken(token);
  router.push('/drawPageView');
  // 存入token创建的时间
  localStorage.setItem('tokenCreationTime', JSON.stringify(Date.now()));
  // 存入用户信息
  Store().updateUserInfo(userInfo);
};


/**
 * 登录
 */
const login = () => {
  reqLogin(userInfo)
    .then((res) => {
      ElMessage({
        showClose: true,
        message: res.data.message + ', token已更新',
        center: true,
        type: 'success',
      });
      updateToken(res.data.token);
    })
    .catch((error) => {
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
