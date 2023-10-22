import { IComponentType } from '../../../../type';
import { Grid } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_slider } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '间距',
  tagIcon: Grid,
  tag: 'el-space',
  isShowPointer: false,
  value: '',
  attrs: {
    labelWidth: helper_slider('尺寸', 30),
    require: helper_input_boolean('是否必填', false),
  },
};
