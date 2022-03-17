<template>
     <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id" class="post">
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
            <p>{{ post.content }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Aucune publications de disponible</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'postPage',
    components: {},
    posts: [],
    comms: [],

    data() {
      return {
        post: [],
      }
    },
    
    created: function() {
      this.GetOnePost();
      this.GetPosts();
    },
    computed: {
      ...mapGetters('auth' , {User: 'StateUser'}),
      ...mapGetters('post' , {Posts: 'StatePosts'}),
      ...mapGetters('comm' , {Comms:'SetComments'}),
    },
    methods: {

      ...mapActions('post', ["GetOnePost", "GetPosts"]),
    
    },
};
</script>


<style>

  ul{
    list-style-type: none;
  }

</style>