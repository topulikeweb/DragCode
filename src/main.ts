import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 引入暗色主题
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createPinia } from 'pinia';
import { VueDraggableNext } from 'vue-draggable-next';
import router from './router/index.ts';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

//注册组件
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(hljsVuePlugin);
app.use(ElementPlus);
app.use(router);
app.component('draggable', VueDraggableNext);
app.mount('#app');
