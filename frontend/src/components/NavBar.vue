<template>
  <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/post/display">Fil d'actualités</router-link> |
      <div v-if="User">
        <span v-if="User.Admin == 1">
          <router-link to="/post/admin">Publications à modérer</router-link> |
        </span>
      </div>
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

import { mapActions,mapGetters } from "vuex";
/*import VueJwtDecode from "vue-jwt-decode";*/
export default {
name: 'NavBar',
  data() {
      return {
        content: "",
        /*Admin: VueJwtDecode.decode(localStorage.getItem("AccessToken")).Admin,*/
      };
  },
  computed : {

  ...mapGetters({User: 'StateUser'}),

    isLoggedIn : function(){ 
      return this.$store.getters.isAuthenticated;
    }, // return  localStorage.getItem("AccessToken")!==null;}}
  },
  methods: {
    ...mapActions (['LogOut']),
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
  font-size: 1rem;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #689ef6;
}

</style>