import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

// 引入路由对象实例
import router from './router'
app.use(router)

// 引入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)



app.mount('#app')
