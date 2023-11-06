import { IComponentType } from '../../../../type';
import { AlarmClock } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_Radio, helper_slider } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: 'time',
  tagIcon: AlarmClock,
  tag: 'el-timePicker',
  isShowPointer: false,
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
    rules: {
      require: helper_input_boolean('是否必填', false),
    },
  },
};
