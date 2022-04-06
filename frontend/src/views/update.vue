<template>
  <div id:postId="post.id" v-if="Posts" role="main">
    <h1> Modification de la publication</h1>
    <form @submit.prevent="submit">
      <div class="form-container">
        <label>Titre:
          <input type="text" name="title" v-model="title" />
        </label>
      </div>
      <div class="form-container">
        <label class="image" title="Bouton de séléction d'image" role="button">Sélectionner l'image a ajouter
          <input
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg, .gif"
            v-on:change="onSelect"
            ref="file"
            aria-required="true"
            id="image"
          />
        </label>
      </div>
      <div class="form-container">
        <label id="postContent">Publication
          <textarea
            name="content"
            v-model="content"
            placeholder="Modifiez votre publication ici..."
          ></textarea>
        </label>
      </div>
      <button type="submit">Modifier</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "updatePost",
  props: ["postId"],
  components: {},

  data() {
    return {
      title: "",
      content: "",
      file: "",
      user_id: VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId,
      post_id: this.postId,
    };
  },

  computed: {
    ...mapGetters({ User: "StateUser" }),
    ...mapGetters({ Posts: "StatePosts" }),
    ...mapGetters({ Comments: "StateComments" }),
  },

  methods: {
    ...mapActions(["deletePost", "updatePost"]),

    onSelect() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    //function to send form and call the function
    submit() {
      try {
        const formData = new FormData();
        formData.append("post_id", this.postId);
        formData.append("user_id", this.user_id);
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("image", this.file);
        
        console.log("file", this.file);
        console.log("title", this.title);
        console.log("content", this.content);
        console.log("user_id", this.user_id);
        console.log("post_id", this.postId);
        this.updatePost(formData, this.postId);
        //this.$router.push({ name: "postsDisplay" });
      } catch (error) {
        throw "Le service est temporairement indisponible";
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