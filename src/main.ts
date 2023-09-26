import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 引入暗色主题
import 'element-plus/theme-chalk/dark/css-vars.css';
import { createPinia } from 'pinia';
import { VueDraggableNext } from 'vue-draggable-next';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus);
app.component('draggable', VueDraggableNext);
app.mount('#app');
