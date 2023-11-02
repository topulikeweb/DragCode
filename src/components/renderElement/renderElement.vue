<template>
  <div class="renderComponent">
    <!--    用于渲染分割线-->
    <component v-if="item.tag === 'el-divider'" :is="item.tag" :content-position="validate.content_position">
      <!--        分割线的文本-->
      {{ validate.divider_Value }}
    </component>

    <el-form
      :label-width="validate.formSliderSize"
      :label-position="validate.labelPosition"
      ref="formRef"
      :model="formData"
      :rules="rules"
      v-if="item.tag !== 'el-divider'"
      :status-icon="true"
    >
      <el-form-item :label="validate.label" :prop="validate.fieldName" class="renderElement">
        <el-col :span="Math.floor(validate.sliderSize / 4.5)">
          <component
            v-if="item._opt_ === undefined"
            :is="item.tag"
            :class="classes"
            @click="requestData(formRef)"
            :style="validate.style"
            @click.stop
            v-bind="{ ...validate }"
            v-model="formData[validate.fieldName]"
          >
            {{ validate.divider_Value }}
            <el-icon class="el-icon--right" v-if="validate.e_icon">
              <component :is="validate.e_icon" />
            </el-icon>
            <div>{{ validate.textValue }}</div>
          </component>

          <component v-else :is="item.tag" :class="classes" style="text-align: center" @click.stop :size="validate.size" v-model="formData[validate.fieldName]">
            <component
              v-if="item._opt_._val_?.staticData !== undefined"
              :is="item._opt_._val_.tag"
              v-for="opt in validate.option"
              :label="opt.key"
              :value="opt.value"
              :key="opt.key"
              @click.stop
            ></component>
            <component v-else :is="item._opt_._val_?.tag">
              {{ validate.textValue }}
            </component>
          </component>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { IComponentType, IRenderElement } from '../../../type';
import * as classNames from 'classnames';
import { elements } from '../../UI';
import { Star, Check, Message, Delete, Edit } from '@element-plus/icons-vue';
import { formatDate } from '@vueuse/core';
import { Store } from '../../pinia';
import { formConf } from '../../UI/elements/form.ts';
import { FormInstance } from 'element-plus';

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
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props: IRenderElement) {
    console.log('render Component');
    const classes = ref('');
    const lists = ref(JSON.parse(localStorage.getItem('elementList') || '{}'));
    const formConfig = ref(formConf);
    const formRef = ref<FormInstance>();
    let formData = reactive<any>(Store().formData);
    const rules = reactive(Store().rules);
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
      let sliderSize = props.item.attrs?.labelWidth?.el_value;
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
      const label = props.item.attrs?.label?.el_value;
      const placeholder = props.item.attrs?.placeholder?.el_value;
      const option = props.item.attrs?.option?._opt_?._val_.option;
      const step = parseInt(props.item.attrs?.step?.el_value);
      const min = parseInt(props.item.attrs?.min?.el_value);
      const max = parseInt(props.item.attrs?.max?.el_value);
      const defaultValue = props.item.attrs?.defaultValue?.el_value;
      const submitFn = props.item.attrs?.submitFn?.el_value;
      // const radioValue = props.item.attrs?.option?.el_value;
      const src = props.item.attrs?.src?.el_value;
      const fit = props.item.attrs?.fit?.el_value;
      const fieldName = props.item.attrs?.fieldName?.el_value;
      const style = {
        width: props.item.attrs?.width?.el_value + 'px',
        height: props.item.attrs?.height?.el_value + 'px',
      };
      const formSliderSize = formConfig.value.attrs.sliderSize.el_value * 5;
      const labelPosition = formConfig.value.attrs.labelPosition.el_value;
      const action = props.item.attrs?.action?.el_value;
      const rule = formConfig.value.attrs.rule.el_value;
      const ref = formConfig.value.attrs.ref.el_value;
      /**
       * 将设置的属性存入本地
       */
      // if (lists.value.length !== 0 && props.item.attrs) {
      //   // / 深拷贝，不然数组会出现问题
      //   const newLists = JSON.parse(JSON.stringify(lists.value));
      //   const index = props.index;
      //   // TODO 这里有一个bug导致数组更新问题
      //   if (index >= 0 && index < newLists.length) {
      //     // 删除第二个元素
      //     newLists.splice(1, 1);
      //     // 在第二个位置插入新元素
      //     newLists.splice(1, 0, props.item.attrs);
      //     Store().updateElementList(newLists);
      //   }
      // }
      // console.log(JSON.parse(lists.value)[JSON.parse(localStorage.getItem('index') ?? '0')].attrs, 111);
      return {
        size,
        textValue,
        type,
        e_icon,
        circle,
        content_position,
        divider_Value,
        label,
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
        formSliderSize,
        labelPosition,
        action,
        submitFn,
        fieldName,
        ref,
        rule,
      };
    });
    /**
     * 为按钮绑定提交事件
     */
    const requestData = async (formEl: FormInstance) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!', fields);
        }
      });
    };
    /**
     * 监听validate的改变，如果改变了就更新数组，规则，变量
     */
    watch(validate, () => {
      // / 深拷贝，不然数组会出现问题
      const newLists = JSON.parse(JSON.stringify(lists.value));
      const index = props.index;
      // TODO 这里有一个bug导致数组更新问题
      if (index >= 0 && index < newLists.length) {
        newLists[index].attrs = props.item.attrs;
        Store().updateElementList(newLists);
        Store().updateRules();
        Store().updateFromData();
      }
    });

    return {
      classes,
      validate,
      lists,
      requestData,
      formRef,
      formData,
      rules,
    };
  },
});
</script>

<style>
@import './_style.scss';
</style>
