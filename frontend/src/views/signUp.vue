<template>
  <div class="signup">
      <div>
          <form @submit="submitForm">
            <label for="email">email:</label>
            <div :class="{ error: v$.email.$errors.length }">
              <input type="text" name="email" v-model="form.email">
              <span class="error-input" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez ajouter un email valide</span>
            </div>
            <div :class="{ error: v$.password.$errors.length }">
              <label for="password">Mot de Passe:</label>
              <input type="password" name="password" v-model="form.password" required>
              <span class="error-input" v-if="(!$v.password.required && $v.password.$dirty)">Veuillez ajouter un mot de passe valide</span>
            </div>
            <div :class="{ error: v$.lastname.$errors.length }">
              <label for="lastname">Nom:</label>
              <input type="text" name="lastname" v-model="form.lastname" required>
              <span class="error" v-if="(!$v.lastname.required && $v.lastname.$dirty)">Veuillez ajouter votre prenom et nom de famille </span>
            </div>
            <div :class="{ error: v$.firstname.$errors.length }">
              <label for="firstname">Prénom:</label>
              <input type="text" name="firstname" v-model="form.firstname" required>
              <span class="error" v-if="(!$v.firstname.required && $v.firstname.$dirty)">Veuillez ajouter votre prenom et nom de famille </span>
            </div>
            <button type="submit">S'inscrire</button>
          </form>
      </div>
      <p v-if="showError" id="error">email déjà utilisé</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
  import useVuelidate from '@vuelidate/core'
  import {  required, email } from '@vuelidate/validators'
  

  export default {
    name: 'signUp',
    components: {},
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        form: {
          email: "",
          password: "",
          lastname: "",
          firstname:"",
        },
        showError: false
      };
    },
    validations () {
      return {
        firstName: { required }, // Matches this.firstName
        lastName: { required }, // Matches this.lastName
        email: { required, email }, // Matches this.contact.email
        password: { required, valid: function (value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          return containsUppercase && containsLowercase && containsNumber;
          },
        }
      }
    },
    methods: {
      /*createUser() {
        this.submited = true;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          // Verifie que utilisateur a bien remplie tout les champs
          if (form.email == "" || form.password == "" || form.lastname == "" || form.firstname == "") {
            form = {
              userVerification: false,
            };
          } // Permet d'envoyer les information pour la creation d'un profil
        }
      },*/
      ...mapActions("auth",["signUp"]),
      async submitForm(e) {
         e.preventDefault();
        //if ( createUser() == true){
          try {
            await this.signUp(this.form);
            this.$router.push("/posts");
            this.showError = false
          } 
          catch (error) {
            this.showError = true
          }
      },
    },
  };
</script>
