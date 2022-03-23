import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
//import auth from './modules/auth';
//import post from './modules/post';
//import comm from './modules/comm';
import axios from 'axios';

// Create store

export default createStore({

  state: {
     /***Auth-Part ***/
    user: null,
    /***Content-Part ***/
    posts: null,

    comments: [],
  },

  getters: {
     /***Auth-Part ***/
    StateUser: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
    
      /***Content-Part ***/
    StatePosts: (state) => state.posts,
    StateComments: (state) => state.comments,
  },
  actions: {
      /***Auth-Part ***/

    signUp({ dispatch }, user) {
      return new Promise(( resolve, reject ) => {
        axios.post('signup', user)
        .then(response => {
          console.log(response.data);
          console.log(user);
          dispatch('LogIn', response.data.user);
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
          localStorage.setItem("AccessToken", response.data.token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
  
          commit("setUser", user);
  
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      });
    },
    
    LogOut({ commit }) {
      let user = null;
      commit("logout", user);
    },
  
    /*deleteUser({ commit }, userId){
      console.log(userId);
      return new Promise((resolve, reject) => {
        axios.delete(`/deleteuser/${userId}` )
        .then((response) => {
          if (response) {
            localStorage.clear();
          }
          this.$router.push("../Signup");
          commit("LogOut", response.data);
          
          console.log(response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },*/
    updateUser({ commit }, userId){
      return new Promise((resolve, reject) => {
        axios.get(`/updateuser/${userId}` )
        .then((response) => {
          commit("SetUser", response.data.user);
          console.log(response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    getOneUser({ commit }, userId){
      console.log(userId);
      return new Promise((resolve, reject) => {
        axios.get(`/user/${userId}` )
        .then((response) => {
          commit("SetUser", response.data.user);
          console.log(response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    /***Content-post-Part ***/
    createPost({ commit, dispatch }, post ) {
      console.log(post);
      return new Promise((resolve, reject) => {
        axios.post('post', post)
        .then((response) => {
          commit("setPosts", response.data);
          console.log(response.data);
          dispatch('GetPosts', 'updatePost', response.data)
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    updatePost({ commit }, userId){
      let formData = new FormData();
      formData.append("userId", userId);
      console.log(userId);
      return new Promise((resolve, reject) => {
        axios.put(`/post/${userId}` )
        .then((response) => {
          commit("SetUser", response.data.user);
          console.log(response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  
    GetPosts({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('post/display')
        .then((response) => {
          commit("setPosts", response.data);
          //dispatch('createComment', response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    
    GetOnePost({ commit }, posts){
      console.log(posts);
      return new Promise((resolve, reject) => {
        axios.get(`post/:id` )
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
  
    /*deleteOnePost({ commit }, post){
      console.log(post);
      return new Promise((resolve, reject) => {
        axios.delete(`/post/${post.IdPost}`)
        .then((response) => {
          commit("SetPosts", response.data);
          console.log(response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },*/
    /***Content-comment-Part ***/
    createComment({ commit, dispatch }, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios.post('comment', payload)
        .then((response) => {
          commit("setComments", payload);
          console.log(response.data);
          dispatch('GetComments', payload)
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  
    GetComments({ commit }, comment) {
      return new Promise((resolve, reject) => {
        axios.get(`comment/post/${comment.post_id}`)
        .then((response) => {
          commit("setComms", response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  
    /*deleteOneComment({ commit }, comment){
      return new Promise((resolve, reject) => {
        axios.delete(`/deletecomment/${comment.idComment}` )
        .then((response) => {
          commit("setComms", response.data);
          console.log(response.data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },*/
  
  },
  mutations: {
    /***Auth-Part ***/
    setUser(state, user) {
      state.user = user;
    },
  
    logout(state, user) {
      state.user = user;
    },
    /***Content-Part ***/
    setPosts(state, posts) {
      state.posts = posts;
    },
    setComments(state, comments) {
      state.comments.push(comments);
    },
  },
  //modules: { auth, post, comm },
  plugins: [ createPersistedState()],
  namespaced: true,
});
