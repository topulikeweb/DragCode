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
      <component :is="item.tag" style="text-align: center" @click.stop v-model="item.el_value" :type="item.type">
        <component
          v-if="item._opt_?._val_.staticData"
          :is="item._opt_?._val_.tag"
          v-for="opt in item._opt_?._val_.staticData"
          :label="opt.value"
          :value="opt.value"
          :key="opt.index"
          @click.stop
          >{{ opt.key }}
        </component>
        <!--        option card组件-->
        <div v-for="(el, index) in item._opt_?._val_.label" v-if="item._opt_?._val_.label">
          <component :is="item._opt_?._val_.tag" :label="el" :value="item._opt_?._val_.value" :key="index" @click.stop>
            <div v-for="(item_child, index) in item._opt_._val_.option" style="font-size: 11px" v-if="el === '静态配置'">
              <el-form-item :label="`label${index + 1}`">
                <el-input v-model="item_child.key"></el-input>
              </el-form-item>
              <el-form-item :label="`value${index + 1}`">
                <el-input v-model="item_child.value"></el-input>
              </el-form-item>
            </div>
            <div style="font-size: 11px" v-else>
              <el-form-item :label="`接口地址`">
                <el-input placeholder="后端接口地址" v-model="url">
                  <template #prepend>Http://</template>
                </el-input>
              </el-form-item>
              <!--              <el-form-item :label="`label的键值`">-->
              <!--                <el-input></el-input>-->
              <!--              </el-form-item>-->
              <!--              <el-form-item :label="`value的键值`">-->
              <!--                <el-input></el-input>-->
              <!--              </el-form-item>-->
              <el-button size="small" @click="getOption">确认</el-button>
            </div>

            <!--            <div style="font-size: 11px" v-for="(item_child, index) in item._opt?._val_.option">-->
            <!--              <el-form-item :label="`label${index}`">-->
            <!--                <el-input v-model="item_child.key"></el-input>-->
            <!--              </el-form-item>-->
            <!--              <el-form-item :label="`value${index}`">-->
            <!--                <el-input v-model="item_child.value"></el-input>-->
            <!--              </el-form-item>-->
            <!--            </div>-->
          </component>
        </div>
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IComponentType } from '../../../type';
import axios from 'axios';
import { Store } from '../../pinia';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

defineProps({
  item: {
    type: Object as () => IComponentType['attrs'],
    required: true,
    el_value: { type: String },
  },
});
let lists = ref(Store().elementList);

const url = ref('');
/**
 * 请求过来的格式应该是[{
 *  value:1
 *  key:'1'
 * }，{
 *  value:2
 *  key:'2'
 * }]
 */
const getOption = () => {
  // let index = lists.value.findIndex((item) => {
  //   return item._ID === props.item._ID;
  // });
  axios({
    method: 'GET',
    url: url.value,
  })
    .then((res) => {
      // 将请求过来的值更新，并将更新数据存入本地
      lists.value[JSON.parse(localStorage.getItem('index') ?? '0')].attrs.option._opt_._val_.option = res;
      Store().updateElementList(lists.value);
      ElMessage({
        message: '动态option配置成功',
      });
    })
    .catch((error) => {
      ElMessage({
        message: error.message + '动态option配置失败',
      });
    });
};
</script>
<style>
@import './_style.scss';
</style>
