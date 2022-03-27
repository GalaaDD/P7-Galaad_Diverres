<template>
     <div class="comments" v-if="comments">
      <ul>
        <li :id= post.id v-for="comment in comments" :key="comment.id" class="comment">
          <div id="comment-div">
            <p>{{ comment.content }}</p>
            <p>{{ comment.username }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Aucun commentaire sur cette publication</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

    export default {
      name: 'CommentView',
      props: ["comment"],

      created: function() {
        let postId = this.postId;
        this.GetComments(postId);
      },
      computed: {
        ...mapGetters( {User: 'StateUser'}),
        ...mapGetters( {Posts: 'StatePosts'}),
        ...mapGetters( {Comments: 'StateComments'}),
      },

      methods: {
        
        ...mapActions( ["GetComments"]),
        
        deleteOneComment() {
        const IdComment = this.comment.id;
        console.log("IdPost");
        this.$store.dispatch("deleteOnePost", { IdComment });
        },
      }
  };

</script>
