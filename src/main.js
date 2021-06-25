import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.scss'
import { Message } from 'element-ui'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
