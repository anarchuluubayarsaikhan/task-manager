import Vue from 'vue';
import Vuex from 'vuex';
import 'firebase/auth';
import { signOut} from '../firebase'
Vue.use(Vuex); 

export default new Vuex.Store({
  state: {
    user: null, 
  },
  mutations: {
    setUser(state, user) {
      state.user = user; 
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async logout({ commit }) {
      try {
        await signOut(); 
        commit('clearUser');
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
  },
  getters: {
    user: (state) => state.user,
  },
});
