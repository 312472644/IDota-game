import { createApp } from 'vue';
import injectComponents from './utils/inject-view-ui.js';
import './style.css';
import App from './App.vue';

const app = createApp(App);

// 按需加载ui组件
injectComponents(app);
app.mount('#app');
