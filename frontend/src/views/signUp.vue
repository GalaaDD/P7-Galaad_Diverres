<template>
  <div class="signup">
      <div>
          <form @submit.prevent="submit">
           
            <div class="input__container">
               <label for="email">email:</label>
              <input type="text" name="email" v-model="email" required>
            </div>
            <div class="input__container">
              <label for="password">Mot de Passe:</label>
              <input type="password" name="password" v-model="password" required>
            </div>
            <div class="input__container">
              <label for="lastname">Nom:</label>
              <input type="text" name="lastname" v-model="lastname" required>
            </div>
            <div class="input__container">
              <label for="firstname">Prénom:</label>
              <input type="text" name="firstname" v-model="firstname" required>
            </div>
            <button type="submit">S'inscrire</button>
          </form>
      </div>
      <p v-if="showError" id="error">email déjà utilisé</p>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: 'signUp',
    components: {},
    data() {
      return {
        email: "",
        password: "",
        lastname: "",
        firstname:"",
        showError: false
      };
    },
    methods: {
      ...mapActions ( ['signUp']),
      submit() {
        try {
          this.signUp({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          })
          window.location.reload();
          this.$router.push({ name: "HomeView" });
          this.showError = false
        } 
        catch (error) {
          this.showError = true;
        }
      }
    }
  };
</script>
