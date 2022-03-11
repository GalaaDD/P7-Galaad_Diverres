const Post = require("../models/post");
const db = require("../config/db");
require('dotenv').config();
const fs = require('fs'); 

//function to create a post and send it to groupomania Data Base
exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.userId;
    console.log(userId);
    let image = "";

    if (req.file) {
        image	= `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
   
    const post = new Post({
        user_id: userId,
        title: title,
        content: content,
        image: image,
    });
    if (!title && !content && !image) {
        return res.status(400).json({ message: "Veuillez renseigner le titre" });
    } else {

        db.query(`INSERT INTO post SET ?`, post, (error, result) => {

            if (error) {
                return res.status(400).json({ error: error });
            }
            return res.status(201).json({ message: "Le Post a bien été crée!" });
        });
    }
};

//function to update a post
exports.updatePost = (req, res, next) => {
    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    db.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.params.id, req.body.title,  req.body.content, image ], (error, result) => {
                        if (error) {
                            return res.status(400).json({ error: "La publication n'a pas pu être mise à jour" });
                        }
                        return res.status(200).json(result);
                    });
                });
            } else {
                db.query(`UPDATE post SET content = ?, title = ?, WHERE id = ?`, [req.params.id, req.body.title, req.body.content, image ], (error, result) => {
                    if (error) {
                        return res.status(400).json({ error: "La publication n'a pas pu être mise à jour" });
                    }
                    return res.status(200).json(result);
                });

            }
        }
    });
};

//function to delete a post from groupomania data base
exports.deletePost = (req, res, next) => {
    db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {

                    db.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                        if (error) {
                            return res.status(500).json({ error: "impossible de supprimer" });
                        } else {

                            return res.status(200).json({ message: "Message supprimé !" });
                        };
                    });
                });
            } else {
                db.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                    if (error) {
                        return res.status(500).json({ error: "impossible de supprimer" });
                    } else {

                        return res.status(200).json({ message: "Message supprimé !" });
                    };
                });
            }

        }
    });

};

//function to get all of the posts from groupomania data base
exports.getAllPosts = (req, res, next) => {
    //const userId = req.params.id;ORDER BY dateCreate DESC

    db.query('SELECT post.id, user_id, title, content, image  FROM post INNER JOIN user ON user.id = post.user_id ', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "L'affichage de l'ensemble des publications semble etre indisponible pour le moment" });
        }
        return res.status(200).json(result);
    });
};
//function to get one post from groupomania data base
exports.getOnePost = (req, res, next) => {

    db.query('SELECT post.id, user_id, title, content, image FROM post INNER JOIN user ON user.id = post.user_id WHERE post.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "L'affichage de l'une des publications semble etre indisponible pour le moment" });
        }
        return res.status(200).json(result);
    });
};