<template>
  <div class="drawerPage">
    <div v-for="(item, index) in renderedHTML">
      <code :key="index">{{ item }}</code>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Store } from '../../pinia';
import { IComponentType, IElementName } from '../../../type';

const lists = ref(Store().elementList);
const renderedHTML = ref([] as Array<string>);
const elementName = ref({} as IElementName);
const getItemTag = () => {
  renderedHTML.value[0] = `<template>`;
  for (let i = 0; i < lists.value.length; i++) {
    if (lists.value[i].tag === 'el-button') {
      console.log(lists.value[i].attrs);
      validate(lists.value[i]);
      renderedHTML.value.push(`<${lists.value[i].tag} size="${elementName.value.size}">${lists.value[i].text}</${lists.value[i].tag}>`);
    } else {
      renderedHTML.value.push(`<${lists.value[i].tag} size="${lists.value[i].attrs.size.el_value}" ></${lists.value[i].tag}>`);
      console.log(lists.value[i].attrs.size.el_value, 111);
    }
  }
  renderedHTML.value[renderedHTML.value.length - 1] = `</template>`;
};
const validate = (item: IComponentType) => {
  const size = item.attrs?.size?.el_value;
  let sliderSize = item.attrs?.sliderSize?.el_value;
  console.log(sliderSize);
  // 限制sliderSize大小
  if (sliderSize < 11) {
    sliderSize = 11;
  }
  const textValue = item.attrs?.text?.el_value ?? '';
  const type = item.attrs?.type?.el_value;
  const e_icon = item.attrs?.icon?.el_value.name;
  const circle = item.attrs?.switch?.el_value;
  let content_position = item.attrs?.position?.el_value === '' ? 'center' : item.attrs?.position?.el_value;
  let divider_Value = item.attrs?.divider_Value?.el_value;
  const formName = item.attrs?.formName?.el_value;
  const placeholder = item.attrs?.placeholder?.el_value;
  const option = item.attrs?.option?._opt_?._val_.option;
  const step = parseInt(item.attrs?.step?.el_value);
  const min = parseInt(item.attrs?.min?.el_value);
  const max = parseInt(item.attrs?.max?.el_value);
  const defaultValue = item.attrs?.defaultValue?.el_value;
  // const radioValue =  item.attrs?.option?.el_value;
  const src = item.attrs?.src?.el_value;
  const fit = item.attrs?.fit?.el_value;
  const style = {
    width: item.attrs?.width?.el_value + 'px',
    height: item.attrs?.height?.el_value + 'px',
  };
  // const formSliderSize = formConfig.value.attrs.sliderSize.el_value * 5;
  // const labelPosition = formConfig.value.attrs.labelPosition.el_value;
  /**
   * 将设置的属性存入本地
   */
  if (lists.value.length !== 0 && item.attrs) {
    const index = JSON.parse(localStorage.getItem('index') ?? '0');
    if (index >= 0 && index < lists.value.length) {
      lists.value[index].attrs = item.attrs;
      Store().updateElementList(lists.value);
    }
  }
  elementName.value = {
    size,
    textValue,
    type,
    e_icon,
    circle,
    content_position,
    divider_Value,
    formName,
    sliderSize,
    placeholder,
    option,
    step,
    min,
    max,
    defaultValue,
    // radioValue,
    src,
    style,
    fit,
  };
};
onMounted(() => {
  getItemTag();
  console.log(renderedHTML.value);
});
</script>
<style scoped>
.containe {
  font-family: monospace; /* 使用等宽字体以保留格式 */
  white-space: pre; /* 保留空格和换行符 */
}
</style>
