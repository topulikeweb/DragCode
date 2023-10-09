import { v4 as uuidv4 } from 'uuid';

/**
 * 帮助处理radio类型的选项
 * @param title
 * @param options
 */
export const helper_Radio = function (label: string, options: Array<Record<string, string>>) {
  const _opt_ = {
    _val_: {
      tag: 'el-radio-button',
      staticData: options,
    },
  };
  return {
    tag: 'el-radio-group',
    label,
    // 这个是很重要的数据，每个组件都挂载了，用于menuConf控制画布上组件的属性值
    el_value: 'small',
    _opt_,
  };
};
/**
 * 帮助处理input框类型的选项
 * @param label
 * @param value
 */
export const helper_Input = function (label: string, value: string) {
  return {
    tag: 'el-input',
    label,
    value,
  };
};
/**
 * 获取随机字符串-工具函数
 */
export const helper_getRandomStr = function () {
  return uuidv4().slice(0, 3);
};

export const helper_opt = function (label: string, tag: string, option?: Array<any>) {
  return {
    label,
    _val_: optValue(tag, option),
    input_type: 'input_opt',
  };
};
/**
 * checkbox的默认配置
 * @param tag
 */
const optValue = function (tag: string, option?: Array<any>) {
  return {
    type: 'static',
    tag: tag,
    staticData: option ?? [
      {
        key: '选项一',
        value: 1,
      },
      {
        key: '选项二',
        value: 2,
      },
    ],
    dynamicData: {
      url: 'http://',
      method: 'post',
      keyName: 'keyName',
      valueName: 'valueName',
    },
  };
};

/**
 * 对switch组件的配置
 */

export const helper_input_boolean = function (label: string, value: any) {
  return {
    tag: 'el-switch',
    value,
    label,
  };
};
