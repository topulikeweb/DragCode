import { IComponentType } from '../../../../type';
import { DCaret } from '@element-plus/icons-vue';
import { helper_input_boolean } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-scrollbar',
  text: '滚动条',
  _ID: '',
  tagIcon: DCaret,
  isShowPointer: false,
  attrs: {
    require: helper_input_boolean('是否必填', false),
  },
  value: '',
};
