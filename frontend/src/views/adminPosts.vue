<template>
  <template>
    <div class="posts" v-if="Posts && Admin ">
      <ul>
        <li :postId= post.id v-for="post in Posts" :key="post.user_id" >
          <div id="post-div">
            <h2>{{ post.title }}</h2>
            <img :src= "post.image" id="image"/>
            <p>{{ post.content }}</p>
            <p>{{ post.firstname }}</p>
            <button @click="deleteOnePost()">Supprimer la publication</button>
            <button @click="updatePost()">Modifier la publication</button>
            <!--<button type="submit" v-if="@click" canBeDisplay = 0>Approuver le post</button>-->
            <div class="comment__Container">
            <CommentView v-for="comment in post.comments" :key="comment.id"/>
            <router-view/>
          </div>
          </div>
          <div class="commentCreation__Container">
            <createComment :postId="post.id" />
            <router-view/>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>Aucune publications à moderer</div>
</template>
</template>

<script>
export default {

  canBeDisplay(){
    
  }

}
</script>

<style>

</style>