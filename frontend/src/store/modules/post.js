import axios from 'axios';

const state = {
  posts: null,
};

const getters = {
  StatePosts: (state) => state.posts,
};

const actions = {

  createPost({ commit, dispatch }, post ) {
    console.log(post);
    return new Promise((resolve, reject) => {
      axios.post('create', post)
      .then((response) => {
        commit("setPosts", response.data);
        console.log(response.data);
        dispatch('GetPosts', response.data)
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  GetPosts({ commit }, posts) {
    return new Promise((resolve, reject) => {
      axios.get('posts', posts)
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
//attention comment
  /*createComment({ commit }, id ) {
    console.log(id);
    return new Promise((resolve, reject) => {
      axios.post('comment'+id)
      .then((response) => {
        commit("setComms", response.data);
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },*/

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

  deleteOnePost({ commit }){
    return new Promise((resolve, reject) => {
      axios.get(`/deletepost/:id`)
      .then((response) => {
        commit("SetPosts", response.data);
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

  setPosts(state, posts) {
    state.posts = posts;
  },
};


export default {
  
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};