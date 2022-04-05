<template>
  <div class="login">
    <div class="form__container">
      <form @submit.prevent="submit">
        <div class="input__container">
          <label for="email">email:</label>
          <input type="text" name="email" v-model="state.email" required />
          <span v-if="v$.email.$errors">
            <p v-for="error of v$.email.$errors" :key="error.$uid">
              <strong>{{ error.$message }}</strong>
            </p>
          </span>
        </div>
        <div>
          <label for="password">Mot de Passe:</label>
          <input type="password" name="password" v-model="state.password" required />
          <span v-if="v$.password.$errors">
            <p v-for="error of v$.password.$errors" :key="error.$uid">
              <strong>{{ error.$message }}</strong>
            </p>
          </span>
        </div>
        <button type="submit">Se Connecter</button>
      </form>
      <p v-if="showError" id="error">L'email ou le Mot de Passe est incorrect</p>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import useValidate from "@vuelidate/core";
  import { required, email, minLength } from "@vuelidate/validators";
  import { reactive, computed } from "vue"; 
  export default {
    name: "LogIn",
    components: {},
    setup() {
      const state = reactive({
        email: "",
        password: "",
        //showError: false,
      });

      const rules = computed(() => {
        return {
          email: {
            required,
            email,
          },
          password: { required, minLength: minLength(8) },
        };
      });
      const v$ = useValidate(rules, state);

      return {
        state,
        v$,
      };
    },
    methods: {
        ...mapActions( ['LogIn']),
        submit() {
          this.v$.$validate();
        if (!this.v$.$error) {
          alert("Form successfully submitted.");
          const user = {
            email: this.state.email, 
            password: this.state.password,
          }
          try {
              this.LogIn(user);
              this.$router.push({ name: "HomeView" });
              this.showError = false
          }catch (error) {
            //this.showError = true;
            this.error = error.response.data;
          }
        }else {
          alert("Form failed validation");
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
      border-radius: 1rem ;
      padding: 0.5rem;
    }
    button {
      background-color: #5900FF;
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
    textarea{
      border-radius: 0.8rem;
      border: solid grey 0.15rem;
      margin: 1rem;
    }
    /* Change styles for span on extra small screens */
    @media screen and (max-width: 300px) {
        span.psw {
          display: block;
          float: none;
        }
    }
</style>



