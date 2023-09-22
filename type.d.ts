export interface IComponentType {
  _ID?: string;
  icon?: any;
  tag?: string;
  attrs: {};
  text: string;
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
