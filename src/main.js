import Vue from 'vue'
import App from './App.vue'
import AppLogin from './components/Login.vue';
import AppQuests from './components/Quests.vue';
import AppUnderQuests from './components/UnderQuests.vue';
import AppAddQuests from './components/AddQuests.vue';
import AppAddUnderQuests from './components/AddUnderQuests.vue';
import AppAccepting from './components/Accepting.vue';
import AppAlerting from './components/Alerting.vue';
import axios from 'axios';
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.component('AppLogin', AppLogin);
Vue.component('AppQuests', AppQuests);
Vue.component('AppUnderQuests', AppUnderQuests);
Vue.component('AppAddQuests', AppAddQuests);
Vue.component('AppAddUnderQuests', AppAddUnderQuests);
Vue.component('AppAccepting', AppAccepting);
Vue.component('AppAlerting', AppAlerting);

window.axios = axios
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
