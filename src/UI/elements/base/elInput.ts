import { IComponentType } from '../../../../type';
import { Edit } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_slider } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '输入框',
  tagIcon: Edit,
  tag: 'el-input',
  isShowPointer: false,
  value: '',
  attrs: {
    fieldName: helper_Input('属性名', helper_getRandomStr()),
    label: helper_Input('label', 'input输入框'),
    labelWidth: helper_slider('尺寸', 30),
    defaultValue: helper_Input('默认值', ''),
    placeholder: helper_Input('placeholder', ''),
    require: helper_input_boolean('是否必填', false),
    rules: {
      // message: helper_Input('错误弹出文字', 'Please input your value'),
      // trigger: helper_Radio('触发时机', [
      //   {
      //     key: 'blur',
      //     value: 'blur',
      //   },
      //   {
      //     key: 'change',
      //     value: 'change',
      //   },
      // ]),
      require: helper_input_boolean('是否必填', false),
      min: helper_Input('最小长度', 0),
      max: helper_Input('最大长度', 10),
    },
  },
};
