<template>
  <div class="home" id="header" >
    <div v-if ="User || User.Admin == 1">
        <img id ="nav__image" src="../assets/logo-banner-update-3.png" alt="Logo du réseau social d'entreprise Groupomania"/>
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
        <label>Modifier mon Adresse Email
          <input type="email" v-model="state.email" placeholder="groupomania@gr.com" required /><br>
          <p v-for="error of v$.email.$errors" :key="error.$uid">
            <strong>{{ error.$message }}</strong>
          </p>
        </label>
      </div>

      <div class="form-container">
        <label>Modifier mon Mot de passe
          <input type="password" v-model="state.password" placeholder="Mot de passe" required /><br>
          <p v-for="error of v$.password.$errors" :key="error.$uid">
            <strong>{{ error.$message }}</strong>
          </p>
        </label>
      </div>

      <div class="form-container">
        <label>Modifier mon Nom de famille
          <input type="text" v-model="state.lastname" placeholder="Nom de famille" required /><br>
          <p v-for="error of v$.lastname.$errors" :key="error.$uid">
            <strong>{{ error.$message }}</strong>
          </p>
        </label>
      </div>

      <div class="form-container">
        <label>Modifier mon Prénom
          <input type="text" v-model="state.firstname" placeholder="Prénom" required /><br>
          <p v-for="error of v$.firstname.$errors" :key="error.$uid">
            <strong>{{ error.$message }}</strong>
          </p>
        </label>
      </div>
      <button @click="updateUserOnClick()" title="valider la modification des informations de votre compte" role="button">Modifier mon compte</button>
      <h2>Suppression du compte utilisateur:</h2>
      <button @click="deleteUser()" title="confirmer la suppression de votre compte Groupomania" role="button">Supprimer mon compte</button>
    </div>
</template>

<script>

  import { mapGetters, mapActions } from "vuex";
  import useValidate from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import { reactive, computed } from 'vue'
  import VueJwtDecode from "vue-jwt-decode";
  export default {
    name: 'HomeView',
    components: {
    },

    setup() {
      const state = reactive({
        email: "",
        password: "",
        lastname: "",
        firstname:"",
        showError: false
      })

      const rules = computed(() => {
        return {
          email: { required, email },
          password: { required, minLength:minLength(6) },
          lastname: { required, minLength:minLength(2) },
          firstname: { required, minLength:minLength(2) },
        }
      })

      const v$ = useValidate(rules, state)

      return {
        state,
        v$,
      }
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
        this.v$.$validate()
        if (!this.v$.$error) {
          alert('Form successfully submitted.')
          const email = this.state.email;
          const password = this.state.password;
          const userId = this.state.userId;
          const firstname = this.state.firstname;
          const lastname = this.state.lastname;
          this.$store.dispatch("updateUser", {
            email,
            password,
            userId,
            firstname,
            lastname,
          })
        } else {
          alert('Form failed validation')
        }
      },
    },
  }
</script>

<style scope>
  input{
    width: 45%;
    height: 1.6rem;
    border-radius: 0.8rem;
    margin:  5% 0.5% 5% 0.5% ;
  }
  button{
    border-radius: 1rem;
  }
</style>
