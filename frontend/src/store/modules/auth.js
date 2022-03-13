//import * as types from '@/store/mutation-types';
import axios from 'axios';

const state = {
  users: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user
};

const actions = {

  signUp({ dispatch }, user) {
    return new Promise(( resolve, reject ) => {
      axios.post('signup', user)
      .then(response => {
        console.log(response.data);
        console.log(user);
    
        dispatch('LogIn', user);
        resolve()
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  },

  LogIn({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('login', user)
      .then((response) => {
        localStorage.setItem("userToken", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;

        commit("setUser", user.get(response.data.firstname));

        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  },

  createPost({ commit, dispatch }, post ) {
    console.log(post);
    return new Promise((resolve, reject) => {
      axios.post('create', post)
      .then((response) => {
        commit("setPosts", response.data);
        console.log(response.data);
        dispatch('GetPosts')
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  GetPosts({ commit }, posts) {
    return new Promise((resolve, reject) => {
      axios.get('posts', posts)
      .then((response) => {
        commit("setPosts", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  GetOnePost({ commit }, post_Id){
    console.log(post_Id);
    return new Promise((resolve, reject) => {
      axios.get(`posts`, post_Id)
      .then((response) => {
        commit("setPosts", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
  
};

const mutations = {
  setUser(state, firstname) {
    state.user = firstname;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },
  logout(state, user) {
    state.user = user;
  },
};


export default {
  
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};