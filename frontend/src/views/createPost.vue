<template>
  <div class="container">
    <div v-if="User">
      <p>Bienvenue {{ User }} à la création et au partage de vos passions</p>
    </div>
    <div>
      <form @submit.prevent="submit">
        <div class="postCreation__containers">
          <label for="title">Titre:</label>
          <input type="text" name="title" v-model="title" />
        </div>
        <div class="postCreation__containers">
          <label class="sr-only" for="image" title="image" role="button">image</label>
          <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif" v-on:change="onSelect" ref="file" aria-required="true" id="image" />
        </div>
        <div class="postCreation__containers">
          <label for="content">Description</label>
          <textarea
            name="content"
            v-model="content"
            placeholder="Description..."
          ></textarea>
        </div>
        <button type="submit">Publier</button>
      </form>
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
      };
    },
    computed: {
      ...mapGetters( {User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters( {Comms: 'StateComments'}),
    },
    methods: {

      ...mapActions( ["createPost"]),
      onSelect() {
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      },

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
          throw "Sorry you can't make a post now!"
        }
    },
  },
};
</script>

<style>

  .postCreation__containers{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>