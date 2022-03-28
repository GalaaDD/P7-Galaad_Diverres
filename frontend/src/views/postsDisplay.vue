<template>
  <createPost />
  <router-view/>
  <div v-if="User">
    <div class="posts" v-if="Posts">
      <div class="post__container">
        <div :postId= post.id v-for="post in Posts" :key="post.user_id" >
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
            <p>{{ post.content }}</p>
            <p>Publié par {{ User.firstname }} {{ User.lastname }} </p>
            <div v-if ="userId == post.user_id">
              <button @click="deleteOnePost(post.id)">Supprimer la publication</button>
              <button @click="updatePost(post.id)">Modifier la publication</button>
              <!--sending post.id as a parameter to know which one has to be either delete or updated-->
            </div>
            <div class="comment__Container">
              <div class="comments" v-if="Comments">
                  <div :id= post.id v-for="comment in Comments" :key="comment.id" class="comment">
                    <div id="comment-div">
                      <p> Commentaire publié par</p>
                      <p>{{ User.firstname }} {{ User.lastname }}</p>
                      <p>{{ comment.content }}</p>
                    </div>
                  </div>
              </div>
              <div v-else>Aucun commentaire sur cette publication</div>
              <div class="commentCreation__Container">
                <createComment :postId="post.id" />
                <router-view/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Aucune publications de disponible</div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import createPost  from '@/views/createPost.vue'
  import createComment from '@/views/createComment.vue'
  //import CommentView   from '@/views/comment.vue'
  import VueJwtDecode from "vue-jwt-decode";

  export default {
  
    name: 'postsDisplay',
    props: ["post"],
    components: {
      createComment, createPost, 
    },
    
    data() {
      return {
        content: "",
        userId: VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId,
        Admin: VueJwtDecode.decode(localStorage.getItem("AccessToken")).Admin,
      };
    },
    created: function() {
      this.GetPosts();
    },
    computed: {
      
      ...mapGetters( {User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters( {Comments:'StateComments'}),
    },

    methods: {

    updatePost: function() {
      let idPost = this.post.id;
      this.$store.dispatch( "updatePost", { idPost });
      this.$router.push({ name: "update" });
    },

    deleteOnePost: function () {
      let idPost = this.post.id;
      this.$store.dispatch("deleteOnePost", { idPost });
    },

      ...mapActions( ["GetPosts", "updatePost", "deleteOnePost"]),
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
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10%;
    margin-top: 2rem;
  }

  img {
    max-width: 100%;
    border-radius: 15px;
  }

  p, h2{
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.3rem;
    text-align: left;
    width: 94.5%
  }

</style>