import { helper_Input, helper_Radio } from '../helper.ts';

/**
 * 表单属性
 */
export const formConf = {
  tag: 'el-form',
  props: {},
  childrens: [],
  __rules: {},
  attrs: {
    __formRef: helper_Input('表单名', 'refForm'),
    __formModel: helper_Input('表单模型', 'formData'),
    size: helper_Radio(
      '表单尺寸',
      [
        {
          key: 'medium',
          value: '中等',
        },
        {
          key: 'small',
          value: '较小',
        },
        {
          key: 'mini',
          value: '迷你',
        },
      ],
      'medium',
    ),
    labelPosition: helper_Radio(
      '标签对齐',
      [
        {
          key: 'right',
          value: '右对齐',
        },
        {
          key: 'left',
          value: '右对齐',
        },
        {
          key: 'top',
          value: '顶部对齐',
        },
      ],
      'right',
    ),
    // disabled:help('禁用', false),
    // inline: helper.input_boolean('行内模式', false),
    // hideRequiredAsterisk: helper.input_boolean('必填标星', false),
    // __formBtns: helper.input_boolean('是否显示按钮', true),
  },
};
