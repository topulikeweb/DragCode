import { IComponentType } from '../../../../type';
import { AlarmClock } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_Radio } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '时间选择器',
  tagIcon: AlarmClock,
  tag: 'el-timePicker',
  isShowPointer: false,
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
  },
};
