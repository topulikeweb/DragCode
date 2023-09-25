type ElementType = 'static' | 'dynamic';

/**
 * 每个组件配置属性的类型
 */
export interface IComponentType {
  _ID: string;
  tagIcon?: any;
  tag: string;
  defaultValue?: any;
  attrs: {};
  text: string;
  _opt_?: {
    label: string;
    _val_: {
      type: string;
      tag: string;
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
