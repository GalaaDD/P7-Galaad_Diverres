<template>
  <createPost />
  <router-view />
  <div v-if="User" id="main" role="main">
    <div class="posts" v-if="Posts">
      <div class="post__container">
        <div
          :postId="post.id"
          v-for="post in Posts"
          :key="post.user_id"
        >
          <div id="post-div">
            <h1>{{ post.title }}</h1>
            <img :src="post.image" class="image" alt="Image de la publication commentée par l'auteur"/>
            <p>{{ post.content }}</p>
            <p>Publié par {{ post.firstname }} {{ post.lastname }}</p>
            <div v-if="userId == post.user_id">
              <button @click="deleteOnePost(post.id)" title="Bouton de suppression de la publication" role="button">
                Supprimer la publication
              </button>
              <button @click="updatePostPage(post.id)" title="Bouton de modification de la publication" role="button">
                Modifier la publication
              </button>
              <!--sending post.id as a parameter to know which one has to be either delete or updated-->
            </div>
            <div class="comment__Container">
              <div class="comments" v-if="Comments">
                <div
                  :id="post.id"
                  v-for="comment in Comments"
                  :key="comment.id"
                  class="comment"
                >
                  <div id="comment-div">
                    <p>Commentaire publié par</p>
                    <p>{{ post.firstname }} {{ post.lastname }}</p>
                    <p>{{ comment.content }}</p>
                  </div>
                </div>
              </div>
              <div v-else>Aucun commentaire sur cette publication</div>
              <div class="commentCreation__Container">
                <createComment :postId="post.id" />
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Aucune publications de disponible</div>
    <div id="footer" role="footer">
      <footerPage />
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import createPost from "@/views/createPost.vue";
import createComment from "@/views/createComment.vue";
import footerPage from '@/views/footerPage.vue'
//import CommentView   from '@/views/comment.vue'
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "postsDisplay",
  props: ["post"],
  components: {
    createComment,
    createPost,
    footerPage, 
  },

  data() {
    return {
      content: "",
      userId: VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId,
      Admin: VueJwtDecode.decode(localStorage.getItem("AccessToken")).Admin,
    };
  },
  created: function () {
    this.GetPosts();
  },
  computed: {
    ...mapGetters({ User: "StateUser" }),
    ...mapGetters({ Posts: "StatePosts" }),
    ...mapGetters({ Comments: "StateComments" }),
  },

  methods: {
    //function to get postId from the template and dispatch towards update page with the postId into the params
    updatePostPage(postId) {
      this.$router.push({ name: "update", params: { postId } });
    },
    //function to send the Id to the function in the store
    deleteOnePost: function () {
      let idPost = this.post;
      this.$store.dispatch("deleteOnePost", { idPost });
    },

    ...mapActions(["GetPosts", "updatePost", "deleteOnePost"]),
  },
};
</script>

<style>
  #post-div {
    border: solid black 0.2rem;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;

    width: 100%;
    background-color: #f2f2f2;
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

  p,
  h2 {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 0.3rem;
    text-align: left;
    width: 94.5%;
  }

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