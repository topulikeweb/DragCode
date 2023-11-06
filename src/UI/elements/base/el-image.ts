import { IComponentType } from '../../../../type';
import { Grid } from '@element-plus/icons-vue';
import { helper_getRandomStr, helper_Input, helper_input_boolean, helper_Radio, helper_slider } from '../../helper.ts';

export default <IComponentType>{
  _ID: '',
  text: '图片',
  tagIcon: Grid,
  tag: 'el-image',
  isShowPointer: false,
  value: '',
  attrs: {
    labelWidth: helper_slider('尺寸', 30),
    src: helper_Input('图片地址（http/https）', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'),
    fit: helper_Radio('fit', [
      {
        key: 'fill',
        value: 'fill',
      },
      {
        key: 'contain',
        value: 'contain',
      },
      {
        key: 'cover',
        value: 'cover',
      },
      {
        key: 'none',
        value: 'none',
      },
      {
        key: 'scale-down',
        value: 'scale-down',
      },
    ]),
    fieldName: helper_Input('属性名', helper_getRandomStr()),
    width: helper_Input('宽度', 200),
    height: helper_Input('高度', 200),
    lazy: helper_input_boolean('是否开启懒加载', false),
    url: helper_Input('后端接口地址', ''),
  },
};
