<template>
  <createPost />
  <router-view/>
    <div class="posts" v-if="Posts">
      <ul>
        <li :postId= post.id v-for="post in Posts" :key="post.user_id" >
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
            <p>{{ post.content }}</p>
            <p>{{ post.firstname }}</p>
            <button @click="deleteOnePost()">Supprimer la publication</button>
            <div class="comment__Container">
            <CommentView v-for="comment in post.comments" :key="comment.id"/>
            <router-view/>
          </div>
          </div>
          <div class="commentCreation__Container">
            <createComment :postId="post.id" />
            <router-view/>
          </div>
        </li>
      </ul>
      
    </div>
    <div v-else>Aucune publications de disponible</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import createPost  from '@/views/createPost.vue'
  import createComment from '@/views/createComment.vue'
  import CommentView   from '@/views/comment.vue'
 
  
  export default {
  

    name: 'postsDisplay',
    props: ["post"],
    components: {
      createComment, CommentView, createPost, 
    },

    created: function() {
      this.GetPosts();
    },
    computed: {
      
      ...mapGetters( {User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters( {Comms:'SetComments'}),
    },
    methods: {
     deleteUser() {
      const idPost = this.postId;
      this.$store.dispatch("deleteUser", { idPost });
    },

      ...mapActions( ["GetPosts"]),
    },
  };
</script>

<style>

  ul{
    list-style-type: none;
  }

  #post-div{
    border: solid black 0.2rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;

    width: 100%;
    background-color: #F2F2F2;
    border-radius: 25px;
  }

#post-div {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
}

img {
        border-radius: 15px ;
}

</style>