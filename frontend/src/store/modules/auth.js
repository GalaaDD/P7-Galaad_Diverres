//import * as types from '@/store/mutation-types';
import axios from "axios";

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

  signUp({ dispatch }, payload) {
    return new Promise(( resolve, reject ) => {
      axios.post('signup', payload)
      .then(res => {
        console.log(res.data);
        resolve()
       dispatch('LogIn', payload)
      })
      .catch(err => reject(err))
    });
  },
  LogIn({ commit }, payload) {
    return new Promise(( resolve, reject ) => {
      axios.post('login', payload)
      .then(res => {
        console.log(res.data);
        resolve()
        commit("setUser", payload)
      })
      .catch(err => reject(err))
    })
  },

  CreatePost({ dispatch }, post) {
    return new Promise(( resolve, reject ) => {
      axios.post('post', post)
      .then(res => {
        console.log(res.data);
        resolve()
        return dispatch("GetPosts");
      })
      .catch(err => reject(err))
    })
  },

  GetPosts({ commit }) {
    return new Promise(( resolve, reject ) => {
      let payload = axios.get("posts")
      .then(res => {
        console.log(res);
        resolve()
        commit("setPosts", payload);
      })
      .catch(err => reject(err))
    })
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