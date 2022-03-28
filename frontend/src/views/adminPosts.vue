<template>
    <div class="posts" v-if="Posts  "> <!--&& Admin-->
      <ul>
        <li :postId= post.id v-for="post in Posts" :key="post.user_id" >
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
            <p>{{ post.content }}</p>
            
            <div class="comment__Container">
            <div class="comments" v-if="Comments">
                  <div :id= post.id v-for="comment in Comments" :key="comment.id" class="comment">
                    <div id="comment-div">
                      <p>{{ User.firstname }} {{ User.lastname }}</p>
                      <p>{{ comment.content }}</p>
                    </div>
                  </div>
                  <button @click="deleteOnePost(post.postId)">Supprimer la publication</button>
                  <button @click="updatePostPage(post.postId)">Modifier la publication</button>
              </div>
              <div v-else>Aucun commentaire sur cette publication</div>
          </div>
          </div>
        </li>
        <button type="submit" @click="canBeDisplay()">Approuver les publications</button>
      </ul>
    </div>
  <div v-else>Aucune publications à moderer</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
  
    name: 'postsDisplay',
    props: ["post"],
    components: {
    },

    created: function() {
      this.GetPostsAdmin()
    },
    computed: {
      
      ...mapGetters( {User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters( {Comments:'StateComments'}),
    },
    methods: {
      updatePostPage() {
      this.$router.push({ name: "update" });
    },

     deleteOnePost() {
      const idPost = this.postId;
      this.$store.dispatch("deleteOnePost", { idPost });
    },
    canBeDisplay(){
      const idPost = this.postId;
      this.canBeDisplay(idPost)
    },
      ...mapActions( ["GetPosts", "GetPostsAdmin", "canBeDisplay"]),
    },
  };
</script>

<style>

  .comments{
    background-color: #fff;
    border-radius: 1rem;
  }

  button{
    width: 20%;
    margin: 1rem;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    font-weight: bold;
  }

  @media screen and (max-width: 300px) {
    .posts {
      width: 90%;
    }
  }
</style>