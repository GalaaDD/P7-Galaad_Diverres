import { createRouter, createWebHistory } from 'vue-router'
//import store from "../store";
import Home from "../views/Home";
import Signup from "../views/signUp";
import Login from "../views/Login";
import Posts from "../views/createPost";
import postsDisplay from "../views/postsDisplay";
import createComment from "../views/createComment";
import CommentView from "../views/comment";
import adminPosts from "../views/adminPosts";
import NotFound from "../views/NotFound.vue";
import update from "../views/update.vue";

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home,
    meta: { 
      requiresAuth: true,
      title: 'Accueil'
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup,
    meta: {
      guest: true,
      title: 'Inscription'
    },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: Login,
    meta: { 
      guest: true,
      title: 'Connexion'
    },
  },
  {
    path: '/update/:userId',
    name: 'updateUser',
    meta: { requiresAuth: true},
  },
  {
    path: '/delete/:userId',
    name: 'deleteUser',
    meta: { requiresAuth: true},
  },
  {
    path: '/posts',
    name: 'PostS',
    component: Posts,
    meta: { 
      requiresAuth: true,
    }, //requiresAuth: true
  },
  {
    path: '/post',
    name: 'createPost',
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/post/display',
    name: 'postsDisplay',
    component: postsDisplay,
    meta: { 
      requiresAuth: true,
      title: 'Publications',
    }, //requiresAuth: true
  },
  {
    path: '/post/:id',
    name: 'deletePost',
    component: postsDisplay,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/post/:id',
    name: 'updatePost',
    component: postsDisplay,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/post/admin',
    name: 'adminPosts',
    component: adminPosts,
    meta: {
      requiresAuth: true,
      title: 'Administrateur-Publications à modérer'
    }, //requiresAuth: true
  },
  {
    path: '/post/moderation/',
    name: 'canBeDisplay',
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/comment',
    name: 'createComment',
    component: createComment,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    path: '/comment/post/:postId',
    name: 'CommentsView',
    component: CommentView,
    meta: { requiresAuth: true }, //requiresAuth: true
  },
  {
    name: 'Not Found',
    path: '/:pathMatch(.*)',
    component: NotFound,
    meta: {
      requiresAuth: true,
      title: '404 Not Found'
      }, //requiresAuth: true
  },
  {
    name: 'update',
    path: '/update',
    component: update,
    meta: {
      requiresAuth: true,
      title: 'Modifications'
      }, //requiresAuth: true
  },
];

const router = createRouter({
  base: process.env.BASE_URL,
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to, from) => {
  console.log(from);
  document.title = to.meta.title;
});

router.beforeResolve((to, from, next) => {
  if (to.meta.guest) {
    next();
  } else if (to.meta.requiresAuth) {
    const getToken = localStorage.getItem("AccessToken");
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
    const getToken = localStorage.getItem("AccessToken");
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