<template>
  <div class="signup">
      <div>
          <form @submit.prevent="submit">
            <label for="email">email:</label>
            <div>
              <input type="text" name="email" v-model="email" required>
            </div>
            <div>
              <label for="password">Mot de Passe:</label>
              <input type="password" name="password" v-model="password" required>
            </div>
            <div>
              <label for="lastname">Nom:</label>
              <input type="text" name="lastname" v-model="lastname" required>
            </div>
            <div>
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
         /* form: {
            email: "",
            password: "",
            lastname: "",
            firstname:"",
         },*/
        email: "",
        password: "",
        lastname: "",
        firstname:"",
        showError: false
      };
    },
    methods: {
      ...mapActions ('auth', ['signUp']),
      async submit() {
        try {
          /*console.log({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          })*/
          //await this.signUp(this.form);
          await this.signUp({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          })
          this.$router.push("/posts");
          this.showError = false
        } 
        catch (error) {
          //console.log(error);
          this.showError = true
        }
      }
    }
  };
</script>
