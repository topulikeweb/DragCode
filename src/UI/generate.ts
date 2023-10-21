import { Store } from '../pinia';

/**
 * 转化attrs属性到组件属性
 * @param attrs
 */
export function convertAttrsToString(attrs: any) {
  const attrStrings = [] as Array<string>;
  const valueStrings = [] as Array<string>;
  const formStrings = [] as Array<string>;
  for (const key in attrs) {
    if (attrs[key].el_value !== '') {
      if (key === 'text') {
        const valueString = `${attrs[key].el_value}`;
        valueStrings.push(valueString);
      } else if (key === 'fieldName' || 'require') {
        const formString = `${key}="${attrs[key].el_value}"`;
        formStrings.push(formString);
      } else {
        const attrString = `${key}="${attrs[key].el_value}"`;
        attrStrings.push(attrString);
      }
    }
  }
  return {
    attrStrings: attrStrings.join(' '),
    valueStrings: valueStrings.join(' '),
    formStrings: formStrings.join(' '),
  };
}

/**
 * 解析,生成html代码
 */
export function renderHtml() {
  const HtmlElementLists = [] as Array<string>;
  const lists = Store().elementList;
  HtmlElementLists.push(`<template>`);
  HtmlElementLists.push(`<el-form>`);
  for (let i = 0; i < lists.length; i++) {
    const elementProperty = convertAttrsToString(lists[i].attrs).attrStrings;
    const valueProperty = convertAttrsToString(lists[i].attrs).valueStrings;
    const formProperty = convertAttrsToString(lists[i].attrs).formStrings;
    HtmlElementLists.push(`<el-form-item ${formProperty}>`);
    HtmlElementLists.push(`<${lists[i].tag} ${elementProperty}>${valueProperty}</${lists[i].tag}>`);
    HtmlElementLists.push(`</el-form-item>`);
  }
  HtmlElementLists.push(`</el-form>`);
  HtmlElementLists.push(`</template>`);
  return HtmlElementLists;
}

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
