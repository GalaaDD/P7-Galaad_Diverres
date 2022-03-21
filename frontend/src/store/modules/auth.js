/*import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
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
        localStorage.setItem("AccessToken", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;

        commit("setUser", user.get(response.data.email));

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

  deleteUser({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`/deletecomment/:id` )
      .then((response) => {
        commit("SetUser", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
  updateUser({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`/updateuser/:id` )
      .then((response) => {
        commit("SetUser", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
  getOneUser({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`/user/:id` )
      .then((response) => {
        commit("SetUser", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
  
};

const mutations = {
  setUser(state, email) {
    state.user = email;
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
};*/