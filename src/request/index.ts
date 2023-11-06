import axiosInstance from './request.ts';
import { Store } from '../pinia';

/**
 * 登录接口
 * @param userInfo
 */
export const reqLogin = (userInfo: Record<string, any>) => {
  return axiosInstance({
    method: 'POST',
    url: 'http://127.0.0.1:3001/api/login',
    data: userInfo,
    headers: {
      'Content-Type': 'application/json', // 指定请求头的 Content-Type 为 JSON
    },
  });
};
/**
 * 注册接口
 * @param userInfo
 */
export const reqRegister = (userInfo: Record<string, any>) => {
  return axiosInstance({
    method: 'POST',
    url: 'http://127.0.0.1:3001/api/register',
    data: userInfo,
    headers: {
      'Content-Type': 'application/json', // 指定请求头的 Content-Type 为 JSON
    },
  });
};
/**
 * 删除所有历史记录
 */
export const reqClearHistoryLists = () => {
  return axiosInstance({
    method: 'PATCH',
    url: 'http://127.0.0.1:3001/lists/clearAllHistoryLists',
    headers: {
      Authorization: Store().token,
    },
  });
};

export const reqFinishDraw = (desc: string) => {
  return axiosInstance({
    method: 'POST',
    url: 'http://127.0.0.1:3001/lists/updateHistory_lists',
    data: {
      elementList: Store().elementList,
      desc: desc,
    },
    headers: {
      Authorization: Store().token,
    },
  });
};
