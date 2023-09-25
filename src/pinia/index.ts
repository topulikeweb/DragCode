import { defineStore } from 'pinia';
import { IComponentType } from '../../type';

export const Store = defineStore('elementList', {
  state: () => ({
    elementList: JSON.parse((localStorage.getItem('elementList') as string) ?? '[]') as IComponentType[],
  }),
  getters: {},
  actions: {
    /**
     * 更新elementList中的数据
     * @param elementList
     */
    updateElementList(elementList: IComponentType[]) {
      localStorage.setItem('elementList', JSON.stringify(elementList));
    },
  },
});
