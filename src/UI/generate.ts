import { Store } from '../pinia';
import { formConf } from './elements/form.ts';

/**
 * 转化attrs属性到组件属性
 * @param attrs
 */
export function convertAttrsToString(attrs: any) {
  const attrStrings = [] as Array<string>;
  const valueStrings = [] as Array<string>;
  const formStrings = [] as Array<string>;
  const formItemStrings = [] as Array<string>;
  // 组件属性
  for (let key in attrs) {
    if (attrs[key].el_value !== '') {
      switch (key) {
        // fieldName用于设定这个组件的属性名，因此不用放到html上
        case 'fieldName':
          break;
        case 'text':
          valueStrings.push(`${attrs[key].el_value}`);
          break;
        case 'sliderSize':
        case 'labelPosition':
          let cKey;
          if (key === 'sliderSize') {
            cKey = 'label-width';
            formStrings.push(`${cKey}="${attrs[key].el_value}"`);
          }
          if (key === 'labelPosition') {
            cKey = 'label-position';
            formStrings.push(`${cKey}="${attrs[key].el_value}"`);
          }
          break;
        case 'label':
        case 'require':
          formItemStrings.push(`${key}="${attrs[key].el_value}"`);
          break;
        default:
          attrStrings.push(`${key}="${attrs[key].el_value}"`);
      }
    }
  }
  return {
    attrStrings: attrStrings.join(' '),
    valueStrings: valueStrings.join(' '),
    formStrings: formStrings.join(' '),
    formItemStrings: formItemStrings.join(' '),
  };
}

/**
 * 解析,生成html代码
 */
export function renderHtml() {
  const HtmlElementLists = [`<template>`];
  const lists = Store().elementList;

  HtmlElementLists.push(`<el-form ${convertAttrsToString(formConf.attrs).formStrings}>`);
  for (let i = 0; i < lists.length; i++) {
    const { attrStrings, valueStrings, formItemStrings } = convertAttrsToString(lists[i].attrs);
    HtmlElementLists.push(`<el-form-item ${formItemStrings}>`);
    HtmlElementLists.push(`<${lists[i].tag} ${attrStrings}>${valueStrings}</${lists[i].tag}>`);
    HtmlElementLists.push(`</el-form-item>`);
  }
  HtmlElementLists.push(`</el-form>`);
  HtmlElementLists.push(`</template>`);
  HtmlElementLists.push(`<script lang="ts" setup>`);
  // HtmlElementLists.push(objectToJSONString(createFormData()));
  // console.log(createFormData(), 1111);
  HtmlElementLists.push(createFormData());
  HtmlElementLists.push(`</script>`);
  return HtmlElementLists;
}

/**
 * 复制代码功能
 */
export const vCode = {
  mounted(el: any) {
    //获取代码片段
    let code = el.querySelector('code.hljs');
    let pre = document.getElementsByTagName('pre')[0];
    let html = code?.innerHTML;
    let size = html.split('\n').length;
    //插入行数
    let ul = document.createElement('ul');
    for (let i = 1; i <= size; i++) {
      let li = document.createElement('li');
      li.innerText = i + '';
      ul.appendChild(li);
    }

    ul.classList.add('hljs-code-number');

    el.insertBefore(ul, pre);

    //插入复制功能
    let copy = document.createElement('div');
    copy.classList.add('hljs-copy');
    copy.innerText = '复制';
    //添加点击事件
    copy.addEventListener('click', () => {
      //创建一个输入框
      let textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.setAttribute('readonly', 'readonly');
      textarea.value = code.innerText;
      textarea.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        copy.innerText = '复制成功';
      }
      document.body.removeChild(textarea);
    });

    pre.appendChild(copy);

    //鼠标移入显示复制按钮
    el.addEventListener('mouseout', () => {
      copy.innerText = '复制';
      copy.style.display = 'none';
    });
    el.addEventListener('mouseover', () => {
      copy.style.display = 'block';
    });
  },
};

export function createFormData() {
  const lists = Store().elementList;
  // 创建一个变量名为 formConf.attrs.formModel.el_value 的对象
  const isObject: { [key: string]: { [key: string]: string } } = {
    [formConf.attrs.formModel.el_value]: {},
  };
  for (let i = 0; i < lists.length; i++) {
    let theKey = lists[i].attrs.fieldName.el_value;
    // 添加属性 theKey 到 isObject[formConf.attrs.formModel.el_value] 对象
    isObject[formConf.attrs.formModel.el_value][theKey] = '';
  }
  return `${formConf.attrs.formModel.el_value}: ${JSON.stringify(isObject[formConf.attrs.formModel.el_value], null, 2)}`;
}
