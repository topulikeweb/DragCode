import { v4 as uuidv4 } from 'uuid';

/**
 * 帮助处理radio类型的选项
 * @param title
 * @param options
 */
export const helper_Radio = function (title: string, options: Array<Record<string, string>>) {
  return {
    tag: 'el-radio-button',
    title,
    options,
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

export const helper_opt = function (label: string, tag: string) {
  return {
    label,
    _val_: optValue(tag),
    input_type: 'input_opt',
  };
};
/**
 * checkbox的默认配置
 * @param tag
 */
const optValue = function (tag: string) {
  return {
    type: 'static',
    tag: tag,
    staticData: [
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
