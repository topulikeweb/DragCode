import { IComponentType } from '../../../../type';
import { UploadFilled } from '@element-plus/icons-vue';
import { helper_button, helper_getRandomStr, helper_Input, helper_input_boolean, helper_Radio, helper_slider } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-upload',
  text: '上传文件',
  _ID: '',
  tagIcon: UploadFilled,
  isShowPointer: false,
  _opt_: helper_button('文本'),
  value: '',
  attrs: {
    labelWidth: helper_slider('尺寸', 30),
    fieldName: helper_Input('属性名', helper_getRandomStr()),
    label: helper_Input('label', '文件上传'),
    text: helper_Input('按钮文本', '上传文件'),
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
    action: helper_Input('后端地址', ''),
    rules: {
      require: helper_input_boolean('是否必填', false),
    },
  },
};
