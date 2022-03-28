const mysql = require('mysql2');


const Post = function(post) {
    this.id = post.post_id;
    this.user_id = post.user_id;
    this.title = post.title;
    this.content = post.content;
    this.image = post.image;
    this.canBeDisplay = post.canBeDisplay;
};

module.exports = Post;