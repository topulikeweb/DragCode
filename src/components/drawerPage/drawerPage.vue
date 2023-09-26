<template>
  <div class="drawerPage">
    <el-form :model="formData">
      <draggable v-model="lists" @change="onDragEnd" class="drawing-board">
        <transition-group>
          <div v-for="item in lists" class="elementComponent" @click="showPointer(item)">
            <div class="pointerBox" @click.stop="moveUp(item)">
              <div class="text" v-if="item.isShowPointer">move up</div>
              <el-icon v-if="item.isShowPointer" size="large" class="pointer">
                <Top />
              </el-icon>
            </div>
            <render-element :item="item"></render-element>
            <div class="pointerBox" @click.stop="moveDown(item)">
              <div class="text" v-if="item.isShowPointer">move down</div>
              <el-icon v-if="item.isShowPointer" size="large" class="pointer">
                <Bottom />
              </el-icon>
            </div>
          </div>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Store } from '../../pinia';
import RenderElement from '../renderElement/renderElement.vue';
import { computed, reactive } from 'vue';
import { Bottom, Top } from '@element-plus/icons-vue';
import { IComponentType } from '../../../type';
import { ElMessage } from 'element-plus';

let elementList = reactive(Store().elementList);
const formData = reactive({});
/**
 * 是否展示指示箭头
 * @param e
 * @param item
 */
const showPointer = (item: IComponentType) => {
  item.isShowPointer = !item.isShowPointer;
};
/**
 * 向上移动
 */
const moveUp = (item: IComponentType) => {
  const index = elementList.findIndex((element) => {
    return element._ID === item._ID;
  });
  if (index !== 0) {
    const elementData = elementList[index];
    elementList[index] = elementList[index - 1];
    elementList[index - 1] = elementData;
    ElMessage({
      message: '向上移动操作成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '已经到最顶部了',
      type: 'warning',
    });
  }
};

/**
 * 向下移动
 */
const moveDown = (item: IComponentType) => {
  console.log(item);
  const index = elementList.findIndex((element) => {
    return element._ID === item._ID;
  });
  if (index !== elementList.length - 1) {
    const elementData = elementList[index + 1];
    elementList[index + 1] = elementList[index];
    elementList[index] = elementData;
    ElMessage({
      message: '向下移动操作成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '已经到最底部了',
      type: 'warning',
    });
  }
};

const onDragEnd = () => {
  ElMessage({
    message: '操作成功',
    type: 'success',
  });
};

let lists = computed({
  get() {
    return Store().elementList;
  },
  set(newVal: any[]) {
    // return [...newVal];;
    Store().updateElementList(newVal);
    lists.value = Store().elementList;
  },
});
</script>

<style>
@import './_style.scss';
</style>
