const db = require("../config/db");
const Comment = require("../models/comment");

// function to create a comment
exports.createComment = (req, res, next) => {
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        content: req.body.content,
    });
    console.log(req.body);
    if (!req.body.content) {
        return res.status(400).json({ message: "Le commentaire ne peux pas être vide" });
    } else {
        db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                
                db.query(`SELECT * FROM comment ORDER BY id DESC LIMIT 1`, (error, result) => {
                    if (error) res.status(400).json({ error: error });
                    else res.status(200).json({ comment: result[0] });
                });
            }
        });
    }
};
// get data.comment to save
//db.query(`SELECT comment.id, comment.content, comment.post_id, comment.user_id,  FROM comment INNER JOIN post ON post.id = comment.post_id left join user on user.id = comment.user_id WHERE post.id= ?`, req.params.postId, (error, result) => {

//function to display all of the comments / ORDER BY dateCreate DESC
exports.getAllCommentsByPost = (req, res, next) => {
    console.log(req.params);
    db.query(`SELECT comment.id, comment.content, comment.post_id, comment.user_id, user.firstname FROM comment INNER JOIN post ON post.id = comment.post_id left join user on user.id = comment.user_id WHERE post.id= ?`, req.params.postId, (error, result) => {
        console.log(req.params.postId);
        
        if (error) return res.status(400).json({ error: "Les commentaires n'ont pas pu être affichés" });
        console.log(result);
        return res.status(200).json(result);
        
    });
};

// function to delete a comment
exports.deleteComment = (req, res, next) => {
    console.log(req.params.id);
    db.query(`DELETE FROM comment WHERE id = ?`, req.params.id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
        return res.status(200).json(result);
    });
};
