import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/premit'
import global from '@/utils/global.js'
import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);

import ElementUI from 'element-ui';

import { buttonPermission } from './utils/buttonPermission'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.scss'
import btnPerm from './utils/btnPerm'

Vue.config.productionTip = false
Vue.prototype.btnPerm = buttonPermission
Vue.use(global)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
