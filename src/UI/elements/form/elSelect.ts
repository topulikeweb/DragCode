import { IComponentType } from '../../../../type';
import { Document } from '@element-plus/icons-vue';
import { helper_opt } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-select',
  text: 'select选择',
  _ID: '',
  defaultValue: '',
  tagIcon: Document,
  isShowPointer: false,
  _opt_: helper_opt('select选择框', 'el-option'),
  attrs: {},

  style: {
    size: 'small',
  },
};
