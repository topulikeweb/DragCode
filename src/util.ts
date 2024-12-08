import { DefineComponent } from 'vue';

/**
 * 创建单例
 */
const singleInstance = (Component: DefineComponent) => {
  let result: DefineComponent | null;
  return function() {
    return result || (result = Component);
  };
};


export default singleInstance;


