<template>
  <div class="home">
    <img id ="nav__image" src="../assets/logo-banner-update-3.png"/>
    <h1 id="nav__text">Avec Groupomania, partagez et restez en contact avec vos collaborateurs.</h1>
    <div>
    <p>Bienvenue sur Groupomania le réseau social qui vous ressemble !</p>
    </div>
  </div>
   <!--<div v-for="(user) in users" :key="user.id">-->
     
     <button @click="deleteUser()">Supprimer mon compte</button>
   <!--</div>-->
</template>

<script>

  import { mapGetters } from "vuex";
  import VueJwtDecode from "vue-jwt-decode";
  export default {
    name: 'HomeView',
    components: {
    },

      data() {
      return {
        users: [],
        userId: "",
        isAdmin: 0,
        email: "",
        password: "",
      };
    },

    computed: {
      ...mapGetters({User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters({Comms:'SetComments'}),
    },
    /*mounted() {
    this.getOneUser() {
    this.userId = VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId;
    this.admin = VueJwtDecode.decode(localStorage.getItem("AccessToken")).isAdmin;
    },
  },*/
  methods: {
    deleteUser() {
       const userId = VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId;
          this.$store.dispatch("deleteUser", { userId });
    },
  },
  }
</script>