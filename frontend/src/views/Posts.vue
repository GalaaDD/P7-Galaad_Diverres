<template>
  <div class="posts">
      <div v-if="User">
        <p>Hi {{User}}</p>
      </div>
      <div>
          <form @submit.prevent="submit" method ="post">
            <div>
              <label for="title">Title:</label>
              <input type="text" name="title" v-model="title">
            </div>
            <div>
              <textarea name="content" v-model="content" placeholder="Créer, partager..."></textarea>
            </div>
            <button type="submit">Publier</button>
          </form>
      </div>
      <div class="posts" v-if="Posts">
        <ul>
          <li v-for="post in Posts" :key="post.id">
            <div id="post-div">
              <p>{{post.title}}</p>
              <p>{{post.content}}</p>
              <p>écrit par: {{post.author.lastname}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        Oh no!!! We have no posts
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
        attatchment: "",
      };
    },
    created: function () {
      // a function to call getposts action
      this.GetPosts();
    },
    computed: {
      ...mapGetters('auth', {posts: "StatePosts", user: "StateUser"}),
    },
    methods: {
    ...mapActions('auth', ["CreatePost", "GetPosts"]),
    async submit() {
      try {
        await this.CreatePost({
          title: this.title,
          content: this.content,
          attatchment: this.attatchment,
        })
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }
    },
  },
};
</script>