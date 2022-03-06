const Post = require("../models/post");
const db = require("../config/db");
require('dotenv').config();
const fs = require('fs'); // Avoir accès à des opérations liés aux systèmes de fichiers


exports.CreatePost = (req, res, next) => {
    console.log();
    let attatchment = "";

    if (req.file) {
        attatchment	= `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        user_id: req.body.user_id,
        title: title,
        content: content,
        attatchment	: attatchment,
        author: this.author.lastname,


    });
    if (!title && !content && !attatchment) {
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

// Modifier un post
exports.modifyPost = (req, res, next) => {
    let attatchment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    if (req.file) {
        attatchment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].attatchment) {
                const filename = rows[0].attatchment.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    db.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.params.id,, req.body.title,  req.body.content, attatchment ], (error, result) => {
                        if (error) {
                            return res.status(400).json({ error: "Le post n'a pas pu être modifié" });
                        }
                        return res.status(200).json(result);
                    });
                });
            } else {
                db.query(`UPDATE post SET content = ?, title = ?, WHERE id = ?`, [req.params.id, req.body.title, req.body.content, attatchment ], (error, result) => {
                    if (error) {
                        return res.status(400).json({ error: "Le post n'a pas pu être modifié" });
                    }
                    return res.status(200).json(result);
                });

            }



        }
    });
};


exports.deletePost = (req, res, next) => {
    db.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].attatchment) {
                const filename = rows[0].attatchment.split("/images/")[1];
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



//tout les posts
exports.getAllPost = (req, res, next) => {

    db.query('SELECT post.id, title, content, attatchment, likes , user_id, lastname, isAdmin  FROM post INNER JOIN user ON user.id = post.user_id ORDER BY dateCreate DESC', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher tous les post" });
        }
        return res.status(200).json(result);
    });
};
// un post
exports.getOnePost = (req, res, next) => {

    db.query('SELECT post.id, title, content, attatchment, likes , user_id, lastname, isAdmin FROM post INNER JOIN user ON user.id = post.user_id WHERE post.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher un  post" });
        }
        return res.status(200).json(result);
    });
};