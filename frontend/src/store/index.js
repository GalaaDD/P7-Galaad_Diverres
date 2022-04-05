import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';

// Create store and of vuex 

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
    // function to signup the guest and dispatch to the login function with email and password to allow the connexion
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
  //function to log in, connect to the session with email and password, comparing the password hashes
    LogIn({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post('login', user)
        .then((response) => {
          localStorage.setItem("AccessToken", response.data.token);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
  
            commit("setUser", response.data);
            location.reload();
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
      });
    },
    //function to log out of the session allowing to clear local storage and vuex informations
    LogOut({ commit }) {
      let user = null;
      commit("logout", user);
    },
    //function to delete a user account, dipatch the logout
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
    //function to update user, dispatch logout to update and log in with new email and password
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

    //function to create a post, dispatch Getposts to get and display posts
    createPost({ commit, dispatch }, post ) {
      console.log(post);
      return new Promise((resolve, reject) => {
        axios.post('post', post)
        .then((response) => {
          commit("setPosts", post);
          console.log(response);
          dispatch('GetPosts', post)
          resolve(response.data);
          //location.reload();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  // function to update selected post
    updatePost({ commit }, payload, postId ) {
      //let postId = payload.post_id;
      console.log("payload", payload);
      console.log("postId", postId);
      return new Promise((resolve, reject) => {
        axios
          .put(`/post/` + postId, payload)
          .then((response) => {
            commit("setPosts", payload);
            console.log(payload);
            console.log(response.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  //function  to get and display posts
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
  //function to delete one post using the post Id
    deleteOnePost({ commit }, payload){
      console.log(payload);
      let postId = payload;
      return new Promise((resolve, reject) => {
        axios.delete(`/post/`+ postId)
        .then((response) => {
          commit;
          console.log(response.data);
          //location.reload();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    /***Content-comment-Part ***/
    //function to create a comment 
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
    //function to get and display comments
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
