<template>
  <div class="container">
    <div v-if="User">
      <p>Hi {{ User }}</p>
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
    <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id">
          <div id="post-div">
            <p>{{ post.title }}</p>
            <p>{{ post.content }}</p>
            <img id="image"/>
            <p>Written By: {{ post.author.lastname }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Oh no!!! We have no posts</div>
  </div>
</template>


<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: 'PostS',
    components: {},
    data() {
      return {
        title: "",
        content: "",
        image: "",
        userId:"",
      };
    },
    computed: {
      ...mapState( 'auth', {Posts: "StatePosts", User: "StateUser"}),
    },
    methods: {

      ...mapActions('auth', ["createPost"]),

      onSelect() {
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      },

      submit() {
        //let userId = localStorage.getItem("userId");
        try {
          const formData = new FormData();
          formData.append("image", this.file);
          formData.append("title", this.title);
          formData.append("content", this.content);
          //formData.append("userId", userId);
          this.createPost(formData);
        } catch (error) {
          throw "Sorry you can't make a post now!"
        }
    },
  },
};
</script>