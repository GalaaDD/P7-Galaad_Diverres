import axios from "axios";


const state = {
  user: null,
  posts: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
};

const actions = {
  async signUp({dispatch}, form) {
    await axios.post('/api/user/signup', form)
    let UserForm = new FormData()
    UserForm.append('email', form.email)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },  

  async LogIn({commit}, user) {
    await axios.post("/api/user/login", user);
    await commit("setUser", user.get("email"));
  },

  async CreatePost({ dispatch }, post) {
    await axios.post("/api/post/post", post);
    return await dispatch("GetPosts");
  },

  async GetPosts({ commit }) {
    let response = await axios.get("/api/post/posts");
    commit("setPosts", response.data);
  },

  async LogOut({ commit }) {
    let user = null;
    commit("/api/user/logout", user);
  },

};

const mutations = {
  setUser(state, email ) {
    state.user = email;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },

  logout(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,

};