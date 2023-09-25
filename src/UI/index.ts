import { IElements } from '../../type';

export const elements: IElements = {
  base: { list: [], title: '基本组件' },
  form: { list: [], title: '表单组件' },
};
/**
 * 将base文件下的组件添加进elements/base中，方便页面遍历渲染
 */
let files: Record<string, any> = import.meta.globEager('./elements/base/*.ts');

for (const module of Object.values(files)) {
  elements.base.list.push(module.default);
}

files = import.meta.globEager('./elements/form/*.ts');

for (const module of Object.values(files)) {
  console.log(module);
  elements.form.list.push(module.default);
}
