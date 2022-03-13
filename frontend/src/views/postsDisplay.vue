<template>
     <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id">
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <a @click="postPage">
              <img :src= "post.image" id="image"/>
            </a>
            <p>{{ post.content }}</p>
            <p>{{ post.firstname }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Aucune publications de disponible</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'postsDisplay',
    components: {},
    
    created: function() {
      this.GetPosts();
    },
    computed: {
       ...mapGetters('auth' , {Posts: 'StatePosts', User: 'StateUser'}),
    },
    methods: {

      ...mapActions('auth', ["GetPosts"]),
      postPage(){
        this.$router.push({ name: "postPage" });
      }
    },
};
</script>


<style>

  ul{
    list-style-type: none;
  }

  .posts{
    display: flex;
    justify-content: space-between;
    flex-direction: column;

  }

  #post-div{
    border: solid black 0.2rem;
    border-radius: 1rem;
    margin: 1rem;
  }

  img{
    height: 50%;
  }

</style>