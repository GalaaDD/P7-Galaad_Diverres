<template>
  <div class="home">
    <img id ="nav__image" src="../assets/logo-banner-update-3.png"/>
    <h1 id="nav__text">Avec Groupomania, partagez et restez en contact avec vos collaborateurs.</h1>
    <div>
    <p>Bienvenue sur Groupomania le réseau social qui vous ressemble !</p>
    </div>
    <div v-if="User" class="user-information__container">
      <h2>Informations personnelles </h2>
      <p>email:{{ User.email }}</p>
      <p>Nom de famille:{{ User.lastname }}</p>
      <p>Prénom:{{ User.firstname }}</p>
    </div>
  </div>
  <h2>Modification du compte utilisateur:</h2>
  <div class="form-container">
    <label for="email">Modifier mon Adresse Email</label>
    <input type="email" v-model="email" placeholder="groupomania@gr.com" required /><br>
  </div>

  <div class="form-container">
    <label for="password">Modifier mon Mot de passe</label>
    <input type="password" v-model="password" placeholder="Mot de passe" required /><br>
  </div>

  <div class="form-container">
    <label for="password">Modifier mon Nom de famille</label>
    <input type="text" v-model="lastname" placeholder="Nom de famille" required /><br>
  </div>

  <div class="form-container">
    <label for="password">Modifier mon Prénom</label>
    <input type="text" v-model="firstname" placeholder="Prénom" required /><br>
  </div>
 
  <button @click="updateUserOnClick()">Modifier mon compte</button>

  <h2>Suppression du compte utilisateur:</h2>
  <button @click="deleteUser()">Supprimer mon compte</button>
</template>

<script>

  import { mapGetters, mapActions } from "vuex";
  import VueJwtDecode from "vue-jwt-decode";
  export default {
    name: 'HomeView',
    components: {
    },

    data() {
      return {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        userId: VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId,
      };
    },

    computed: {
      ...mapGetters({User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters({Comments:'StateComments'}),
    },
    methods: {

      ...mapActions( ["deleteUser", "updateUser"]),

      deleteUser() {
        const userId = VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId;
          this.$store.dispatch("deleteUser", { userId });
      },
      updateUserOnClick() {
        
        const email = this.email;
        const password = this.password;
        const userId = this.userId;
        const firstname = this.firstname;
        const lastname = this.lastname;
        this.$store.dispatch("updateUser", {
          email,
          password,
          userId,
          firstname,
          lastname,
        })
      },
    },
  }
</script>

<style scope>
  input{
    width: 90%;
    height: 1.6rem;
    border-radius: 0.8rem;
    margin:  5% 0 5% 0 ;
  }
  button{
    border-radius: 1rem;
  }
</style>
