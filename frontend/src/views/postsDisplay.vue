<template>
  <createPost />
  <router-view/>
    <div class="posts" v-if="Posts">
      <ul>
        <li :postId= post.id v-for="post in Posts" :key="post.user_id" >
          <div id="post-div">
            <h2>{{ post.title }}</h2>

            <a @click="postPage">
              <img :src= "post.image" id="image"/>
            </a>
            <p>{{ post.content }}</p>
            <p>{{ post.firstname }}</p>
            <div class="comment__Container">
            <CommentView :key="post.id"/>
            <router-view/>
          </div>
          </div>
          <div class="commentCreation__Container">
            <createComment />
            <router-view/>
          </div>
        </li>
      </ul>
      
    </div>
    <div v-else>Aucune publications de disponible</div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { computed, defineComponent, provide, reactive } from "vue";
  import createPost  from '@/views/createPost.vue'
  import createComment from '@/views/createComment.vue'
  import CommentView   from '@/views/comment.vue'
  
  export default defineComponent({
    
    setup() {
      const state = reactive({
        idPost:  2
      });

      provide('idPost', computed(() => state.idPost));

      return { state };
    },

    name: 'postsDisplay',
    components: {
      createComment, CommentView, createPost, 
    },

    data() {
      return {
        posts: [],
        comms:[],
      }
    },
    created: function() {
      this.GetPosts();
    },
    computed: {
      Posts() {
        return this.$store.state.comm;
      },
      ...mapGetters('auth' , {User: 'StateUser'}),
      ...mapGetters('post' , {Posts: 'StatePosts'}),
      ...mapGetters('comm' , {Comms:'SetComments'}),
    },
    methods: {

      ...mapActions('post', ["GetPosts"]),

      
    },
      
      postPage(){
        
        this.$router.push({ name: "postPage" });
      }
    },
  );
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