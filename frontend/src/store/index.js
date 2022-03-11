import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';


// Create store

export default createStore({

  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: { auth },
  plugins: [ createPersistedState()]
});
