import { IComponentType } from '../../../../type';
import { Edit } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_slider } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '输入框',
  tagIcon: Edit,
  tag: 'el-input',
  isShowPointer: false,
  value: '',
  attrs: {
    labelName: helper_Input('属性名', helper_getRandomStr()),
    formName: helper_Input('formName', 'input输入框'),
    sliderSize: helper_slider('尺寸', 30),
    placeholder: helper_Input('placeholder', ''),
  },
};
