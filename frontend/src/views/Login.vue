<template>
  <div class="login">
    <div class="form__container">
      <form @submit.prevent="submit">
        <div class="input__container">
          <label for="email">email:</label>
          <input type="text" name="email" v-model="form.email" />
        </div>
        <div>
          <label for="password">Mot de Passe:</label>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Se Connecter</button>
      </form>
      <p v-if="showError" id="error">L'email ou le Mot de Passe est incorrect</p>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {  required, email } from '@vuelidate/validators'
import { mapActions } from "vuex"; 
  
  export default {
    name: "LogIn",
    components: {},
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
        showError: false
      };
      },
      validations () {
        return {
          firstName: { required }, // Matches this.firstName
          lastName: { required }, // Matches this.lastName
          contact: {
          email: { required, email }, // Matches this.contact.email
          password: { required }
        }

      }
    },
    methods: {
      ...mapActions(["LogIn"]),
      async submit() {
        const User = new FormData();
        User.append("email", this.form.email);
        User.append("password", this.form.password);
        try {
            await this.LogIn(User);
            this.$router.push("/posts");
            this.showError = false
        } catch (error) {
          this.showError = true
        }
      },
    },
  };
</script>

<style>
    body {
    display: flex;
    justify-content: center;
    font-family: Roboto, Arial, sans-serif;
    font-size: 15px;
    }
    form {
    border: 5px solid #f1f1f1;
    }
    input[type=text], input[type=password] {
    width: 100%;
    padding: 16px 8px;
    margin: 16px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    }
    .icon {
    font-size: 110px;
    display: flex;
    justify-content: center;
    color: #4286f4;
    }
    button {
    background-color: #4286f4;
    color: white;
    padding: 14px 0;
    margin: 10px 0;
    border: none;
    cursor: grab;
    width: 48%;
    }
    h1 {
    text-align:center;
    font-size:18;
    }
    button:hover {
    opacity: 0.8;
    }
    .container {
    padding: 16px 0;
    text-align:left;
    }
    span.psw {
    float: right;
    padding-top: 0;
    padding-right: 15px;
    }
    /* Change styles for span on extra small screens */
    @media screen and (max-width: 300px) {
        span.psw {
        display: block;
        float: none;
        }
    }
</style>



