import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import moment from 'moment';
import VueResource from 'vue-resource';
import axios from 'axios';
import htmlToPdf from '@/components/user/htmlToPdf.js';
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(iView);
Vue.use(htmlToPdf);
Vue.use(moment)
Vue.prototype.$ajax = axios;
Vue.prototype.moment = moment;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
