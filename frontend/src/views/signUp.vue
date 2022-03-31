<template>
  <div class="signup">
      <div>
          <form @submit.prevent="submit">
            <div class="input__container">
               <label for="email">email:</label>
              <input type="text" name="email" placeholder="email" v-model="state.email" required>
              <span v-if="v$.email.$errors">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>
            <div class="input__container">
              <label for="password">Mot de Passe:</label>
              <input type="password" name="password" v-model="state.password" required>
              <span v-if="v$.password.$errors">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
            <div class="input__container">
              <label for="lastname">Nom:</label>
              <input type="text" name="lastname" v-model="state.lastname" required>
              <span v-if="v$.lastname.$errors">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
            <div class="input__container">
              <label for="firstname">Prénom:</label>
              <input type="text" name="firstname" v-model="state.firstname" required>
              <span v-if="v$.firstname.$errors">
                {{ v$.firstname.$errors[0].$message }}
              </span>
            </div>
            <button type="submit">S'inscrire</button>
          </form>
      </div>
      <!--<p  id="error">email déjà utilisé</p>-->
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import useValidate from '@vuelidate/core'
  import { required, email, minLength, helpers } from '@vuelidate/validators'
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

      const mustBeLearnVue = (value) =>value.includes('learnvue');

      const rules = computed(() => {
        
        return {
          email: { required, email, mustBeLearnVue: helpers.withMessage('Must Be learnvue ') },
          password: { required, minLength:minLength(8) },
          lastname: { required, minLength:minLength(2) },
          firstname: { required },
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
              email: this.email,
              password: this.password,
              firstname: this.firstname,
              lastname: this.lastname,
            })
            window.location.reload();
            this.$router.push({ name: "HomeView" });
            this.showError = false
          } 
          catch (error) {
            alert('Form not submitted.')
          }
        } else {
          alert('Form failed validation')
        }
      }
    }
  };
</script>
