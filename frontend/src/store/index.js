import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

// Create store

export default createStore({

  state: {
     /***Auth-Part ***/
    user: [],
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

    signUp({ commit, dispatch }, user) {
      return new Promise(( resolve, reject ) => {
        axios.post('signup', user)
        .then(response => {
          console.log(response.data);
          console.log(user);
          commit("setUser", response.data.firstname);
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
          localStorage.setItem("AccessToken", response.data.token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
  
            commit("setUser", response.data);
  
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
    deleteUser({ commit }, user){
      console.log(user);
      let userId = user.userId;
      return new Promise((resolve, reject) => {
        axios.delete(`/delete/`+ userId )
        .then((response) => {
          console.warn(response);
          commit("logout", response.data);
          console.log(response.data);
          location.reload();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    updateUser({ commit }, payload){
      const userId = payload.userId;
      return new Promise((resolve, reject) => {
        axios.patch(`/update/`+ userId, payload)
        .then((response) => {
          commit("logout", payload);
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
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
          commit("setPosts", post);
          console.log(response);
          dispatch('GetPosts', 'updatePost', response.data)
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    updatePost({ commit }, post ){
      let postId = post;
      console.log(post);
      return new Promise((resolve, reject) => {
        axios.put(`/post/`+ postId )
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
  
    canBeDisplay( {commit}, payload ){
      let postId = payload.post_id;
      console.log(postId);
      return new Promise((resolve, reject) => {
        axios.put(`/post/moderation/`)
        .then((response) => {
          console.log(response.data);
          location.reload();
          commit;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },

    GetPostsAdmin({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('post/admin')
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

    GetPosts({ commit, /*dispatch*/ }) {
      return new Promise((resolve, reject) => {
        axios.get('post/display')
        .then((response) => {
          commit("setPosts", response.data);
          //dispatch('deleteOnePost', response.data.id);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  
    deleteOnePost({ commit }, post){
      console.log(post);
      let postId = post;
      return new Promise((resolve, reject) => {
        axios.delete(`/post/`+ postId)
        .then((response) => {
          commit;
          console.log(response.data);
          location.reload();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
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
      let postId = comment.post_id;
      return new Promise((resolve, reject) => {
        axios.get(`comment/post/`+ postId)
        .then((response) => {
          commit("setComments", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  
  },
  mutations: {
    /***Auth-Part ***/
    setUser(state, firstname) {
      state.user = firstname;
    },

    /*reset(state) {
      Object.keys(state).forEach(key => {
        state[key] = null; // or = 
      });
    },*/
    /*localStorage.clear("AccessToken");
    localStorage.clear*/
    
    logout(state, user) {
      state.user = user;
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("vuex");
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
