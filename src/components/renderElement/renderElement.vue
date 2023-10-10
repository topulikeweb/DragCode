<template>
  <div class="renderComponent">
    <div v-if="!item._opt_">
      <div class="keyName">{{ item.label ?? '' }}</div>
      <component :is="item.tag" :class="classes" style="text-align: center" @click.stop v-bind="{ ...validate }">
        <el-icon class="el-icon--right" v-if="validate.e_icon">
          <component :is="validate.e_icon" />
        </el-icon>
        <div>{{ validate.textValue }}</div>
      </component>
    </div>
    <!--    复选框-->
    <!--渲染画布上的复杂组件-->
    <div v-else>
      <component :is="item.tag" :class="classes" style="text-align: center" @click.stop :size="validate.size">
        <component
          :is="item._opt_._val_.tag"
          v-for="opt in getStaticData(item)"
          :label="opt.key"
          :value="opt.value"
          :key="opt.key"
          @click.stop
        ></component>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { IComponentType, IRenderElement } from '../../../type';
import * as classNames from 'classnames';
import { elements } from '../../UI';
import { Star, Check, Message, Delete, Edit } from '@element-plus/icons-vue';

export default defineComponent({
  components: { Star, Check, Message, Delete, Edit },
  methods: {
    elements() {
      return elements;
    },
  },
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
    console.log('render Component');
    const classes = ref('');
    const lists = ref(localStorage.getItem('elementList') || '');
    /**
     * 根据组件类型 设置样式
     */
    const setClasses = (componentTag: string) => {
      classes.value = classNames({
        [`${componentTag}-style`]: componentTag,
      });
    };
    setClasses(props.item.tag);

    /**
     * 对staticData进行处理
     * @param item
     */
    const getStaticData = (item: IComponentType) => {
      // 检查 staticData 是否为空，如果为空则返回默认值
      if (item._opt_) {
        if (!item._opt_._val_.staticData) {
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
        } else {
          return item._opt_._val_.staticData;
        }
      }
    };
    /**
     * 得到组件的size，value等值
     */
    const validate = computed(() => {
      const size = props.item.attrs?.size?.el_value;
      const textValue = props.item.attrs?.text?.el_value;
      const type = props.item.attrs?.type?.el_value;
      const e_icon = props.item.attrs?.icon?.el_value.name;
      const circle = props.item.attrs?.switch?.el_value;
      return { size, textValue, type, e_icon, circle };
    });
    return { classes, getStaticData, validate, lists };
  },
});
</script>

<style>
@import './_style.scss';
</style>
