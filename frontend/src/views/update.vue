<template>
  <div id:postId="post.id" v-if="Posts">
    <form @submit.prevent="submit">
      <div class="postCreation__containers">
        <label for="title">Titre:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="postCreation__containers">
        <label class="sr-only" for="image" title="image" role="button"
          >image</label
        >
        <input
          type="file"
          name="image"
          accept=".png, .jpg, .jpeg, .gif"
          v-on:change="onSelect"
          ref="file"
          aria-required="true"
          id="image"
        />
      </div>
      <div class="postCreation__containers">
        <label for="content">Publication</label>
        <textarea
          name="content"
          v-model="content"
          placeholder="Modifiez votre publication ici..."
        ></textarea>
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

    submit() {
      try {
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("user_id", this.user_id);
        formData.append("post_id", this.postId);
        console.log("file", this.file);
        this.updatePost(this.postId, formData);

        //this.$router.push({ name: "postsDisplay" });
      } catch (error) {
        throw "Le service est temporairement indisponible";
      }
    },
  },
};
</script>