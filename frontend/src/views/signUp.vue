<template>
  <div class="signup">
      <div>
          <form @submit.prevent="submit">
            <div class="input__container">
               <label for="email">email:</label>
              <input type="text" name="email" placeholder="email" v-model="state.email" required>
              <p v-for="error of v$.email.$errors" :key="error.$uid">
                <strong>{{ error.$message }}</strong>
              </p>
              <!--<span v-if="v$.email.$error">
                {{ v$.email.$errors[0].$message }}
              </span>-->
            </div>
            <div class="input__container">
              <label for="password">Mot de Passe:</label>
              <input type="password" name="password" v-model="state.password" required>
              <p v-for="error of v$.password.$errors" :key="error.$uid">
                <strong>{{ error.$message }}</strong>
              </p>
              <span v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
            <div class="input__container">
              <label for="lastname">Nom:</label>
              <input type="text" name="lastname" v-model="state.lastname" required>
              <p v-for="error of v$.lastname.$errors" :key="error.$uid">
                <strong>{{ error.$message }}</strong>
              </p>
              <span v-if="v$.lastname.$error">
                {{ v$.lastname.$errors[0].$message }}
              </span>
            </div>
            <div class="input__container">
              <label for="firstname">Prénom:</label>
              <input type="text" name="firstname" v-model="state.firstname" required>
              <p v-for="error of v$.firstname.$errors" :key="error.$uid">
                <strong>{{ error.$message }}</strong>
              </p>
              <span v-if="v$.firstname.$error">
                {{ v$.firstname.$errors[0].$message }}
              </span>
            </div>
            <button type="submit" title="S'incrire à Groupomania">S'inscrire</button>
          </form>
      </div>
      <!--<p  id="error">email déjà utilisé</p>-->
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import useValidate from '@vuelidate/core'
  import { required, email, minLength, /*helpers*/ } from '@vuelidate/validators'
  import { reactive, computed } from 'vue'
  export default {
    name: 'signUp',
    components: {},
    setup() {
      const state = reactive({
        email: "",
        password: "",
        lastname: "",
        firstname:"",
        showError: false
      })

      //const mustBeLearnVue = (value) => value.includes("learnvue");

      const rules = computed(() => {
        
        return {
          email: { required, email, /*mustBeLearnVue: helpers.withMessage("Must Be learnvue" , mustBeLearnVue),*/ },
          password: { required, minLength:minLength(8) },
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
    methods: {
      ...mapActions ( ['signUp']),
      submit() {
        this.v$.$validate()
        if (!this.v$.$error) {
          alert('Form successfully submitted.')
          try {
            this.signUp({
              email: this.state.email,
              password: this.state.password,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
            })
            //window.location.reload();
            this.$router.push({ name: "HomeView" });
            this.showError = false
          } 
          catch (error) {
            alert('Le formulaire n/a pas été envoyé')
          }
        } else {
          alert('Le formulaire n/a pas été validé')
        }
      }
    }
  };
</script>
