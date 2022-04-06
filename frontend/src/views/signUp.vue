<template>
  <div class="signup">
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="submit" role="main">
        <div class="input__container">
          <label>email:
            <input
              type="text"
              name="email"
              placeholder="email"
              v-model="state.email"
              required
            />
          </label>
          <span v-if="v$.email.$errors" class="error-Message__container">
            <p v-for="error of v$.email.$errors" :key="error.$uid">
              <strong>{{ error.$message }}</strong>
            </p>
          </span>
        </div>
        <div class="input__container">
          <label>Mot de Passe:
            <input
              type="password"
              name="password"
              v-model="state.password"
              required
            />
          </label>
          <span v-if="v$.password.$errors" class="error-Message__container">
            <p v-for="error of v$.password.$errors" :key="error.$uid">
              <strong>{{ error.$message }}</strong>
            </p>
          </span>
        </div>
        <div class="input__container">
          <label>Nom:
            <input
              type="text"
              name="lastname"
              v-model="state.lastname"
              required
            />
          </label>
          <span v-if="v$.lastname.$errors" class="error-Message__container">
            <p v-for="error of v$.lastname.$errors" :key="error.$uid">
              <strong>{{ error.$message }}</strong>
            </p>
          </span>
        </div>
        <div class="input__container">
          <label>Prénom:
            <input
              type="text"
              name="firstname"
              v-model="state.firstname"
              required
            />
          </label>
          <span v-if="v$.firstname.$error" class="error-Message__container">
            <p v-for="error of v$.firstname.$errors" :key="error.$uid">
              <strong>{{ error.$message }}</strong>
            </p>
          </span>
        </div>
        <button type="submit" title="Bouton pour valider l'inscription" role="button">S'inscrire</button>
      </form>
    </div>
    <!--<p  id="error">email déjà utilisé</p>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength, /*helpers,*/ } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "signUp",
  components: {},

  //validation system, vuelidate
  setup() {
    const state = reactive({
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      //showError: false,
    });

    /*const mustBeEmail = (value) => value.includes('email')
    const mustBePassword = (value) => value.includes('Mot de Passe')
    const mustBeFirstname = (value) => value.includes('prénom')
    const mustBeLastname = (value) => value.includes('nom')*/


    const rules = computed(() => {
      return {
        email: {
          required,
          email,
          /*mustBeEmail: helpers.withMessage(
            'Adresse email invalide', 
            mustBeEmail
          ),*/
        },
        password: { required,
          minLength: minLength(8),
          /*mustBePassword: helpers.withMessage(
            'Le mot de passe doit contenir 8 charactères, contenant un chiffre, une majuscule, une minuscule et un caractère spécial', 
            mustBePassword
          ),*/
        },
        lastname: { required,
          minLength: minLength(2),
          /*mustBeFirstname: helpers.withMessage(
            'Veuillez indiquer votre Prénom', 
            mustBeFirstname
          ), */
        },
        firstname: { required,
          minLength: minLength(2),
          /*mustBeLastname: helpers.withMessage(
            'Veuillez indiquer votre Nom de famille', 
            mustBeLastname
          ),*/
        },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        alert("L'inscription est un succès");
        try {
          console.log(this.state);
          //calling and sending form to the function in the store
          this.signUp({
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
          });
          //window.location.reload();
        } catch (error) {
          alert("Un problème technique vient de se produire, veuillez essayer à nouveau");
        }
      } else {
        alert("veuillez vérifier chacunes des informations afin de valider votre inscription");
      }
    },
  },
};
</script>

<style>

  .error-Message__container{
    color: red;
    text-align: center;
  }
</style>
