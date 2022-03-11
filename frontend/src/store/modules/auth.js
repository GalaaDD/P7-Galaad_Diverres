//import * as types from '@/store/mutation-types';
import axios from 'axios';

const state = {
  user: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  statePosts: (state) => state.posts,
  stateUser: (state) => state.user,

};

const actions = {

  signUp({ dispatch, commit }, user) {
    return new Promise(( resolve, reject ) => {
      axios.post('signup', user)
      .then(response => {
        console.log(response.data);
        console.log(user);
        commit("user", response.data.user);
        dispatch('LogIn', user);
        resolve()
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  },


  /*signUp({ dispatch }, payload) {
    return new Promise(( resolve, reject ) => {
      axios.post('signup', payload)
      .then(res => {
        console.log(res.data);
        resolve()
        dispatch('LogIn', payload)
        
      })
      .catch(err => reject(err))
    });
  },*/

  LogIn({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('login', user)
      .then((response) => {
        localStorage.setItem("userToken", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;

        commit("setUser", response.data.user);

        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  },
  
  /*LogIn({ commit }, user) {
    return new Promise(( resolve, reject ) => {
      axios.post('login', user)
      .then(res => {
        console.log(res.data);
        resolve()
        let email = res.data.email;
        console.log(email);
        commit('setUser', email);
      })
      .catch(err => reject(err))
    })
  },*/

  createPost({ commit, dispatch }, post) {
    console.log(post);
    return new Promise((resolve, reject) => {
      axios.post('create', post)
      .then((response) => {
        commit("setPosts", response.data);
        console.log(response.data);
        dispatch('GetPosts')
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  /*createPostV2({ commit }, post) {
    console.log(post);
    return new Promise((resolve, reject) => {
      axios.post('createPost', post)
      .then((response) => {
        console.log(response)
        commit("post", post);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  },*/

  /*createPostV1({ dispatch }, post) {
    axios.post("post", post);
    dispatch("GetPosts");
  },*/

  GetPosts({ commit, dispatch }) {
    let response = axios.get('posts');
    commit("setPosts", response.data);
    dispatch('postsDisplay');
  },

  postsDisplay(){
    
  },

  GetOnePost({ commit }) {
    let response = axios.get('post');
    commit("setPosts", response.data);
  },

  LogOut({ commit }) {
    let user = null;
    commit("logout", user);
  },
  
};

const mutations = {


  setUser(state, user) {
    state.user = user;
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

 /*async signUp({dispatch}, form) {
    await axios.post('/signup', form)
    let UserForm = new FormData()
    UserForm.append('email', form.email)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },*/
  
  /*signUp({ dispatch }, payload) {
    return new Promise(( resolve, reject ) => {
      dispatch(types.LOADING, true)
      console.log(payload)
      axios.post('/signup', payload)
      .then((response) => {
        console.log(response)
        resolve()
      })
      .catch(err => reject(err))
    });
  },*/