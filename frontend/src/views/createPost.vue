<template>
  <div class="createPost__container" id="header">
    <div v-if="User">
      <p>Bienvenue {{ User.firstname }}, à la création et au partage de vos passions</p>
    </div>
    <div>
      <form @submit.prevent="submit">
        <div class="form-container">
          <label>Titre:
            <input type="text" name="title" v-model="title" required/>
          </label>
        </div>
        <div class="form-container">
          <label class="image" for="image" title="Bouton de sélection de l'image" role="button" id="postImage">image</label>
          <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif" v-on:change="onSelect" ref="file" aria-required="true" id="image" />
        </div>
        <div class="form-container">
          <label id="postContent">Publication
            <textarea
              name="content"
              v-model="content"
              placeholder="écrivez votre publication ici..."
              required
            ></textarea>
          </label>
        </div>
        <button type="submit">Publier</button>
      </form>
      <div v-if="ShowError">
        <p>La création de publications est indisponible veuillez essayer à nouveau ultérieurement</p>
    </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {

    name: 'createPost',
    components: {},
    data() {
      return {
        title: "",
        content: "",
        file: "",
        user_id:"",
        id:"",
        ShowError: false,
      };
    },
    computed: {
      //use of vuex store 
      ...mapGetters( {User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters( {Comments: 'StateComments'}),
    },
    methods: {

      ...mapActions( ["createPost"]),
  
      onSelect() {
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      },
      //function to send form to the function in the store and call the function 
      submit() {
        try {
          const formData = new FormData();
          formData.append("image", this.file);
          formData.append("title", this.title);
          formData.append("content", this.content);
          formData.append("user_id", this.user_id);
          formData.append("post_id", this.id);
          console.log(formData);
          this.createPost(formData);

          this.$router.push({ name: "postsDisplay" });
        } catch (error) {
          
          throw "Le service est temporairement indisponible"
        }
    },
  },
};
</script>

<style>

  .form-container, #postContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>