<template>
  <div id="updatePost">
      <h2>Modifier votre Post</h2>
    <div class="posts" v-if="Posts">
      <form class=" Post" id="formpost">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" class="form-control" v-model="title" id="title" placeholder="votre titre" aria-required="true" required />
        </div>
        <div class="form-group">
          <label for="content">Texte</label>
          <textarea class="form-control textarea " id="content" placeholder="Modifier votre texte..." aria-required="true"></textarea>
        </div>
        <div class="form-group">
          <label for="image" class="sr-only" title="image" role="button">images</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" aria-required="true" ref="file" id="image" />
        </div>
        <button type="submit" @click="updatePost(post.id)">Modifier</button>
      </form>
    </div>
  </div>
</template>



<script>

  import { mapGetters, mapActions } from "vuex";
  import VueJwtDecode from "vue-jwt-decode";
  export default {
    name: 'HomeView',
    components: {
    },

    data() {
        return {
        title: "",
        content: "",
        file: "",
        user_id:"",
      };
    },

    computed: {
      ...mapGetters({User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters({Comments:'StateComments'}),
    },

    methods: {

      ...mapActions( ["deletePost", "updatePost"]),

      updatePost() {
        const updateForm = {
          title: this.title,
          content: this.content,
          file:  this.file,
          user_id: VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId,
          post_id: this.id,
        };
        this.updatePost({ updateForm });
        this.$router.push({ name: "postsDisplay" });
      },
    },
  }
</script>

