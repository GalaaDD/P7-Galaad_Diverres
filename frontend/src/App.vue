<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'
  import axios from 'axios'

  export default {
    components: {
      NavBar
    },
    data() {
        return {
          db: "",
        };
    },
    created() {
      axios.get()
      .then((response) => (this.db = response.data))
      .catch((error) => {
        console.log(error);
      });
    },
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
