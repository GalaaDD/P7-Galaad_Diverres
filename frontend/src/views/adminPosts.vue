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
                <ul>
                  <li :id= post.id v-for="comment in Comments" :key="comment.id" class="comment">
                    <div id="comment-div">
                      <p>{{ User.firstname }} {{ User.lastname }}</p>
                      <p>{{ comment.content }}</p>
                    </div>
                  <button @click="deleteOnePost()">Supprimer la publication</button>
                  <button @click="updatePostPage()">Modifier la publication</button>
                  </li>
                </ul>
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

     deleteUser() {
      const idPost = this.postId;
      this.$store.dispatch("deleteUser", { idPost });
    },
    canBeDisplay(){
      this.canBeDisplay()
    },
      ...mapActions( ["GetPosts", "GetPostsAdmin", "canBeDisplay"]),
    },
  };
</script>