const mysql = require('mysql2');


const Post = function(post) {
    this.id = post.post_id;
    this.user_id = post.user_id;
    this.title = post.title;
    this.content = post.content;
    this.image = post.image;
    this.username = post.username;
};

module.exports = Post;