import { defineStore } from 'pinia';
import { IComponentType } from '../../type';
import { formConf } from '../UI/elements/form.ts';

export const Store = defineStore('elementList', {
  state: () => ({
    elementList: JSON.parse((localStorage.getItem('elementList') as string) ?? '[]') as IComponentType[],
    componentDetail: JSON.parse((localStorage.getItem('componentDetail') as string) ?? '[]') as IComponentType,
    index: JSON.parse(localStorage.getItem('index') ?? '0') as Number,
    formData: JSON.parse(<string>localStorage.getItem('formData') ?? '{}') as Object,
    rules: JSON.parse(<string>localStorage.getItem('rules') ?? '{}') as Object,
    token: JSON.parse(<string>localStorage.getItem('token')) ?? undefined,
    userInfo: JSON.parse(<string>localStorage.getItem('userInfo') ?? '{}') as Object,
  }),
  getters: {},
  actions: {
    /**
     * 更新elementList中的数据
     * @param elementList
     * @type IComponentType[]
     */
    updateElementList(elementList: IComponentType[]) {
      this.elementList = elementList;
      localStorage.setItem('elementList', JSON.stringify(elementList));
    },
    /**
     * 更新侧边组件详情的数据
     * @param componentDetail
     * @type IComponentType
     */
    updateComponentDetail(componentDetail: IComponentType) {
      localStorage.setItem('componentDetail', JSON.stringify(componentDetail));
    },
    /**
     * 将当前点击的elementItem的索引存放到localStorage中
     */
    findIndexElementItem(elementItem: IComponentType) {
      let index = this.elementList.findIndex((item) => {
        return item._ID === elementItem._ID;
      });
      localStorage.setItem('index', JSON.stringify(index));
    },
    updateToken(token: string) {
      localStorage.setItem('token', JSON.stringify(token));
    },
    /**
     * 创建出formData，并更新到本地
     */
    updateFromData() {
      const newElementList: IComponentType[] = JSON.parse(JSON.stringify(this.elementList));
      // 创建一个变量名为 formConf.attrs.formModel.el_value 的对象
      const isObject: { [key: string]: { [key: string]: string } } = {
        [formConf.attrs.formModel.el_value]: {},
      };
      for (let i = 0; i < newElementList.length; i++) {
        const theKey = (newElementList[i].attrs.fieldName && newElementList[i].attrs.fieldName.el_value) ?? '';
        if (theKey !== '') {
          const default_value = (newElementList[i].attrs.defaultValue && newElementList[i].attrs.defaultValue.el_value) ?? '';
          // 添加属性 theKey 到 isObject[formConf.attrs.formModel.el_value] 对象
          isObject[formConf.attrs.formModel.el_value][theKey] = JSON.parse(JSON.stringify(default_value));
        }
      }
      localStorage.setItem('formData', JSON.stringify(isObject[formConf.attrs.formModel.el_value]));
      console.log('formData更新！');
    },
    /**
     * 创建规则,并更新到本地
     */
    updateRules() {
      const newElementList: IComponentType[] = JSON.parse(JSON.stringify(this.elementList));
      console.log(newElementList);
      const rules = {} as any;
      for (let i = 0; i < newElementList.length; i++) {
        const rulesFiledName = [];
        let minMaxObject = {} as any; // 创建一个对象来存储 min 和 max 属性
        if (newElementList[i] && newElementList[i].attrs && newElementList[i].attrs.rules) {
          for (const key in newElementList[i].attrs.rules) {
            if (newElementList[i].attrs.rules.hasOwnProperty(key)) {
              if (key === 'min' || key === 'max') {
                minMaxObject[key] = newElementList[i].attrs.rules[key].el_value;
                minMaxObject['message'] = 'You broke the rules';
                minMaxObject['trigger'] = 'blur';
              } else {
                let rulesItemObj = {} as any;
                rulesItemObj[key] = newElementList[i].attrs?.rules[key].el_value;
                rulesItemObj['message'] = 'You broke the rules';
                rulesItemObj['trigger'] = 'blur';
                rulesFiledName.push(rulesItemObj);
              }
            }
          }
        }
        if (Object.keys(minMaxObject).length > 0) {
          rulesFiledName.push(minMaxObject); // 将包含 min 和 max 属性的对象添加到数组
        }
        if (rulesFiledName.length !== 0) {
          rules[(newElementList[i].attrs.fieldName && newElementList[i].attrs.fieldName.el_value) ?? ''] = rulesFiledName;
        }
      }
      this.rules = rules;
      localStorage.setItem('rules', JSON.stringify(this.rules));
      console.log('rules发生更新');
    },
    updateUserInfo(userInfo: Record<string, any>) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
  },
});
