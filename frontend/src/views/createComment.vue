<template>
  <div v-if="User" id="createComment__container">  
      <form @submit.prevent="submit">
        <div class="comment__container">
          <label for="comment">Commenter la publication</label>
          <textarea
            name="content"
            v-model="content"
            placeholder="commentaire..."
          ></textarea>
        </div>
        <button type="submit">Commenter</button>
      </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import VueJwtDecode from "vue-jwt-decode";
  export default {
    
    name: 'createComment',
    props: ["postId"],
    components: {},
    data() {
      return { 
        content: "",
        userId: VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId,
      };
    },
    computed: {
      ...mapGetters( {User: 'StateUser'}),
      ...mapGetters( {Posts: 'StatePosts'}),
      ...mapGetters( {Comments: 'StateComments'}),
    },
    methods: {

      ...mapActions(["createComment"]),

      submit() {
        
        try {
          const content = this.content;
          const post_id = this.postId;
          
          const user_id = VueJwtDecode.decode(localStorage.getItem("AccessToken")).userId;
          console.log( user_id );
          this.createComment({ content, post_id, user_id});
          this.$router.push({ name: "postsDisplay" });
          this.content= "";

        } catch (error) {
          throw "Sorry you can't make a post now!"
        }
    },

    },
};
</script>

<style>

  .comment__container{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>