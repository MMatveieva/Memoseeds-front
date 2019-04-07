// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueCookies from "vue-cookies"
import VueSweetalert2 from 'vue-sweetalert2'
import VueTheMask from 'vue-the-mask'


Vue.use(VueTheMask);
Vue.use(VueSweetalert2);
Vue.use(VueCookies);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
