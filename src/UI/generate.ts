import { Store } from '../pinia';
import { formConf } from './elements/form.ts';
import { IComponentType } from '../../type';
import { FormInstance } from 'element-plus';

const indent = '    ';
// 创建的formDataName的名字
const formDataName = formConf.attrs.formModel.el_value;
const lists = Store().elementList;

/**
 * 转化attrs属性到组件属性
 * @param attrs
 */
export function convertAttrsToString(attrs: any) {
  const attrStrings = [] as Array<string>;
  const valueStrings = [] as Array<string>;
  const formStrings = [] as Array<string>;
  const formItemStrings = [] as Array<string>;
  let ref = '';
  let sliderSize = 0;
  for (let key in attrs) {
    if (attrs[key].el_value !== '') {
      switch (key) {
        case 'fieldName':
          // fieldName用于设定这个组件的属性名，因此不用放到html上
          break;
        case 'text':
          valueStrings.push(`:text="${attrs[key].el_value}"`);
          break;
        case 'sliderSize':
          formStrings.push(`label-width="${attrs[key].el_value * 10}px"`);
          break;
        case 'labelPosition':
          formStrings.push(`:label-position="${attrs[key].el_value}"`);
          break;
        case 'rule':
          // formStrings.push(`:rule="${attrs[key].el_value}"`);
          break;
        case 'ref':
          formStrings.push(`ref="${attrs[key].el_value}"`);
          ref = attrs[key].el_value;
          console.log(ref);
          break;
        case 'label':
          formItemStrings.push(`${key}="${attrs[key].el_value}"`);
          break;
        case 'submitFn':
          attrStrings.push(`@click="${attrs[key].el_value}(${formConf.attrs.ref.el_value})"`);
          break;
        case 'labelWidth':
          sliderSize = parseInt(attrs[key].el_value);
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
    sliderSize,
  };
}

export function addChildren(_opt: any, _opt_: IComponentType['_opt_'], index: number) {
  let childrenElement = [];
  if (_opt?._val_?.option.length) {
    for (let i = 0; i < _opt?._val_?.option.length; i++) {
      childrenElement.push(
        `
${indent}${indent}${indent}<${_opt_?._val_?.tag} label = '${_opt?._val_?.option[i].key}' value = '${_opt?._val_?.option[i].value}' ></${_opt_?._val_?.tag}>`,
      );
    }
  } else {
    childrenElement.push(`\n${indent}${indent}${indent}${indent}<${_opt_?._val_?.tag}>${lists[index].attrs.text.el_value}</${_opt_?._val_?.tag}>`);
  }
  console.log(childrenElement.join(' '));
  return childrenElement.join(' ');
}

/**
 * 解析,生成html代码
 */
export function renderHtml() {
  const HtmlElementLists = [];

  // 1. 提取常量
  const formAttrs = convertAttrsToString(formConf.attrs);
  const formModel = formConf.attrs.formModel.el_value;

  // 2. 使用模板字符串构建 HTML 代码
  const template = `
 <template>
      <el-form ${formAttrs.formStrings} :model='${formModel}' style='width: 50vw;border:1px solid #b2b2b2;
        border-radius: 10px; 
        position: absolute;
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);'
        rules='${formConf.attrs.rule.el_value}'>
        ${generateFormItems()}
      </el-form>
    </template>
  `;

  // 3. 提取生成 form items 的逻辑
  function generateFormItems() {
    const formItems = [];

    for (let i = 0; i < lists.length; i++) {
      const { attrStrings, formItemStrings } = convertAttrsToString(lists[i].attrs);
      const fieldName = JSON.parse(JSON.stringify((lists[i].attrs.fieldName && lists[i].attrs.fieldName.el_value) ?? ''));
      // 4. 将代码拆分成更小的函数
      const vModelDirective = generateVModelDirective(fieldName);
      const content = lists[i]._opt_
        ? `${indent}<${lists[i].tag} ${attrStrings} ${vModelDirective}>${addChildren(
            (lists[i].attrs.option && lists[i].attrs.option._opt_) ?? '',
            lists[i]._opt_,
            i,
          )}\n${indent}${indent}${indent}</${lists[i].tag}>`
        : `${indent}<${lists[i].tag} ${attrStrings} ${vModelDirective}>${(lists[i].attrs.text && lists[i].attrs.text.el_value) ?? ''}</${lists[i].tag}>`;

      formItems.push(`
        <el-form-item ${formItemStrings} prop='${(lists[i].attrs.fieldName && lists[i].attrs.fieldName.el_value) ?? ''}'>
        <el-col :span='${Math.floor(convertAttrsToString(lists[i].attrs).sliderSize / 1.8)}'>
          ${content}
          </el-col>
        </el-form-item>
      `);
    }
    return formItems.join('');
  }

  // 4. 生成 v-model 指令
  function generateVModelDirective(fieldName: string) {
    if (fieldName) {
      return `v-model="${formDataName}['${fieldName}']"`;
    }
    return '';
  }

  // 组装最终 HTML 结构
  HtmlElementLists.push(template);
  HtmlElementLists.push(`<script lang='ts' setup>`);
  // HtmlElementLists.push(requiredRecourse());
  // 防止出现逗号，将requireRecourse数组拆开然后放入
  for (let i = 0; i < requiredRecourse().length; i++) {
    HtmlElementLists.push(requiredRecourse()[i]);
  }
  HtmlElementLists.push(`const ${formConf.attrs.ref.el_value}=reactive<FormInstance>()`);
  HtmlElementLists.push(createFormData());
  HtmlElementLists.push(createRequestFn());
  HtmlElementLists.push(createRules());
  HtmlElementLists.push(`</script>`);
  HtmlElementLists.push(`<style scoped>`);
  HtmlElementLists.push(`</style>`);
  return HtmlElementLists.join('\n');
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

/**
 * 创建'formData'数据
 */
export function createFormData() {
  const lists = Store().elementList;
  // 创建一个变量名为 formConf.attrs.formModel.el_value 的对象
  const isObject: {
    [key: string]: {
      [key: string]: string;
    };
  } = {
    [formConf.attrs.formModel.el_value]: {},
  };
  for (let i = 0; i < lists.length; i++) {
    const theKey = (lists[i].attrs.fieldName && lists[i].attrs.fieldName.el_value) ?? '';
    if (theKey !== '') {
      const default_value = (lists[i].attrs.defaultValue && lists[i].attrs.defaultValue.el_value) ?? '';
      // 添加属性 theKey 到 isObject[formConf.attrs.formModel.el_value] 对象
      isObject[formConf.attrs.formModel.el_value][theKey] = JSON.parse(JSON.stringify(default_value));
    }
  }
  return `let ${formConf.attrs.formModel.el_value}= reactive(${JSON.stringify(isObject[formConf.attrs.formModel.el_value], null, 2)})`;
}

/**
 * 引入资源
 */
export function requiredRecourse() {
  const recourseData = [];
  recourseData.push(`import {reactive} from 'vue';`);
  recourseData.push(`import type { FormInstance, FormRules } from 'element-plus';`);
  return recourseData;
}

/**
 * 生成axios请求的函数
 */
export function createRequestFn() {
  return `const submitFn = ${async (formEl: FormInstance) => {
    if (!formEl) return;
    await formEl.validate((valid: any, fields: any) => {
      if (valid) {
        console.log('submit!');
      } else {
        console.log('error submit!', fields);
      }
    });
  }}`;
}

/**
 * 生成表单的规则
 */

function createRules() {
  const rules = {} as any;
  for (let i = 0; i < lists.length; i++) {
    const rulesFiledName = [];
    let minMaxObject = {} as any; // 创建一个对象来存储 min 和 max 属性
    for (const key in lists[i].attrs.rules) {
      if (lists[i].attrs.rules.hasOwnProperty(key)) {
        if (key === 'min' || key === 'max') {
          minMaxObject[key] = parseInt(lists[i].attrs.rules[key].el_value);
          minMaxObject['message'] = 'You broke the rules';
          minMaxObject['trigger'] = 'blur';
        } else {
          let rulesItemObj = {} as any;
          rulesItemObj[key] = lists[i].attrs.rules[key].el_value;
          rulesItemObj['message'] = 'You broke the rules';
          rulesItemObj['trigger'] = 'blur';
          rulesFiledName.push(rulesItemObj);
        }
      }
    }
    if (Object.keys(minMaxObject).length > 0) {
      rulesFiledName.push(minMaxObject); // 将包含 min 和 max 属性的对象添加到数组
    }
    if (rulesFiledName.length !== 0) {
      rules[(lists[i].attrs.fieldName && lists[i].attrs.fieldName.el_value) ?? ''] = rulesFiledName;
    }
  }
  console.log(rules);
  return `const rules:FormRules = reactive(${JSON.stringify(rules, null, 2)})`;
}

// const arr = [
//   { max: 2, message: 'You broke the rules', trigger: 'blur' },
//   { min: 0, message: 'You broke the rules', trigger: 'blur' },
//   { data: 1, message: 'You broke the rules', trigger: 'blur' },
// ];
//
// const mergedArr = [];
//
// arr.forEach((obj) => {
//   const existingObj = mergedArr.find((item) => ('max' in obj ? 'max' in item : 'min' in item));
//
//   if (existingObj) {
//     if ('max' in obj) {
//       existingObj.max = obj.max;
//     }
//     if ('min' in obj) {
//       existingObj.min = obj.min;
//     }
//
//     existingObj.message = obj.message;
//     existingObj.trigger = obj.trigger;
//   } else {
//     mergedArr.push(obj);
//   }
// });
//
// console.log(mergedArr, 123);
