<template>
  <div class="drawerPage">
    <div class="hljs-container" codetype="JavaScript" v-code>
      <!--      <el-button style="position: absolute; right: 20px" @click="copyCode"> 复制 </el-button>-->
      <highlightjs language="JavaScript" :autodetect="false" :code="code" class="hljs-code"></highlightjs>
    </div>

    <div>
      <el-card :body-style="{ padding: '0px' }" style="margin-top: 20px; width: 30vw">
        <img src="../../assets/img.png" class="image" />
        <div style="padding: 14px">
          <span>将代码粘贴到编辑器中就可以使用</span>
          <div class="bottom">
            <el-button text class="button"> 请注意，目前只支持vue3框架，之后会持续更新支持react,vue2等 </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { renderHtml, vCode } from '../../UI/generate.ts';
import 'vue-highlight-code/dist/style.css';

let code = ref('');
const getItemTag = () => {
  code.value = renderHtml();
};

// const formatCode = (htmlArray: Array<string>) => {
//   const htmlString = htmlArray.join('\n');
//   return htmlString;
// };
onMounted(() => {
  getItemTag();
});
</script>
<style scoped>
@import './_style.scss';
</style>
