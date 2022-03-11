<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/posts">Publications</router-link> |
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

import { mapActions } from "vuex";

export default {
name: 'NavBar',
  computed : {
    isLoggedIn : function(){ return localStorage.getItem("userToken")!==null;}
    },
  methods: {
    ...mapActions ('auth', ['LogOut']),
    logout (){
      this.$store.dispatch('LogOut')
      this.$router.push('/login')
    }
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
  color: #689ef6;
}
</style>