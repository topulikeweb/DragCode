import { IComponentType } from '../../../../type';
import { Minus } from '@element-plus/icons-vue';
import { helper_Input, helper_input_boolean, helper_Radio } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '分割线',
  tagIcon: Minus,
  tag: 'el-divider',
  isShowPointer: false,
  value: '',
  attrs: {
    divider_Value: helper_Input('文本', '分割线'),
    position: helper_Radio('位置', [
      {
        key: 'left',
        value: 'left',
      },
      {
        key: 'center',
        value: 'center',
      },
      {
        key: 'right',
        value: 'right',
      },
    ]),
    require: helper_input_boolean('是否必填', false),
  },
};
