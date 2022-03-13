<template>
     <div class="posts" v-if="Posts">
      <ul>
        <li v-for="post in Posts" :key="post.id" :post = post>
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
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
    name: 'postPage',
    components: {},
    
    created: function() {
      this.GetOnePost();
    },
    computed: {
       ...mapGetters('auth' , {Posts: 'StatePosts', User: 'StateUser'}),
    },
    methods: {

      ...mapActions('auth', [" GetOnePost"]),
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