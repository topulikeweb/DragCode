import { IComponentType } from '../../../../type';
import { Grid } from '@element-plus/icons-vue';
import { helper_getRandomStr } from '../../helper.ts';

export default <IComponentType>{
  _ID: helper_getRandomStr(),
  text: '间距',
  tagIcon: Grid,
  tag: 'el-space',
  attrs: {},
};
