const db = require("../config/db");
const Comment = require("../models/comment");

// function to create a comment
exports.createComment = (req, res, next) => {
    const content = req.body.content;
    const comment = new Comment({
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        content: req.body.content,
    });
    if (!content) {
        return res.status(400).json({ message: "Le titre ne peux pas être vide" });
    } else {
        db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                res.status(200).json({ result });
            }
        });
    }
};


//function to display all of the comments
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT comment.id, comment.content, comment.user_id, comment.post_id, user.firstname FROM comment INNER JOIN post ON post.id = comment.post_id left join user on user.id = comment.user_id WHERE post.id= ? ORDER BY dateCreate DESC`, req.params.id, (error, result) => {
        if (error) return res.status(400).json({ error: "Les commentaires n'ont pas pu être affiché" });
        return res.status(200).json(result);
    });
};


// function to display one of the comments
exports.getOneComment = (req, res, next) => {
    db.query('SELECT comment.id, comment.content, user_id, isAdmin  FROM comment INNER JOIN user ON user.id = comment.user_id WHERE comment.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher ce commentaire" });
        }
        return res.status(200).json(result);
    });
};

// function to delete a comment
exports.deleteComment = (req, res, next) => {
    let comment_id = req.params.id;
    db.query(`DELETE FROM comment WHERE id = ?`, comment_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" });
        return res.status(200).json(result);
    });
};
