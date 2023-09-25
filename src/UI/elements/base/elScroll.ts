import { IComponentType } from '../../../../type';
import { DCaret } from '@element-plus/icons-vue';
import { helper_getRandomStr } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-scrollbar',
  text: '滚动条',
  _ID: helper_getRandomStr(),
  tagIcon: DCaret,
  attrs: {},
};
