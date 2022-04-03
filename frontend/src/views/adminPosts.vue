<template>
    <div class="posts" v-if="Posts  "> <!--&& Admin-->
      <div class="post__container">
        <div :postId= post.id v-for="post in Posts.slice().reverse()" :key="post.user_id" >
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
            <p>{{ post.content }}</p>
            
            <div class="comment__Container">
            <div class="comments" v-if="Comments">
                  <div :id= post.id v-for="comment in Comments.slice().reverse()" :key="comment.id" class="comment">
                    <div id="comment-div">
                      <p> Commentaires</p>
                      <p>{{ User.firstname }} {{ User.lastname }}</p>
                      <p>{{ comment.content }}</p>
                    </div>
                  </div>
                  <button @click="deleteOnePost(post.id)">Supprimer la publication</button>
                  <button @click="updatePostPage(post.id)">Modifier la publication</button>
                  <!--<button @click="canBeDisplay(post.id)">Approuver la publication</button>-->
              </div>
              <div v-else>Aucun commentaire sur cette publication</div>
          </div>
          </div>
        </div>
      </div>
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
      const idPost = this.post.id;
      this.$store.dispatch("deleteOnePost", { idPost });
    },
    /*canBeDisplay(){
      const idPost = this.post.id;
       this.$store.dispatch("deleteOnePost", { idPost });
    },*/
      ...mapActions( ["GetPosts", "GetPostsAdmin"]),
    },
  };
</script>

<style>

  .comments, .comment{
    background-color: #fff;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  button{
    width: 49%;
    margin: 1rem;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    font-weight: bold;
  }

   #comment-div{
    border: solid grey 0.1rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
  }

  @media screen and (max-width: 300px) {
    .posts {
      width: 90%;
    }

    button{
    width: none;
  }
  
 
}
</style>