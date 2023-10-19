import { helper_Input, helper_Radio, helper_slider } from '../helper.ts';

/**
 * 表单属性
 */
export const formConf = {
  tag: 'el-form',
  props: {},
  __rules: {},
  attrs: {
    formRef: helper_Input('表单名', 'refForm'),
    formModel: helper_Input('表单总参数', 'formData'),
    sliderSize: helper_slider('表单位置', 20),
    labelPosition: helper_Radio('表单对齐方式', [
      {
        key: '右对齐',
        value: 'right',
      },
      {
        key: '左对齐',
        value: 'left',
      },
      {
        key: '顶部对齐',
        value: 'top',
      },
    ]),
    // disabled:help('禁用', false),
    // inline: helper.input_boolean('行内模式', false),
    // hideRequiredAsterisk: helper.input_boolean('必填标星', false),
    // __formBtns: helper.input_boolean('是否显示按钮', true),
  },
};
