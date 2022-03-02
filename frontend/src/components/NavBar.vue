<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/posts">Posts</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Se déconnecter</a>
    </span>
    <span v-else>
      <router-link to="/signup">S'inscrire</router-link> |
      <router-link to="/login">Se Connecter</router-link>
    </span>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "NavBar",
  data() {
    return {
      usersid: VueJwtDecode.decode(localStorage.getItem("token")).userId,
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>