import { createApp } from 'vue';
import injectComponents from './utils/inject-view-ui.js';
import App from './App.vue';
import Router from './routers';
import './style.css';

const app = createApp(App);
// 按需加载ui组件
injectComponents(app);

app.use(Router);
app.mount('#app');
