import { createRouter, createWebHistory } from 'vue-router'
//import store from "../store";
import Home from "../views/Home";
import Signup from "../views/signUp";
import Login from "../views/Login";
import Posts from "../views/createPost";
import postsDisplay from "../views/postsDisplay";
import postPage from "../views/postPage";
import createComment from "../views/createComment";
import CommentView from "../views/comment";


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home,
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/create',
    name: 'createPost',
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/postsdisplay',
    name: 'postsDisplay',
    component: postsDisplay,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/post',
    name: 'postPage',
    component: postPage,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/createcomment',
    name: 'createComment',
    component: createComment,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/:id',
    name: 'Comment',
    component: createComment,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/comments',
    name: 'CommentsView',
    component: CommentView,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
];

const router = createRouter({
  base: process.env.BASE_URL,
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeResolve((to, from, next) => {
  if (to.meta.guest) {
    next();
  } else if (to.meta.requiresAuth) {
    const getToken = localStorage.getItem("userToken");
    if (!getToken) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  }
});

router.beforeResolve((to, from, next) => {
  if (to.meta.requiresAuth) {
    next()
  } else if (to.meta.guest) {
    const getToken = localStorage.getItem("userToken");
    if (getToken) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  }
});



export default router;