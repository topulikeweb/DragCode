import { defineStore } from "pinia";
import { IComponentType } from "../../type";


export const Store = defineStore("elementList", {
  state: () => ({
    elementList: JSON.parse((localStorage.getItem("elementList") as string) ?? "[]") as IComponentType[],
    componentDetail: JSON.parse((localStorage.getItem("componentDetail") as string) ?? "[]") as IComponentType,
    index: JSON.parse(localStorage.getItem("index") ?? "0") as Number
  }),
  getters: {},
  actions: {
    /**
     * 更新elementList中的数据
     * @param elementList
     * @type IComponentType[]
     */
    updateElementList(elementList: IComponentType[]) {
      localStorage.setItem("elementList", JSON.stringify(elementList));
    },
    /**
     * 更新侧边组件详情的数据
     * @param componentDetail
     * @type IComponentType
     */
    updateComponentDetail(componentDetail: IComponentType) {
      localStorage.setItem("componentDetail", JSON.stringify(componentDetail));
    },
    /**
     * 将当前点击的elementItem的索引存放到localStorage中
     */
    findIndexElementItem(elementItem: IComponentType) {
      let index = this.elementList.findIndex((item) => {
        return item._ID === elementItem._ID;
      });
      localStorage.setItem("index", JSON.stringify(index));
    }
  }
});
