<template>
     <div class="comms" v-if="Comms">
      <ul>
        <li :id= post.id v-for="comm in Comms" :key="comm.id" class="comment">
          <div id="comment-div">
            <p>{{ comment.content }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Aucun commentaire sur cette publication</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  //import axios from 'axios';
    export default {
      name: 'CommentView',
      data() {
        return {
          posts:[],
          comments: [],
        }
      },
        created: function() {
        this.GetComments();
      },
      computed: {
        ...mapGetters('auth' , {User: 'StateUser'}),
        ...mapGetters('post' , {Posts: 'StatePosts'}),
        ...mapGetters('comm' , {Comms: 'StateComms'}),
      },
      methods: {
        ...mapActions('comm', ["GetComments"]),

        /*getOneComm() {
          const idPost = this.$route.params.id;
          axios
            .get(this.$localhost + "comment/post/" + idPost, {
              
            })
            .then((res) => {
              this.arts = res.data;
            })
            .catch((error) => {
              console.log( error);
            }); 
        },*/
      }
  };

</script>
