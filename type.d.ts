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
    _val_: {
      type: string;
      change?: () => any;
      tag: string;
      keyValue: {
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
}
