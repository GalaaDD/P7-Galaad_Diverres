<template>
  <div class="home">
    <img id ="nav__image" src="../assets/logo-banner-update-3.png"/>
    <h1 id="nav__text">Avec Groupomania, partagez et restez en contact avec vos collaborateurs.</h1>
    <div>
    <p>Bonjour, {{ User }} !!!  Bienvenue sur Groupomania le réseau social qui vous ressemble !</p>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from "vuex";

  export default {
    name: 'HomeView',
    components: {
    },
    computed: {
       ...mapGetters('auth' , {Posts: 'StatePosts', User: 'StateUser'}),
    },
  }
</script>