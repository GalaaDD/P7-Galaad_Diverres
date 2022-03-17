<template>
  <div >  <!--v-if="User"-->
    <p>Commenter la publication</p>
      <form @submit.prevent="submit">
        <div class="comment__container">
          <label for="content">Création d'un commentaire</label>
          <textarea
            name="content"
            v-model="content"
            placeholder="commentaire..."
          ></textarea>
        </div>
        <button type="submit">{{ idPost }}</button>
      </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { defineComponent, inject } from 'vue'
import post from "../store/modules/post";
  export default defineComponent ({
    setup() {
    const idPost = inject('idPost');
    
    return {
      idPost,
    };
  },
    name: 'createComment',

    components: {},
    data() {
      return {
        content: "",
        comms:[],
        userId:"",
        postId:"",
      };
    },
    computed: {
      ...mapGetters('auth' , {User: 'StateUser'}),
      ...mapGetters('post' , {Posts: 'StatePosts'}),
      ...mapGetters('comm' , {Comms: 'StateComms'}),
    },
    methods: {

      ...mapActions('comm', ["createComment"]),
      

      submit() {
        console.log('comm');
        //const idPost = this.$route.params.id;

        /*const formData = {
          /*formData.append("content", this.content);
          formData.append("userId",  this.user_id);
          formData.append("postId", this.post_id);
          console.log(this.postId);
          this.createComment(formData);*/
          //user_id: userId,
          /*content: this.comment,
          post_id: idPost,
        }
        try{
          createComment(formData);
          this.$router.push({ name: "commentView" });
        }catch (error) {
        throw "Sorry you can't make a post now!"
        }*/
        
        try {
          const formData = new FormData();
          formData.append("content", this.content);
          formData.append("userId", this.user_id);
          formData.append("postId", post.id);
          console.log(formData.data);
          this.createComment(formData);

        } catch (error) {
          throw "Sorry you can't make a post now!"
        }
    },

    },
  },
);
</script>

<style>

  .comment__container{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>