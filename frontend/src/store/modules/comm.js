import axios from 'axios';
//import { inject } from 'vue'

  
const state = {
  comms: null,
};

const getters = {
  StateComms: (state) => state.comms,
};

const actions = {

  createComment({ commit, dispatch }, comm ) {
    return new Promise((resolve, reject) => {
      axios.post('comment', comm)
      .then((response) => {
        commit("setComms", response.data);
        console.log(response.data);
        dispatch('GetComments', response.data)
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  GetComments({ commit }, comms) {
    return new Promise((resolve, reject) => {
      //const id = inject('idPost');
      axios.get('comment/post/', comms)
      .then((response) => {
        commit("setComms", response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  GetOneComment({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`posts` )
      .then((response) => {
        commit("setComms", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  deleteOneComment({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`/deletecomment/:id` )
      .then((response) => {
        commit("setComms", response.data);
        console.log(response.data);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
};

const mutations = {

  setComms(state, comms) {
    state.comms = comms;
  },
};

export default {
  
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};