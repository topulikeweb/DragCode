import { IComponentType } from '../../../../type';
import { CircleCheck } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_opt } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-checkbox-group',
  text: '复选框',
  _ID: helper_getRandomStr(),
  defaultValue: '',
  tagIcon: CircleCheck,
  _opt_: helper_opt('选项框', 'el-checkbox-button'),
  attrs: {},
};
