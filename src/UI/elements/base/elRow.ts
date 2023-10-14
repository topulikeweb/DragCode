import { IComponentType } from '../../../../type';
import { Grid } from '@element-plus/icons-vue';
import { helper_slider } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '间距',
  tagIcon: Grid,
  tag: 'el-space',
  isShowPointer: false,
  attrs: {
    sliderSize: helper_slider('尺寸', 30),
  },
};
