import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import post from './modules/post';
import comm from './modules/comm';


// Create store

export default createStore({

  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: { auth, post, comm },
  plugins: [ createPersistedState()]
});
