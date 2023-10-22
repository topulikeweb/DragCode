import { IComponentType } from '../../../../type';
import { Pointer } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_opt, helper_Radio, helper_tab } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '单选框',
  tagIcon: Pointer,
  tag: 'el-radio-group',
  isShowPointer: false,
  _opt_: helper_opt('单选框', 'el-radio'),
  value: '',
  attrs: {
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
    require: helper_input_boolean('是否必填', false),
    fieldName: helper_Input('属性名', helper_getRandomStr()),
  },
};
