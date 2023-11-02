<template>
  <div class="drawerPage">
    <el-form :model="formData">
      <draggable
        :list="lists"
        @end="onDragEnd"
        class="drawing-board"
        ghost-class="ghost"
        itemKey="id"
        :force-fallback="true"
        group="list"
        :fallback-class="true"
        :fallback-on-body="true"
      >
        <transition-group>
          <div v-for="(item, index) in lists" class="elementComponent" @click="showPointer(item), getMenuConf(index)" :key="index">
            <div class="pointerBox" @click.stop="moveUp(item)" :key="index">
              <div class="text" v-if="item.isShowPointer">move up</div>
              <el-icon v-if="item.isShowPointer" size="large" class="pointer">
                <Top />
              </el-icon>
            </div>
            <div class="elementItem">
              <render-element :item="item" style="width: 95%" :list="lists" :key="item._ID" :index="index"></render-element>
              <div class="infoBox"></div>
            </div>
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

  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="组件属性">
      <el-scrollbar height="80vh">
        <RenderElement :item="menuConf"></RenderElement>
        <!--        删除操作-->
        <el-popover :visible="visible" placement="top" :width="160">
          <p>确认删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" text @click="visible = false">取消 </el-button>
            <el-button size="small" type="primary" @click="deleteElement"> 确认 </el-button>
          </div>
          <template #reference>
            <el-button type="danger" size="small" style="margin-top: 20px" @click="visible = true">删除 </el-button>
          </template>
        </el-popover>
        <el-button type="info" size="small" style="margin-top: 20px; margin-left: 10px" @click="copyElement"> 复制 </el-button>
        <el-divider>属性面板</el-divider>
        <RenderMenuConfComponent v-for="(item, index) in menuConf.attrs ?? {}" :item="item" :key="index" class="renderElement" />
        <div style="width: 100%; height: 10vh"></div>
      </el-scrollbar>
      <!--      添加规则按钮-->
      <el-button @click="drawer = true">添加规则</el-button>
    </el-tab-pane>
    <el-tab-pane label="表单属性">
      <RenderMenuConfComponent v-for="(item, index) in formConfig.attrs ?? {}" :item="item" :key="index" class="renderElement" />
    </el-tab-pane>
  </el-tabs>

  <el-drawer v-model="drawer" title="添加你的规则" :before-close="handleClose" size="400">
    <RenderMenuConfComponent v-for="(item, index) in (menuConf.attrs && menuConf.attrs.rules) ?? {}" :item="item" :key="index" class="renderElement" />
  </el-drawer>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { Store } from '../../pinia';
import RenderElement from '../renderElement/renderElement.vue';
import { computed, reactive, ref } from 'vue';
import { Bottom, Top } from '@element-plus/icons-vue';
import { IComponentType, IFormConfig } from '../../../type';
import { ElMessage } from 'element-plus';
import RenderMenuConfComponent from '../renderMenuConfComponent/renderMenuConfComponent.vue';
import { helper_getRandomStr } from '../../UI/helper.ts';
import { formConf } from '../../UI/elements/form.ts';
// 创建一个新的elementList防止出现Typescript判别类型错误的问题
let newElementList = ref(Store().elementList);
const formData = reactive({});
// 当前选中组件的属性详情
let menuConf = ref<IComponentType>({} as IComponentType);
// 对话框的boolean值
const visible = ref(false);
let formConfig = ref({} as IFormConfig);
const drawer = ref(false);
formConfig.value = formConf;
/**
 * 是否展示指示箭头
 * @param e
 * @param item
 */
const showPointer = (item: IComponentType) => {
  item.isShowPointer = !item.isShowPointer;
  Store().findIndexElementItem(item);
  console.log(item);
};
/**
 * 向上移动
 */
const moveUp = (item: IComponentType) => {
  const index = lists.value.findIndex((element) => {
    return element._ID === item._ID;
  });
  if (index !== 0) {
    const elementData = lists.value[index];
    lists.value[index] = JSON.parse(JSON.stringify(lists.value[index - 1]));
    lists.value[index - 1] = elementData;
    Store().updateElementList(lists.value);
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
  const index = lists.value.findIndex((element) => {
    return element._ID === item._ID;
  });
  if (index !== lists.value.length - 1) {
    const elementData = lists.value[index + 1];
    lists.value[index + 1] = JSON.parse(JSON.stringify(lists.value[index]));
    lists.value[index] = elementData;
    Store().updateElementList(lists.value);
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
const getMenuConf = (index: number) => {
  menuConf.value = lists.value[index];
};
/**
 * 拖动组件，改变次序
 */
const onDragEnd = () => {
  console.log(lists.value);
  ElMessage({
    message: '操作成功',
    type: 'success',
  });
};
let lists = computed({
  get() {
    return newElementList.value;
  },
  set(newVal: any[]) {
    console.log(newVal);
    newElementList.value = newVal;
    Store().updateElementList(newElementList.value);
  },
});
/**
 * 删除操作
 */
const deleteElement = () => {
  const index = lists.value.findIndex((item) => {
    return item._ID === menuConf.value._ID;
  });
  lists.value.splice(index, 1);
  Store().updateElementList(lists.value);
  visible.value = true;
};
/**
 * 复制当前组件
 */
const copyElement = () => {
  let copyElementItem;
  const index = lists.value.findIndex((item) => {
    return item._ID === menuConf.value._ID;
  });
  for (let i = 0; i < lists.value.length; i++) {
    copyElementItem = JSON.parse(JSON.stringify(lists.value[index]));
    // 重新分配_ID
    copyElementItem._ID = helper_getRandomStr();
  }
  lists.value.push(copyElementItem);
  Store().updateElementList(lists.value);
};

const handleClose = () => {
  ElMessage({
    message: '规则已成功添加',
    type: 'success',
  });
  drawer.value = false;
};
</script>

<style>
@import './_style.scss';
</style>
