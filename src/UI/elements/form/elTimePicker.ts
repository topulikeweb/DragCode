import { IComponentType } from '../../../../type';
import { AlarmClock } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_Radio } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '时间选择器',
  tagIcon: AlarmClock,
  tag: 'el-timePicker',
  isShowPointer: false,
  value: '',
  attrs: {
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
    require: helper_input_boolean('是否必填', false),
  },
};
