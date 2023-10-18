<template>
  <div class="renderComponent">
    <div v-if="!item._opt_">
      <!--      专门用于渲染分割线-->
      <component v-if="item.tag === 'el-divider'" :is="item.tag" :content-position="validate.content_position">
        <!--        分割线的文本-->
        {{ validate.divider_Value }}
      </component>
      <div class="keyName">{{ item.label ?? '' }}</div>
      <el-form v-if="item.tag !== 'el-divider'">
        <el-form-item :label="validate.formName">
          <el-col :span="Math.floor(validate.sliderSize / 4.5)">
            <component
              v-model="validate.defaultValue"
              :is="item.tag"
              :class="classes"
              style="text-align: center"
              @click.stop
              v-bind="{ ...validate }"
              :content-position="validate.content_position"
            >
              <!--        分割线的文本-->
              {{ validate.divider_Value }}
              <el-icon class="el-icon--right" v-if="validate.e_icon">
                <component :is="validate.e_icon" />
              </el-icon>
              <div>{{ validate.textValue }}</div>
            </component>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <!--    复选框-->
    <!--渲染画布上的复杂组件-->
    <div v-else>
      <el-form>
        <el-form-item :label="validate.formName">
          <component
            :is="item.tag"
            :class="classes"
            style="text-align: center"
            @click.stop
            :size="validate.size"
            v-model="validate.defaultValue"
          >
            <component
              :is="item._opt_._val_.tag"
              v-for="opt in validate.option"
              :label="opt.key"
              :value="opt.value"
              :key="opt.key"
              @click.stop
            ></component>
          </component>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { IComponentType, IRenderElement } from '../../../type';
import * as classNames from 'classnames';
import { elements } from '../../UI';
import { Star, Check, Message, Delete, Edit } from '@element-plus/icons-vue';
import { formatDate } from '@vueuse/core';
import { Store } from '../../pinia';

export default defineComponent({
  components: { Star, Check, Message, Delete, Edit },
  methods: {
    formatDate,
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
    const lists = ref(JSON.parse(localStorage.getItem('elementList') || '{}'));
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
     * 得到组件的size，value等值
     */
    const validate = computed(() => {
      const size = props.item.attrs?.size?.el_value;
      let sliderSize = props.item.attrs?.sliderSize?.el_value;
      // 限制sliderSize大小
      if (sliderSize < 11) {
        sliderSize = 11;
      }
      const textValue = props.item.attrs?.text?.el_value ?? '';
      const type = props.item.attrs?.type?.el_value;
      const e_icon = props.item.attrs?.icon?.el_value.name;
      const circle = props.item.attrs?.switch?.el_value;
      let content_position = props.item.attrs?.position?.el_value === '' ? 'center' : props.item.attrs?.position?.el_value;
      let divider_Value = props.item.attrs?.divider_Value?.el_value;
      const formName = props.item.attrs?.formName?.el_value;
      const placeholder = props.item.attrs?.placeholder?.el_value;
      const option = props.item.attrs?.option?._opt_?._val_.option;
      const step = parseInt(props.item.attrs?.step?.el_value);
      const min = parseInt(props.item.attrs?.min?.el_value);
      const max = parseInt(props.item.attrs?.max?.el_value);
      const defaultValue = parseInt(props.item.attrs?.defaultValue?.el_value);
      // const radioValue = props.item.attrs?.option?.el_value;
      /**
       * 将设置的属性存入本地
       */
      if (lists.value.length !== 0 && props.item.attrs) {
        const index = JSON.parse(localStorage.getItem('index') ?? '0');
        if (index >= 0 && index < lists.value.length) {
          lists.value[index].attrs = props.item.attrs;
          Store().updateElementList(lists.value);
        }
      }

      // console.log(JSON.parse(lists.value)[JSON.parse(localStorage.getItem('index') ?? '0')].attrs, 111);
      return {
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
      };
    });
    return { classes, validate, lists };
  },
});
</script>

<style>
@import './_style.scss';
</style>
