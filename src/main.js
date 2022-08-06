import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from "vue-sweetalert2";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
