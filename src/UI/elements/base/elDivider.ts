import { IComponentType } from '../../../../type';
import { Minus } from '@element-plus/icons-vue';
import { helper_getRandomStr } from '../../helper.ts';

export default <IComponentType>{
  _ID: helper_getRandomStr(),
  text: '分割线',
  tagIcon: Minus,
  tag: 'el-divider',
  attrs: {},
};
