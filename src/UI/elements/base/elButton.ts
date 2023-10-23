import { IComponentType } from '../../../../type';
import { Files } from '@element-plus/icons-vue';
import { helper_Input, helper_input_boolean, helper_Radio } from '../../helper.ts';
import { Star, Check, Message, Delete, Edit } from '@element-plus/icons-vue';

export default <IComponentType>{
  _ID: '',
  tag: 'el-button',
  text: '按钮',
  tagIcon: Files,
  // input_text: helper_Input('按钮文本', '点击'),
  // input_key: helper_Input('属性名', `button`),
  value: '',
  isShowPointer: false,
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
    text: helper_Input('按钮文本', '提交'),
    type: helper_Radio('类型', [
      {
        key: 'primary',
        value: 'primary',
      },
      {
        key: 'success',
        value: 'success',
      },
      {
        key: 'warning',
        value: 'warning',
      },
      {
        key: 'danger',
        value: 'danger',
      },
      {
        key: 'info',
        value: 'info',
      },
      {
        key: 'text',
        value: 'text',
      },
      {
        key: '清除',
        value: '',
      },
    ]),
    icon: helper_Radio('图标', [
      {
        key: 'Edit',
        value: Edit,
      },
      {
        key: 'Check',
        value: Check,
      },
      {
        key: 'Message',
        value: Message,
      },
      {
        key: 'Star',
        value: Star,
      },
      {
        key: 'Delete',
        value: Delete,
      },
      {
        key: '清除',
        value: '',
      },
    ]),
    switch: helper_input_boolean('是否为圆角', false),
    require: helper_input_boolean('是否必填', false),
  },
};
