<template>
  <div class="sideContainer">
    <!--    基本组件-->
    <div class="basicCom">
      <template v-for="(group, name) in elements" :key="name">
        <el-divider>{{ group.title }}</el-divider>
        <!--        按钮-->
        <div v-for="(item, index) in group.list" :key="name" @click="createElement(item)">
          <el-button :class="changeClassName(index)" :key="index">
            {{ item.text }}
          </el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { elements } from '../../UI';
import { Store } from '../../pinia';
import { IComponentType } from '../../../type';
import { helper_getRandomStr } from '../../UI/helper.ts';
import { ref } from 'vue';

const elementList = ref(Store().elementList);
/**
 * 创建组件到数组
 */
const createElement = (item: IComponentType) => {
  // 进行深拷贝，以免组件之间数据互相影响
  const newItem = JSON.parse(JSON.stringify(item));
  newItem._ID = helper_getRandomStr();
  if (newItem.attrs.fieldName && newItem.attrs.fieldName.el_value) {
    newItem.attrs.fieldName.el_value = helper_getRandomStr();
  }
  elementList.value.push(newItem);
  Store().updateElementList(elementList.value);
  Store().updateRules();
  Store().updateFromData();
};

const changeClassName = (index: number) => {
  let className = '';
  if (index < 2) {
    className = 'wiBtn';
  } else if (index > 2 && index < 5) {
    className = 'fontBtn';
  } else {
    className = 'sideBtn';
  }
  return className;
};
</script>

<style>
@import './_style.scss';
</style>
