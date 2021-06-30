import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/premit'

import VueCompositionApi from '@vue/composition-api'; 
Vue.use(VueCompositionApi);

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './styles/main.scss'

Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
