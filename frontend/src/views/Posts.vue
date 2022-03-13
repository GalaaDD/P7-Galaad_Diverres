<template>
  <div class="container">
    <div v-if="User">
      <p>Bienvenue {{ User }} à la création et au partage de vos passions</p>
    </div>
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="title">Title:</label>
          <input type="text" name="title" v-model="title" />
        </div>
        <div>
          <label class="sr-only" for="image" title="image" role="button">image</label>
           <input type="file" name="image" accept=".png, .jpg, .jpeg, .gif" v-on:change="onSelect" ref="file" aria-required="true" id="image" />
        </div>
        <div>
          <label for="content">Texte</label>
          <textarea
            name="content"
            v-model="content"
            placeholder="content..."
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'PostS',
    components: {},
    data() {
      return {
        title: "",
        content: "",
        file: "",
        user_id:"",
      };
    },
    computed: {
       ...mapGetters('auth' , {Posts: 'StatePosts', User: 'StateUser'}),
    },
    methods: {

      ...mapActions('auth', ["createPost"]),

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
          formData.append("userId", this.user_id);
          this.createPost(formData);
          this.$router.push({ name: "postsDisplay" });
        } catch (error) {
          throw "Sorry you can't make a post now!"
        }
    },
  },
};
</script>