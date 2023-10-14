import { IComponentType } from '../../../../type';
import { Document } from '@element-plus/icons-vue';
import { helper_opt, helper_Radio } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-select',
  text: 'select选择',
  _ID: '',
  tagIcon: Document,
  isShowPointer: false,
  _opt_: helper_opt('select选择框', 'el-option'),
  attrs: {
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
  },
};
