import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "@/firebase"; 
import SignUpPage from "@/views/SignUpPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: SignUpPage },
  { path: "/login", component: LoginPage },
  { path: "/home", component: HomePage, meta: { requiresAuth: true } },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (user) {
        store.commit("setUser", user);
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next(); 
    }
  });
});

export default router;
