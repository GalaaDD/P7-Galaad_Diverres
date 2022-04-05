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
          <span v-if="v$.email.$errors">
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
          <span v-if="v$.password.$errors">
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
          <span v-if="v$.lastname.$errors">
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
          <span v-if="v$.firstname.$error">
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
import { required, email, minLength } from "@vuelidate/validators";
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

    const rules = computed(() => {
      return {
        email: {
          required,
          email,
        },
        password: { required, minLength: minLength(8) },
        lastname: { required, minLength: minLength(2) },
        firstname: { required },
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
        alert("veuillez remplir chacun des champs, l'inscription n'a pas pu aboutir");
      }
    },
  },
};
</script>
