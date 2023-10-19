import { IComponentType } from '../../../../type';
import { Document } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_opt, helper_Radio, helper_tab } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-select',
  text: 'select选择',
  _ID: '',
  tagIcon: Document,
  isShowPointer: false,
  _opt_: helper_opt('select选择框', 'el-option'),
  value: '',
  attrs: {
    labelName: helper_Input('属性名', helper_getRandomStr()),
    formName: helper_Input('formName', 'select框'),
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
  },
};
