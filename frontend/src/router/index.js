import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
import Home from "../views/Home";
import Signup from "../views/signUp";
import Login from "../views/Login";
import Posts from "../views/Posts";

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup,
    meta: { guest: true },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/posts',
    name: 'PostS',
    component: Posts,
    meta: { guest: true },
  },
];

const router = createRouter({
  base: process.env.BASE_URL,
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;