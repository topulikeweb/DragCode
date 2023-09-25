<template>
  <div>
    <component :is="item.tag" :class="classes" style="text-align: center" v-if="!item._opt_" v-model="item.defaultValue">
      <div>{{ item.text }}</div>
    </component>
    <!--    复选框-->
    <component :is="item.tag" :class="classes" style="text-align: center" v-else v-model="item.defaultValue">
      <component
        :is="item._opt_._val_.tag"
        v-for="opt in getStaticData(item)"
        :label="opt.key"
        :value="opt.value"
        :key="opt.key"
      ></component>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { IComponentType, IRenderElement } from '../../../type';
import * as classNames from 'classnames';

export default defineComponent({
  props: {
    // is: {
    //   type: String as PropType<string>,
    //   required: true,
    // },
    // text: {
    //   type: String as PropType<string>,
    //   required: true,
    // },
    item: {
      type: Object as () => IComponentType,
      required: true,
    },
  },
  setup(props: IRenderElement) {
    const classes = ref('');

    /**
     * 根据组件类型 设置样式
     */
    const setClasses = (componentTag: string) => {
      classes.value = classNames({
        [`${componentTag}-style`]: componentTag,
      });
    };

    onMounted(() => {
      setClasses(props.item.tag);
    });

    const getStaticData = (item: IComponentType) => {
      // 检查 staticData 是否为空，如果为空则返回默认值
      if (!item._opt_._val_.staticData || item._opt_._val_.staticData.length === 0) {
        return [
          {
            key: '选项一',
            value: 1,
          },
          {
            key: '选项二',
            value: 2,
          },
        ];
      }
      return item._opt_._val_.staticData;
    };
    return { classes, getStaticData };
  },
});
</script>

<style>
@import './_style.scss';
</style>
