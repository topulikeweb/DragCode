<template>
  <div class="drawerPage">
    <el-form :model="formData">
      <div v-for="item in elementList" class="elementComponent">
        <render-element :item="item"></render-element>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Store } from '../../pinia';
import RenderElement from '../renderElement/renderElement.vue';
import { reactive } from 'vue';

const elementList = reactive(Store().elementList);
const formData = reactive({});
</script>

<style>
@import './_style.scss';
</style>
