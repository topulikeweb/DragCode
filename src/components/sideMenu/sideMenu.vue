<template>
  <div class="sideContainer">
    <!--    基本组件-->
    <div class="basicCom">
      <template v-for="(group, name) in elements" :key="name">
        <el-divider>{{ group.title }}</el-divider>
        <!--        按钮-->
        <div v-for="(item, index) in group.list" :key="name" @click="createElement(item)">
          <el-button class="sideBtn" :icon="item.tagIcon ?? ''" :key="index">
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

const elementList = Store().elementList;

/**
 * 创建组件到数组
 */
const createElement = (item: IComponentType) => {
  console.log(item);
  elementList.push(item);
  Store().updateElementList(elementList);
};
</script>

<style>
@import './_style.scss';
</style>
