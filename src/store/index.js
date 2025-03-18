import Vue from 'vue';
import Vuex from 'vuex';
import 'firebase/auth';
import {signInWithEmailAndPassword, signOut} from '../firebase'
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
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(email, password);
        const user = userCredential.user;


        commit('setUser', {
          uid: user.uid,
          email: user.email,
        });

        return user; 
      } catch (error) {
        throw new Error(error.message); 
      }
    },
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
