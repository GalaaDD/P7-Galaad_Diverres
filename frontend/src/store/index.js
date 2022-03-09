import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import SecureLS from "secure-ls";
let ls = new SecureLS({ isCompression: false });

// Create store

export default createStore({

  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: { auth },
  plugins: [ createPersistedState({
    key: "keyname",
    paths: window.localStorage,
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.removeAll(key),
    expires: 1,
  }),]
});
