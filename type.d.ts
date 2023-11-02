type ElementType = 'static' | 'dynamic';

export interface elementStyle {
  size?: string;
  value?: string | number;
}

/**
 * 每个组件配置属性的类型
 */
export interface IComponentType {
  _ID: string;
  tagIcon?: any;
  tag: string;
  defaultValue?: any;
  attrs: {
    [key: string]: any;
  };
  text: string;
  label?: string;
  value?: string | number;
  isShowPointer: boolean;
  _opt_?: {
    label: string;
    _val_?: {
      type: string;
      tag: string;
      keyValue?: {
        key: string;
        value: string | number;
      };
      staticData?: { key: any; value: any }[];
      dynamicData?: {
        url: string;
        method: string;
        keyName: string;
        valueName: string;
      };
    };
    input_type: string;
  };
}

export interface IElements {
  base: {
    list: IComponentType[];
    title: string;
  };
  form: {
    list: IComponentType[];
    title: string;
  };
}

/**
 * renderElement的props
 */
export interface IRenderElement {
  item: IComponentType;
  index: number;
}

export interface IFormConfig {
  //   tag:
  //     props: {},
  //   __rules: {},
  //   attrs: {
  // }
  tag: string;
  props: {};
  __rules: {};
  attrs: {};
}

export interface IElementName {
  size: string | undefined;
  textValue: string;
  type: string | undefined;
  e_icon: string | undefined;
  circle: boolean | undefined;
  content_position: string;
  divider_Value: string | undefined;
  formName: string | undefined;
  labelWidth: number;
  placeholder: string | undefined;
  option: any[] | undefined; // 你可以根据实际情况更具体定义 option 的类型
  step: number | undefined;
  min: number | undefined;
  max: number | undefined;
  defaultValue: any | undefined; // 你可以根据实际情况更具体定义 defaultValue 的类型
  src: string | undefined;
  style: {
    width: string | undefined;
    height: string | undefined;
  };
  fit: string | undefined;
}
