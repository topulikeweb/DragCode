import { IComponentType } from '../../../../type';
import { Document } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_opt, helper_Radio, helper_slider, helper_tab } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-select',
  text: 'select',
  _ID: '',
  tagIcon: Document,
  isShowPointer: false,
  _opt_: helper_opt('select选择框', 'el-option'),
  value: '',
  attrs: {
    labelWidth: helper_slider('尺寸', 30),
    fieldName: helper_Input('属性名', helper_getRandomStr()),
    label: helper_Input('label', 'select框'),
    size: helper_Radio('尺寸', [
      {
        key: 'small',
        value: 'small',
      },
      {
        key: 'medium',
        value: 'medium',
      },
      {
        key: 'large',
        value: 'large',
      },
    ]),
    option: helper_tab('option配置', 'first', 'card'),
    defaultValue: helper_Input('默认值', 1),
    require: helper_input_boolean('是否必填', false),
    rules: {
      require: helper_input_boolean('是否必填', false),
    },
  },
};
