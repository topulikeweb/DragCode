<template>
  <div class="drawerPage">
    <div class="hljs-container" codetype="JavaScript" v-code>
      <!--      <el-button style="position: absolute; right: 20px" @click="copyCode"> 复制 </el-button>-->
      <highlightjs language="JavaScript" :autodetect="false" :code="code" class="hljs-code"></highlightjs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { renderHtml, vCode } from '../../UI/generate.ts';
import 'vue-highlight-code/dist/style.css';

const renderedHTMLList = ref([] as Array<string>);
let code = ref('');
const getItemTag = () => {
  renderedHTMLList.value = renderHtml();
  // 转换为字符串
  console.log(renderedHTMLList);
  code.value = renderedHTMLList.value;
  console.log(code.value);
};

// const formatCode = (htmlArray: Array<string>) => {
//   const htmlString = htmlArray.join('\n');
//   return htmlString;
// };
const copyCode = () => {
  vCode.mounted();
};
onMounted(() => {
  getItemTag();
});
</script>
<style scoped>
/* 语法高亮 */
.hljs-container {
  position: relative;
  display: flex;
  width: max-content;
  margin-left: 100px;
  padding: 30px 10px 2px 0;
  overflow-x: hidden;
  max-height: 100vh;
  font-size: 14px;
  line-height: 24px;
  text-align: left;
  background: #21252b;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
}

/** 3个点 */
.hljs-container::before {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 12px;
  height: 12px;
  overflow: visible;
  font-weight: 700;
  font-size: 16px;
  line-height: 12px;
  white-space: nowrap;
  text-indent: 75px;
  background-color: #fc625d;
  border-radius: 16px;
  box-shadow:
    20px 0 #fdbc40,
    40px 0 #35cd4b;
  content: attr(codetype);
}

/** 滚动条 */
:deep(.hljs) {
  overflow-x: auto;
}

:deep(.hljs::-webkit-scrollbar) {
  width: 12px !important;
  height: 12px !important;
}

:deep(.hljs::-webkit-scrollbar-thumb) {
  height: 30px !important;
  background: #d1d8e6;
  background-clip: content-box;
  border: 2px solid transparent;
  border-radius: 19px;
  opacity: 0.8;
}

:deep(.hljs::-webkit-scrollbar-thumb:hover) {
  background: #a5b3cf;
  background-clip: content-box;
  border: 2px solid transparent;
}

:deep(.hljs::-webkit-scrollbar-track-piece) {
  width: 30px;
  height: 30px;
  background: #333;
}

::-webkit-scrollbar-button {
  display: none;
}

:deep(.language-xml) {
  width: 90%;
  font-size: 12px;
}

/** 行数样式 */
:deep(.hljs-code-number) {
  padding: 17px 10px 0;
  color: #d1d8e6;
  font-size: 12px;
  list-style: none;
  border-right: 1px solid #d1d8e6;
}

/** 复制样式 */
:deep(.hljs-copy) {
  position: absolute;
  top: 50px;
  right: 30px;
  display: none;
  padding: 0 10px;
  color: #66a9ff;
  font-weight: 700;
  font-size: 10px;
  background-color: #ecf5ff;
  border-radius: 3px;
  cursor: pointer;
}
</style>
