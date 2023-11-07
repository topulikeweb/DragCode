<template>
  <div class="attrsMenus">
    <el-tabs class="tabs" type="card" bg="#484dff">
      <el-tab-pane label="组件属性" name="first">
        <RenderMenuConfComponent :item="{}" />
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="second">
        <RenderMenuConfComponent :item="{}" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import RenderMenuConfComponent from '../renderMenuConfComponent/renderMenuConfComponent.vue';
</script>

<style>
@import './_style.scss';
</style>
