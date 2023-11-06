import axios from 'axios';
import router from '../router/index.ts';
import { Store } from '../pinia';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

/**
 * 请求拦截器，用于判断token是否过期
 */
axiosInstance.interceptors.request.use(
  (config) => {
    console.info('拦截器生效');
    // 获取用户的令牌
    const token = Store().token;
    if (token) {
      if (isTokenExpired()) {
        // 如果过期则跳转回登录界面
        router.push('/login');
      }
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

function isTokenExpired() {
  try {
    // 从本地存储中获取 token 的创建时间
    const tokenCreationTime = JSON.parse(localStorage.getItem('tokenCreationTime') ?? '');
    if (!tokenCreationTime) return true;

    // 检查是否已经过去2小时
    const currentTime = Date.now();
    return currentTime - parseInt(tokenCreationTime) > 60 * 60 * 1000;
  } catch (error) {
    return true; // 出现错误，视为已过期
  }
}

export default axiosInstance;
