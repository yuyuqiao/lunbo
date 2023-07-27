import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
// 公共样式
import '@/style/common.css'
// 全局组件
import globalComponents from '@/components';
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
// title
import VueWechatTitle from 'vue-wechat-title' 

import router from "./router"
import store from "./store"
const app = createApp(App);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(router)
app.use(store)
app.use(globalComponents)
app.use(VueWechatTitle);
app.mount('#app');