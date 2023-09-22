<template>
  <div class="sideContainer">
    <!--    基本组件-->
    <div class="basicCom">
      <template v-for="(group, name) in elements" :key="name">
        <el-divider>{{ group.title }}</el-divider>
        <!--        按钮-->
        <div v-for="(item, index) in group.list" :key="name">
          <el-button class="sideBtn" :icon="item.icon ?? ''" :key="index">
            {{ item.text }}
          </el-button>
        </div>
      </template>
    </div>
    <!--    表单组件-->
    <div class="formCom"></div>
  </div>
</template>

<script lang="ts" setup>
import { elements } from '../../UI';
</script>

<style>
@import './_style.scss';
</style>
