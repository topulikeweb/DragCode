<template>
  <!--menuConf上的复杂组件和简单组件-->
  <div class="renderElement">
    <div v-if="!item._opt_">
      <div class="keyName">{{ item.label ?? '' }}</div>
      <component :is="item.tag" style="text-align: center" @click.stop v-model="item.el_value">
        <div>{{ item.text }}</div>
      </component>
    </div>
    <div v-else>
      <div class="keyName">{{ item.label ?? '' }}</div>
      <component :is="item.tag" style="text-align: center" @click.stop v-model="item.el_value">
        <component
          :is="item._opt_._val_.tag"
          v-for="opt in item._opt_?._val_.staticData"
          :label="opt.value"
          :value="opt.value"
          :key="opt.index"
          @click.stop
          >{{ opt.key }}
        </component>
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IComponentType } from '../../../type';

defineProps({
  item: {
    type: Object as () => IComponentType['attrs'],
    required: true,
    el_value: { type: String },
  },
});
</script>
<style>
@import './_style.scss';
</style>
