import Vue from 'vue'
import VueCookies from 'vue-cookies';
import App from './App.vue'
import Buefy from 'buefy';
import '@mdi/font/css/materialdesignicons.css';
import 'buefy/dist/buefy.css';
import router from './routes'; // Ruta correcta al archivo de configuración de Vue Router



Vue.use(Buefy);
Vue.use(VueCookies);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
