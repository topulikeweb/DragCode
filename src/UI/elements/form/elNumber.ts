import { IComponentType } from '../../../../type';
import { EditPen } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_Radio } from '../../helper.ts';

export default <IComponentType>{
  tag: 'el-input-number',
  text: '数字框',
  _ID: '',
  tagIcon: EditPen,
  value: '',
  attrs: {
    labelName: helper_Input('属性名', helper_getRandomStr()),
    formName: helper_Input('formName', '数字框'),
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
    step: helper_Input('倍数', 10),
    defaultValue: helper_Input('默认值（一定要大于设置的最小值）', 1),
    min: helper_Input('最小值', 0),
    max: helper_Input('最大值', 100),
  },
  isShowPointer: false,
};
