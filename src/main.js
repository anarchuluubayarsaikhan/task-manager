import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import store from './store';
import { auth } from './firebase';

Vue.config.productionTip = false
Vue.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,  
})


auth.onAuthStateChanged(user => {
  store.commit('setUser', user);
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')




